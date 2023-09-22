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

function add_popup(){
    var popupDiv = document.createElement('div');
    popupDiv.id = 'teacher-joins-popup';

    var paragraph = document.createElement('p');
    paragraph.textContent = 'Your request has been sent to the Teacher. Please wait for them to join.';

    var cancelButton = document.createElement('button');
    cancelButton.setAttribute('onclick', 'cancel_contact_teacher()');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';

    popupDiv.appendChild(paragraph);
    popupDiv.appendChild(cancelButton);

    document.getElementsByTagName("body")[0].appendChild(popupDiv);
}

function remove_contact_teacher_button() {
    var button = document.getElementById("contact-teacher-button");
    button.remove();
}

function hide_contact_teacher_popup() {
    const popup = document.getElementById("teacher-joins-popup");
    popup.style.display = "none";
}

function cancel_contact_teacher() {
    // TODO - send message to teacher
    hide_contact_teacher_popup();
}


create_contact_teacher_button();
add_popup();
