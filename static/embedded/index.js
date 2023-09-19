// inject style into to every page in the session to make the page use a monospace font
const style_src = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
  * {
    font-family: 'Roboto Mono', monospace !important;
  }
`;
window.addEventListener('DOMContentLoaded', event => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = style_src;
    document.querySelector('head').append(style);
});

// respond to messages sent from the controlling frame
window.addEventListener('message', event => {

    // user changed the controlling frame's "address bar"
    if (event.data.type === 'nav') {
        window.location.href = event.data.url;

        // user requested images to be replaced
    } else if (event.data.type === 'doot') {
        const skeltal_url = 'https://cdn.glitch.me/4e9013bd-5b9c-40a2-a5f7-b07ed2aaf658%2Fdoot.jpg?v=1636123968616';
        for (const img of document.querySelectorAll('img')) {
            const {height, width} = img;
            img.src = event.data.url || skeltal_url;
            img.srcset = '';
            img.height = height;
            img.width = width;
        }
    }
});

