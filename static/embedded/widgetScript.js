const { submitLog } = await import('https://dimait.github.io/honey-badgers/static/embedded/session-logs.js');
const { askAI } = await import('https://dimait.github.io/honey-badgers/static/embedded/ai.js');

const root = document.getElementById('surfly-shadow-host').shadowRoot;
const popupSection = root.getElementById("popup-section");
const lookupContent = root.getElementById("lookup-content");
const translationContent = root.getElementById("translation-content");
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
    responsiveVoice.cancel();
    popupSection.classList.add("hidden");
    lookupContent.classList.add("hidden");
    translationContent.classList.add("hidden");
    popupButtonLookup.classList.remove("active");
    lookupContentText.textContent = "";
    translatedTextSection.textContent = "";
  }
}

function speechToText(event) {
  event.stopPropagation();
  responsiveVoice.speak(speech);
}

popupButtonLookup.addEventListener("click", async function (event) {
  event.stopPropagation();
  await translationContent.classList.add("hidden");
  await lookupContent.classList.remove("hidden");
  if (selectedTextForLookup != "") {
    lookupContentText.textContent = "Loading...";

    try {
      const result = await askAI(selectedTextForLookup);
      speech = result;
      const finalResult = replaceLinksInTextWithAnchors(result);
      lookupContentText.innerHTML = finalResult;
    } catch (error) {
      lookupContentText.textContent = "An error occurred.";
      console.error(error);
    }
    submitLog({
      type: 'selection-ai-toolbox',
      action: 'lookup',
      text: selectedTextForLookup,
    })
  }
});

async function translateText(event) {
  event.stopPropagation();
  await lookupContent.classList.add("hidden");
  await translationContent.classList.remove("hidden");
  console.log("yess");
  if (selectedTextForLookup != "") {
    translatedTextSection.textContent = "Loading...";

    try {
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
