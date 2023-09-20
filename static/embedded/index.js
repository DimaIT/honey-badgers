console.log('\nEmbedded script is alive!\n\n');

(async function init() {
    const { submitLog } = await import('./session-logs.js');
    const { askAI } = await import('./ai.js');

    const input = "Despite a police complaint being registered in May, no investigation into the incident took place until a video of it surfaced on social media in July. That's when the conflict in Manipur caught the attention of many in India and around the world.";
    // const answer = await askAI('summarise', input);
    // console.log(answer);

    submitLog('test');

    // respond to messages sent from the controlling frame
    window.addEventListener('message', event => {
        // user changed the controlling frame's "address bar"
        if (event.data.type === 'nav') {
            window.location.href = event.data.url;
            // user requested images to be replaced
        }
    });
})();
