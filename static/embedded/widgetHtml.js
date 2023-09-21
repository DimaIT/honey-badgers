const root = document.getElementById('surfly-shadow-host').shadowRoot;

const popupTemplate = `
<div class="widget">
      <div id="popup-section" class="hidden">
        <div class="menu" style="display: flex">
          <button id="popup-button">
            <i class="fa-solid fa-eye icon-color"></i> Lookup
          </button>
          <hr />
          <button id="popup-button2">
            <i class="fa-solid fa-language icon-color"></i> Translate
          </button>
        </div>
        <div class="lookup-content hidden" id="lookup-content">
          <h3 style="margin: 0">Lookup</h3>
          <hr />
          <div id="lookup-content-text"></div>
          <button id="speech-to-text">
            Listen <i class="fa-solid fa-play" style="margin-left: 5px"></i>
          </button>
        </div>
        <div class="lookup-content hidden" id="translation-content">
          <h3 style="margin: 0;padding:0 6px;">Translation</h3>
          <hr>
          <div id="translate-controls">
            <select name="" id="select-language">
              <option value="dutch">Dutch</option>
              <option value="english">English</option>
              <option value="french">French</option>
            </select>
          </div>
          <div id="translated-text-section"></div>
        </div>
      </div>
    </div>
`;

// Convert the HTML template string into DOM elements
const parser = new DOMParser();
const popupElements = parser.parseFromString(popupTemplate, "text/html").body
  .firstChild;

// Append the popupElements to the body or another suitable container
root.appendChild(popupElements);
