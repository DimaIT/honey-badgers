/******************/
/* session set-up */
/******************/

// request a new session from the Surfly API, returns URL for iframe.src
// WARNING! You should not expose the REST key in frontend source. So if you are planning to hardcode the key, do it in a server-side script and call the API from there.
async function create_session() {
    const api_key = document.querySelector('#api_key').value;
    const url = document.querySelector('#url').value;

    if (!api_key || !url) return;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url,
            headless: true,
            script_embedded: "https://dimait.github.io/honey-badgers/embedded/index.js", // point this URL to your own embedded script
        }),
    };

    const res = await fetch(`https://surfly.online/v2/sessions/?api_key=${api_key}`, params);
    const data = await res.json();
    return data.headless_link;
}

// load the session link in the iframe and swap to in-session UI
function show_session(headless_link) {
    for (const node of document.querySelectorAll('.hide-after-start')) {
        node.setAttribute('hidden', '');
    }
    for (const node of document.querySelectorAll('.show-after-start')) {
        node.removeAttribute('hidden');
    }
    document.querySelector('iframe').src = headless_link;
}

/*************************/
/* session communication */
/*************************/

// send a command to the script_embedded running inside the session
function command(data) {
    document.querySelector('iframe').contentWindow.postMessage(data, '*');
}

// tell the script_embedded to load a provided URL
function navigate() {
    let url = document.querySelector('#url').value;
    command({type: 'nav', url});
}

// tell the script_embedded to replace all <img> with a provided image
function doot() {
    const url = document.querySelector('#img_url').value;
    command({type: 'doot', url});
}
