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
    const apiKey = "5f774775d45b4328b2c8976a841418c8";
    const url = "https://wikipedia.org";

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url,
            queued: true,
        }),
    };

    const res = await fetch(`https://surfly.online/v2/sessions/?api_key=${apiKey}`, params);
    const data = await res.json();
    sessionId = data.session_id;
    window.location.href = data.leader_link;
});

// Add the button to the page
document.getElementsByTagName("body")[0].appendChild(button);