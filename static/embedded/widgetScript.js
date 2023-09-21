const root = document.getElementById('surfly-shadow-host').shadowRoot;
const popupSection = root.getElementById("popup-section");
const lookupContent = root.getElementById("lookup-content");
const lookupContentText = root.getElementById("lookup-content-text");
const activeButton = root.getElementById("popup-button");
const speechToTextButton = root.getElementById("speech-to-text");
let selectedTextForLookup = "";
let speech = "";

function replaceLinksInTextWithAnchors(text) {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*\b/g;
  const resultWithLinks = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
  return resultWithLinks;
}

document.addEventListener("mouseup", showpopupSection);
window.addEventListener("resize", showpopupSection);

function showpopupSection() {
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
    }
    popupSection.style.top = `${popupTop}px`;
    popupSection.style.left = `${popupLeft}px`;

    popupSection.classList.remove("hidden");
  } else {
    responsiveVoice.cancel();
    popupSection.classList.add("hidden");
    lookupContent.classList.add("hidden");
    activeButton.classList.remove("active");
    lookupContent.style.transform = "none";
    lookupContentText.textContent = "";
  }
}

function speechToText(event) {
  event.stopPropagation();
  responsiveVoice.speak(speech);
}

popupSection.addEventListener("click", async function (event) {
  event.stopPropagation();
  lookupContent.classList.remove("hidden");
  activeButton.classList.add("active");
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
  }
});

speechToTextButton.addEventListener("click", speechToText);
