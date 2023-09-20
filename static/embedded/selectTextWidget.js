const { askAI } = await import('https://dimait.github.io/honey-badgers/static/embedded/ai.js');

// Import fontawesome icons for now
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
fontAwesomeLink.integrity =
  "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
fontAwesomeLink.crossOrigin = "anonymous";
fontAwesomeLink.referrerPolicy = "no-referrer";

// Append the <link> element to the document's <head>
document.head.appendChild(fontAwesomeLink);

// Create a <style> element and set its content to your CSS styles

const styleElement = document.createElement("style");
styleElement.textContent = `
  .hidden {
    display: none;
  }

  #popup-button {
    position: relative;
    background: linear-gradient(45deg, #3a0764, #690bb6);
    color: #fff;
    padding: 10px 10px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 40px;
    box-shadow: #64646f33 0px 7px 29px 0px;
  }

  #popup-section {
    padding: 10px;
    border-radius: 30px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
  }

  .lookup-content {
    width: 400px;
    height: 150px;
    border-radius: 8px;
    padding: 10px;
    background: linear-gradient(45deg, #3a07646b, #690bb651);
    color: white;
  }

  #popup-section.hidden {
    display: none;
  }
`;

// Append the <style> element to the document's <head>
document.head.appendChild(styleElement);

// Create the HTML template as a string
const popupTemplate = `
  <div id="popup-section" class="hidden">
    <button id="popup-button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    <div class="lookup-content hidden" id="lookup-content">
        <ul>
            <li>Explain</li>
            <li>Summarise</li>
        </ul>
    </div>
  </div>
`;

// Convert the HTML template string into DOM elements
const parser = new DOMParser();
const popupElements = parser.parseFromString(popupTemplate, "text/html").body
  .firstChild;

// Append the popupElements to the body or another suitable container
document.body.appendChild(popupElements);

const popupButton = document.getElementById("popup-section");
const lookupContent = document.getElementById("lookup-content");
const lookupContentActions = document.querySelector("#lookup-content a");

lookupContentActions.addEventListener("click", function (e) {
    e.stopPropagation();
    const action = e.target.textContent;
    const selectedText = window.getSelection().toString().trim();
    askAI(action, selectedText).then((answer) => { alert(answer) });
});

// Function to show the popup button next to selected text
function showPopupButton() {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {

    // Get the selection range
    const selectionRange = window.getSelection().getRangeAt(0);

    // Get the position of the selected text
    const rect = selectionRange.getBoundingClientRect();

    // Set the position of the popup button
    popupButton.style.top = rect.bottom + window.scrollY + "px";
    popupButton.style.left = rect.right + window.scrollX + "px";

    // Show the popup button
    popupButton.classList.remove("hidden");
  } else {
    // Hide the popup button if no text is selected
    popupButton.classList.add("hidden");
    lookupContent.classList.add("hidden");
  }
}

// Event listener for text selection
document.addEventListener("mouseup", showPopupButton);

// Update the position of the popup when the window is resized
window.addEventListener("resize", showPopupButton);


popupButton.addEventListener("click", function () {
  lookupContent.classList.remove("hidden");
});
