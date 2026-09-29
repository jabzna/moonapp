const birthdateInput =
    document.getElementById("birthdate");

const revealButton =
    document.getElementById("reveal-button");

const result =
    document.getElementById("result");

const moonVisual =
    document.getElementById("moon-visual");

const today = new Date();

const todayString =
    today.toISOString().split("T")[0];

birthdateInput.max = todayString;


const phaseName =
    document.getElementById("phase-name");

const phaseDescription =
    document.getElementById("phase-description");

const illumination =
    document.getElementById("illumination");

const moonAge =
    document.getElementById("moon-age");

const errorMessage =
    document.getElementById("error-message");


revealButton.addEventListener(
    "click",
    getMoonPhase
);


async function getMoonPhase() {

    const birthdate =
        birthdateInput.value;


    if (!birthdate) {

        showError(
            "Please select your birth date."
        );

        return;
    }


    clearError();

    revealButton.disabled = true;

    revealButton.textContent =
        "Finding your Moon...";


    try {

        const response =
            await fetch(
                `/api/moon?date=${birthdate}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve Moon data."
            );
        }


        const data =
            await response.json();


        displayMoon(data);


    } catch (error) {

        console.error(error);

        showError(
            "We couldn't retrieve your Moon phase. Please try again."
        );


    } finally {

        revealButton.disabled = false;

        revealButton.textContent =
            "Reveal My Moon";

    }
}


function displayMoon(data) {

   
    phaseName.textContent =
        data.phase.name;


 

    const illuminationPercent =
        Math.round(
            data.phase.illumination * 100
        );


    illumination.textContent =
        `${illuminationPercent}%`;


   

    moonAge.textContent =
        `${data.phase.age_days.toFixed(1)} days`;



    if (
        data.moon_visual &&
        data.moon_visual.svg
    ) {

        moonVisual.innerHTML =
            data.moon_visual.svg;

    }


    

    phaseDescription.textContent =
        getPhaseDescription(
            data.phase.name
        );


   

    if (
        data.special_moon &&
        data.special_moon.labels &&
        data.special_moon.labels.length > 0
    ) {

        phaseDescription.textContent +=
            ` ${data.special_moon.labels.join(", ")}.`;

    }


    result.hidden = false;
}


function getPhaseDescription(phase) {

    const descriptions = {

        "New Moon":
            "The Moon was in its new moon phase.",

        "Waxing Crescent":
            "The illuminated portion of the Moon was growing.",

        "First Quarter":
            "About half of the Moon was illuminated.",

        "Waxing Gibbous":
            "More than half of the Moon was illuminated and growing.",

        "Full Moon":
            "The Moon was fully illuminated.",

        "Waning Gibbous":
            "More than half of the Moon was illuminated and decreasing.",

        "Last Quarter":
            "About half of the Moon was illuminated.",

        "Third Quarter":
            "About half of the Moon was illuminated.",

        "Waning Crescent":
            "Only a small portion of the Moon was illuminated."
    };


    return descriptions[phase] ||
        "This was the Moon's phase on your birthday.";
}


function showError(message) {

    errorMessage.textContent =
        message;

}


function clearError() {

    errorMessage.textContent =
        "";

}
