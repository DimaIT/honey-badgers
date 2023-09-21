const { askAI } = await import('https://dimait.github.io/honey-badgers/static/embedded/ai.js');

// Create the HTML template as a string
const popupTemplate = `
  <div id="popup-section" class="hidden">
    <button id="popup-button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    <div class="lookup-content hidden" id="lookup-content">
        <ul>
            <li><a href="#">Explain</a></li>
            <li><a href="#">Summarise</a></li>
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
const lookupContentActions = document.querySelectorAll("#lookup-content a");

function handleLookupActionClick(e) {
  const action = e.target.textContent;
  const selectedText = window.getSelection().toString().trim();
  askAI(action, selectedText).then((answer) => {
    console.log(answer)
  });
}

document.querySelectorAll("#lookup-content a").forEach(
    elem => elem.addEventListener("click", handleLookupActionClick)
);

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
