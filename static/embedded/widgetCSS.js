const root = document.getElementById('surfly-shadow-host').shadowRoot;

const responsiveVoiceScript = document.createElement("script");
responsiveVoiceScript.src = "https://code.responsivevoice.org/responsivevoice.js?key=cMfKSdpe";

root.appendChild(responsiveVoiceScript);

const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "https://dimait.github.io/honey-badgers/static/embedded/styles.css";

// Append the <link> element to the document's <head>
root.appendChild(linkElement);

