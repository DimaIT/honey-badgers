console.log('\nEmbedded script is alive!\n\n');

document.addEventListener("DOMContentLoaded", async (event) => {
    const root = document.createElement('div')
    root.id = 'surfly-shadow-host';
    root.style = 'padding: 0; margin: 0';
    root.attachShadow({ mode: "open" });
    document.body.appendChild(root);

    const { submitLog } = await import('https://dimait.github.io/honey-badgers/static/embedded/session-logs.js');
    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetCSS.js');
    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetHtml.js');
    await import('https://dimait.github.io/honey-badgers/static/embedded/widgetScript.js');
    // const input = "Despite a police complaint being registered in May, no investigation into the incident took place until a video of it surfaced on social media in July. That's when the conflict in Manipur caught the attention of many in India and around the world.";
    // const answer = await askAI('summarise', input);
    // console.log(answer);

    submitLog({ test: 'test' });

    // respond to messages sent from the controlling frame
    window.addEventListener('message', event => {
        // user changed the controlling frame's "address bar"
        if (event.data.type === 'nav') {
            window.location.href = event.data.url;
            // user requested images to be replaced
        }
    });
});
