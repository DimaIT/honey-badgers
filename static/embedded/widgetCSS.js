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

const sheet = new CSSStyleSheet();
sheet.insertRule("@import https://dimait.github.io/honey-badgers/static/embedded/style.css;");
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
