

// respond to messages sent from the controlling frame
window.addEventListener('message', event => {
    // user changed the controlling frame's "address bar"
    if (event.data.type === 'nav') {
        window.location.href = event.data.url;
        // user requested images to be replaced
    }
});

