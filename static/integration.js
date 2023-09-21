/******************/
/* session set-up */
/******************/

let sessionId = null;
let apiKey = null;

// request a new session from the Surfly API, returns URL for iframe.src
// WARNING! You should not expose the REST key in frontend source. So if you are planning to hardcode the key, do it in a server-side script and call the API from there.
async function create_session() {
    apiKey = apiKey ?? document.querySelector('#api_key').value;
    const url = document.querySelector('#url').value;

    if (!url) {
        return;
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url,
            headless: false,
            ui_off: true,
            audit_logs_enabled: true,
            script_embedded: `https://dimait.github.io/honey-badgers/static/embedded/index.js?random=${Math.random()}`, // point this URL to your own embedded script
        }),
    };

    const res = await fetch(`https://surfly.online/v2/sessions/?api_key=${apiKey}`, params);
    const data = await res.json();
    sessionId = data.session_id;
    return data.leader_link;
}

window.addEventListener('message', e => {
    if (e.data?.params?.event_type === "viewer_joined") {
        console.log('"viewer_joined"');
        document.querySelector('iframe').contentWindow.frames[0].postMessage(e.data, '*')
    }
});

async function end_session() {
    await fetch(`https://surfly.online/v2/sessions/${sessionId}/end/?api_key=${apiKey}`, {
        method: 'POST',
    });
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


function create_contact_teacher_button() {
    var button = document.createElement("button");

    button.id = "contact-teacher-button";
    button.textContent = "Contact the Teacher";
    button.style.position = "fixed";
    button.style.bottom = "50px";
    button.style.right = "50px";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.zIndex = "2147483647";
    button.style.border = "0";
    button.style.padding = "20px";

    button.addEventListener("click", async function() {
        const popup = document.getElementById("teacher-joins-popup");
        popup.style.display = "block";

    });

    // Add the button to the page
    document.getElementsByTagName("body")[0].appendChild(button);
}
