const popupButton = document.getElementById("popup-section");
const lookupContent = document.getElementById("lookup-content");
const lookupNewContent = document.getElementById("lookup-content-new");
const activeButton = document.getElementById("popup-button");
const speechToTextButton = document.getElementById("speech-to-text");
const lookupContentActions = document.querySelectorAll("#lookup-content a");
const popupSection = document.getElementById("popup-section");
let selectedTextForLookup = "";
let speech = "";

function replaceLinksInTextWithAnchors(text) {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*\b/g;
  const resultWithLinks = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
  return resultWithLinks;
}

function handleLookupActionClick(e) {
  const action = e.target.textContent;
  const selectedText = window.getSelection().toString().trim();
  askAI(action, selectedText).then((answer) => {
    console.log(answer);
  });
}

// Event listener for text selection
document.addEventListener("mouseup", showPopupButton);

// Update the position of the popup when the window is resized
window.addEventListener("resize", showPopupButton);

function showPopupButton() {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText !== "") {
    selectedTextForLookup = selectedText;
    const selectionRange = window.getSelection().getRangeAt(0);
    const startRect = selectionRange.getBoundingClientRect();
    const endNode = selectionRange.endContainer;

    // Calculate the position for the popup button
    const popupTop = startRect.bottom + window.scrollY;
    let popupLeft = startRect.left + window.scrollX;

    if (endNode.nodeType === Node.ELEMENT_NODE) {
      const endRect = endNode.getBoundingClientRect();

      // Check if the selected text is on the right
      if (endRect.left > startRect.right) {
        popupLeft -= 50; // Move the button 50px to the left
      }
    }

    // Check if there's limited space on the right (less than 450px)
    if (window.innerWidth - popupLeft < 450) {
      popupLeft = window.innerWidth - 450; // Move to the left edge
      // lookupContent.style.transform = "translateX(-100%)";
    } else {
      lookupContent.style.transform = "none";
    }

    popupButton.style.top = `${popupTop}px`;
    popupButton.style.left = `${popupLeft}px`;

    popupButton.classList.remove("hidden");
  } else {
    // responsiveVoice.cancel();
    popupButton.classList.add("hidden");
    lookupContent.classList.add("hidden");
    activeButton.classList.remove("active");
    lookupContent.style.transform = "none"; // Reset transform
    lookupNewContent.textContent = "";
  }
}

function speechToText(event) {
  event.stopPropagation();
  // responsiveVoice.speak(speech);
}

popupButton.addEventListener("click", async function (event) {
  event.stopPropagation();
  lookupContent.classList.remove("hidden");
  activeButton.classList.add("active");
  if (selectedTextForLookup != "") {
    lookupNewContent.textContent = "Loading...";

    try {
      const result = await askAI(selectedTextForLookup);
      speech = result;
      const finalResult = replaceLinksInTextWithAnchors(result);
      lookupNewContent.innerHTML = finalResult;
    } catch (error) {
      lookupNewContent.textContent = "An error occurred.";
      console.error(error);
    }
  }
});

speechToTextButton.addEventListener("click", speechToText);
