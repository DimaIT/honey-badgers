const responsiveVoiceScript = document.createElement("script");
responsiveVoiceScript.src = "https://code.responsivevoice.org/responsivevoice.js?key=cMfKSdpe";

const fontAwesomeCss = document.createElement("link");
fontAwesomeCss.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
fontAwesomeCss.rel = "stylesheet";
fontAwesomeCss.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
fontAwesomeCss.crossOrigin = "anonymous";
fontAwesomeCss.referrerPolicy = "no-referrer";

document.head.appendChild(responsiveVoiceScript);
document.head.appendChild(fontAwesomeCss);


const styleElement = document.createElement("style");
styleElement.textContent = `
.hidden {
  display: none !important;
}

.widget {
  font-family: sans-serif;
}

.cursor-pointer {
  cursor: pointer;
}

#popup-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 8px;
  color: rgb(69, 69, 69);
  gap: 5px;
  text-align: center;
}

#popup-button:hover {
  background: linear-gradient(#c52b521c, #94575735);
  color: #e03b56;
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

#popup-section.hidden {
  display: none;
}

.lookup-content {
  width: 400px;
  min-height: 150px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  background-color: #fffffff7;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.5s ease-out;
}

.menu {
  position: relative;
  width: 200px;
  display: flex;
  padding: 5px;
  justify-content: space-around;
  border-radius: 9px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 15px;
  padding: 4px;
}

#speech-to-text {
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  background-color: #e03b56;
  margin: 10px 0;
  padding: 6px;
  color: white;
}

.active {
  background: linear-gradient(#c52b521c, #94575735);
  color: #e03b56;
  cursor: pointer;
}
`;

// Append the <style> element to the document's <head>
document.head.appendChild(styleElement);

  