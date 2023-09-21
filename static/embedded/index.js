console.log('\nEmbedded script is alive!\n\n');

document.addEventListener("DOMContentLoaded", async (event) => {
    const root = document.createElement('div')
    root.id = 'surfly-shadow-host';
    root.style = 'padding: 0; margin: 0';
    root.attachShadow({ mode: "open" });
    document.body.appendChild(root);

    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetCSS.js');
    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetHtml.js');
    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetScript.js');


    // respond to messages sent from the controlling frame
    window.addEventListener('message', event => {
        // user changed the controlling frame's "address bar"
        if (event.data.type === 'nav') {
            window.location.href = event.data.url;
            // user requested images to be replaced
        }
    });
});
