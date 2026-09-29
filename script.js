const birthdateInput = document.getElementById("birthdate");
const searchButton = document.getElementById("searchButton");

const result = document.getElementById("result");
const moonImage = document.getElementById("moonImage");

const phaseName = document.getElementById("phaseName");
const phaseDescription = document.getElementById("phaseDescription");

const displayDate = document.getElementById("displayDate");
const illumination = document.getElementById("illumination");
const moonAge = document.getElementById("moonAge");

const errorMessage = document.getElementById("errorMessage");


searchButton.addEventListener("click", getMoonPhase);


async function getMoonPhase() {

    const birthdate = birthdateInput.value;

    if (!birthdate) {
        errorMessage.textContent = "Please select your birth date.";
        return;
    }

    errorMessage.textContent = "";

    try {


        const API_URL = `https://api.freeastroapi.com/api/v1/moon/phase`;

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API request failed.");
        }

        const data = await response.json();

        displayMoonPhase(data, birthdate);

    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Sorry, we couldn't retrieve the Moon data.";

    }
}


function displayMoonPhase(data, birthdate) {



    const phase = data.phase.name;
    const moonIllumination = data.phase.illumination;
    const age = data.phase.age;

    phaseName.textContent = phase;

    illumination.textContent =
        `${moonIllumination}%`;

    moonAge.textContent =
        `${age} days`;

    displayDate.textContent =
        formatDate(birthdate);


  

    const imagePath = getMoonImage(phase);

    moonImage.src = imagePath;

    moonImage.alt =
        `Moon phase: ${phase}`;


  
    phaseDescription.textContent =
        getPhaseDescription(phase);


    result.classList.add("visible");
}


function formatDate(dateString) {

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


function getMoonImage(phase) {

    const images = {

        "New Moon":
            "assets/moon/new-moon.png",

        "Waxing Crescent":
            "assets/moon/waxing-crescent.png",

        "First Quarter":
            "assets/moon/first-quarter.png",

        "Waxing Gibbous":
            "assets/moon/waxing-gibbous.png",

        "Full Moon":
            "assets/moon/full-moon.png",

        "Waning Gibbous":
            "assets/moon/waning-gibbous.png",

        "Third Quarter":
            "assets/moon/third-quarter.png",

        "Waning Crescent":
            "assets/moon/waning-crescent.png"
    };

    return images[phase] || "assets/moon/full-moon.png";
}


function getPhaseDescription(phase) {

    const descriptions = {

        "New Moon":
            "The Moon was in its new moon phase.",

        "Waxing Crescent":
            "A small portion of the Moon was illuminated and growing.",

        "First Quarter":
            "About half of the Moon was illuminated.",

        "Waxing Gibbous":
            "More than half of the Moon was illuminated and growing.",

        "Full Moon":
            "The Moon was fully illuminated.",

        "Waning Gibbous":
            "More than half of the Moon was illuminated and decreasing.",

        "Third Quarter":
            "About half of the Moon was illuminated.",

        "Waning Crescent":
            "A small portion of the Moon was illuminated and decreasing."
    };

    return descriptions[phase] || "";
}




const API_URL = `https://api.freeastroapi.com/api/v1/moon/phase`;




