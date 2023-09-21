const root = document.getElementById('surfly-shadow-host').shadowRoot;

const responsiveVoiceScript = document.createElement("script");
responsiveVoiceScript.src = "https://code.responsivevoice.org/responsivevoice.js?key=cMfKSdpe";

root.appendChild(responsiveVoiceScript);


const fontAwesomeCss = document.createElement("link");
fontAwesomeCss.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
fontAwesomeCss.rel = "stylesheet";
fontAwesomeCss.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
fontAwesomeCss.crossOrigin = "anonymous";
fontAwesomeCss.referrerPolicy = "no-referrer";

root.appendChild(fontAwesomeCss);
document.head.appendChild(fontAwesomeCss.cloneNode()); // it only works in shadow dom like this =\


const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "https://dimait.github.io/honey-badgers/static/embedded/styles.css";

// Append the <link> element to the document's <head>
root.appendChild(linkElement);

