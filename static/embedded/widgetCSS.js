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
styleElement.textContent = `import url("/honey-badgers/static/embedded/styles.css");`;

// Append the <style> element to the document's <head>
document.head.appendChild(styleElement);

