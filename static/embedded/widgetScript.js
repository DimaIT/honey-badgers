const { submitLog } = await import('https://dimait.github.io/honey-badgers/static/embedded/session-logs.js');
const { askAI, askAItoTranslate, askAItoSummarize } = await import('https://dimait.github.io/honey-badgers/static/embedded/ai.js');

const root = document.getElementById('surfly-shadow-host').shadowRoot;
const popupSection = root.getElementById("popup-section");

const lookupContent = root.getElementById("lookup-content");
const translationContent = root.getElementById("translation-content");
const hideAllContent = () => {
  lookupContent.classList.add("hidden");
  translationContent.classList.add("hidden");
  summaryContent.classList.add("hidden");
}

const lookupContentText = root.getElementById("lookup-content-text");
const popupButtonLookup = root.getElementById("popup-button");
const popupButtonTranslate = root.getElementById("popup-button2");
const speechToTextButton = root.getElementById("speech-to-text");
const selectedLanguage = root.getElementById("select-language");
const translatedTextSection = root.getElementById(
  "translated-text-section"
);
let selectedTextForLookup = "";
let speech = "";

const closeAll = () => {
  responsiveVoice.cancel();
  popupSection.classList.add("hidden");
  hideAllContent();
  popupButtonLookup.classList.remove("active");
  lookupContentText.textContent = "";
  translatedTextSection.textContent = "";
  summaryText.textContent = "";
}

function replaceLinksInTextWithAnchors(text) {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*\b/g;
  const resultWithLinks = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
  return resultWithLinks;
}

document.addEventListener("mouseup", showPopupSection);
window.addEventListener("resize", showPopupSection);

function showPopupSection() {
  if (root.getSelection().type !== 'None') {
    return;
  }

  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== selectedTextForLookup) {
    closeAll(); // reset state
  }

  if (selectedText !== "") {
    selectedTextForLookup = selectedText;
    const selectionRange = window.getSelection().getRangeAt(0);
    const startRect = selectionRange.getBoundingClientRect();
    const endNode = selectionRange.endContainer;
    const popupTop = startRect.bottom + window.scrollY;
    let popupLeft = startRect.left + window.scrollX;

    if (endNode.nodeType === Node.ELEMENT_NODE) {
      const endRect = endNode.getBoundingClientRect();
      if (endRect.left > startRect.right) {
        popupLeft -= 50;
      }
    }

    if (window.innerWidth - popupLeft < 450) {
      popupLeft = window.innerWidth - 450;
    } else {
      lookupContent.style.transform = "none";
      translationContent.style.transform = "none";
    }
    popupSection.style.top = `${popupTop}px`;
    popupSection.style.left = `${popupLeft}px`;

    popupSection.classList.remove("hidden");
  } else {
    closeAll();
  }
}

function speechToText(event) {
  event.stopPropagation();
  responsiveVoice.speak(speech);
}

/*
* Lookup
*/

popupButtonLookup.addEventListener("click", async function (event) {
  event.stopPropagation();
  hideAllContent();
  lookupContent.classList.remove("hidden");
  if (selectedTextForLookup != "") {
    lookupContentText.textContent = "Loading...";

    try {
      submitLog({
        type: 'selection-ai-toolbox',
        action: 'lookup',
        text: selectedTextForLookup,
      })
      const result = await askAI(selectedTextForLookup);
      speech = result;
      const finalResult = replaceLinksInTextWithAnchors(result);
      lookupContentText.innerHTML = finalResult;
    } catch (error) {
      lookupContentText.textContent = "An error occurred.";
      console.error(error);
    }
  }
});

/*
* Translation
*/

async function translateText(event) {
  event.stopPropagation();
  hideAllContent();
  translationContent.classList.remove("hidden");
  console.log("yess");
  if (selectedTextForLookup != "") {
    translatedTextSection.textContent = "Loading...";

    try {
      submitLog({
        type: 'selection-ai-toolbox',
        action: 'translate',
        text: selectedTextForLookup,
      })
      const result = await askAItoTranslate(
        selectedTextForLookup,
        selectedLanguage.value
      );
      translatedTextSection.innerHTML = result;
    } catch (error) {
      translatedTextSection.textContent = "An error occurred.";
      console.error(error);
    }
  }
}

popupButtonTranslate.addEventListener("click", async function (event) {
  translateText(event);
});

speechToTextButton.addEventListener("click", speechToText);
selectedLanguage.addEventListener("change", translateText);

/*
* Summary
*/

const SUMMARY_MIN_LENGTH = 80;

const summaryButton = root.getElementById('summary-button');
const summaryContent = root.getElementById("summary-content");
const summaryText = root.getElementById('summary-text');
const summaryLengthInput = root.getElementById('summary-length');

async function generateSummary() {
  if (selectedTextForLookup.length < SUMMARY_MIN_LENGTH) {
    translatedTextSection.textContent = "The selection is too short for the summarization :(";
    return;
  }

  const preferredLength = summaryLengthInput.value;
  console.assert(preferredLength > 0 && preferredLength < 100);

  translatedTextSection.textContent = "Loading...";
  try {
    submitLog({
      type: 'selection-ai-toolbox',
      action: 'summarize',
      text: selectedTextForLookup,
    })
    summaryText.innerText = await askAItoSummarize(
        selectedTextForLookup,
        preferredLength,
    );
  } catch (error) {
    summaryText.textContent = "An error occurred. Maybe the input is too long...";
    console.error(error);
  }
}

summaryButton.addEventListener("click", async () => {
  if (!selectedTextForLookup) {
    closeAll();
    return;
  }

  hideAllContent();
  summaryContent.classList.remove("hidden");

  await generateSummary();
});

summaryLengthInput.addEventListener('change', generateSummary);
