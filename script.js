const birthdateInput =
    document.getElementById("birthdate");

const revealButton =
    document.getElementById("reveal-button");

const result =
    document.getElementById("result");

const errorMessage =
    document.getElementById("error-message");


revealButton.addEventListener(
    "click",
    handleBirthdate
);


function handleBirthdate() {

    const birthdate =
        birthdateInput.value;


    if (!birthdate) {

        errorMessage.textContent =
            "Please select your birth date.";

        return;
    }


    errorMessage.textContent = "";


    console.log(
        "Selected birthday:",
        birthdate
    );


    result.hidden = false;
}
