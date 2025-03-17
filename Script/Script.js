import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
// import Typewriter from './node_modules/typewriter-effect/dist/core.js';

// Importing D3.js and Loading CSV Data
const data = await d3.csv("Script/imageData.csv");
console.log(data[0].path);

// let button = document.querySelector("#userInputButton");
// button.onclick = function () {
//     let text = document.querySelector("#userInput");
//     console.log(text.value);
// }

//Picking a Random Image from the CSV
function getRandomObject() {
    const num = Math.floor(Math.random() * 37);
    // console.log(num);
    let path = data[num].path;
    let altText = data[num].altText;
    let type = data[num].type;
    let source = data[num].source;
    let functionBot = data[num].functionBot;
    let sensationBot = data[num].sensationBot;
    let rationaleBot = data[num].rationaleBot;
    let associationBot = data[num].associationBot;
    let feelingBot = data[num].feelingBot;
    console.log(path);
    return { path, altText, type, source, functionBot, sensationBot, rationaleBot, associationBot, feelingBot };
}

console.log(getRandomObject());

//Switching the Image and Updating Metadata
function switchImg() {
    let imgVariables = getRandomObject();

    document.getElementById("randomImage").src = imgVariables.path;

    //Update metadata using data-attributes
    let randomAltText = document.getElementById("randomAltText");
    let randomType = document.getElementById("randomType");
    let randomSource = document.getElementById("randomSource");

    // Store the actual values in data attributes
    randomAltText.setAttribute("data-alt", imgVariables.altText);
    randomType.setAttribute("data-type", imgVariables.type);
    randomSource.setAttribute("data-source", imgVariables.source);

    // Reset button text
    randomAltText.innerHTML = "Alt-text";
    randomType.innerHTML = "Image Type";
    randomSource.innerHTML = "On-line Source";


    document.getElementById("botNarrator").src = "/images/functionGIF.gif";

    botsToImg(imgVariables);
}

document.getElementById("randomAltText").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "Alt-text") ? this.getAttribute("data-alt") : "Alt-text";
});

document.getElementById("randomType").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "Image Type") ? this.getAttribute("data-type") : "Image Type";
});

document.getElementById("randomSource").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "On-line Source") ? this.getAttribute("data-source") : "On-line Source";
});

//Handling Bot Responses Based on Dropdown Selection
function botsToImg(imgVariables) {
    // Get the dropdown and the element to pop out
    const bots = document.getElementById("bots");
    const functionN = document.getElementById("functionN");
    const sensationN = document.getElementById("sensationN");
    const rationaleN = document.getElementById("rationaleN");
    const associationN = document.getElementById("associationN");
    const feelingN = document.getElementById("feelingN");

    //Text inside the speech bubble
    functionN.innerHTML = "" + imgVariables.functionBot;
    sensationN.innerHTML = "" + imgVariables.sensationBot;
    rationaleN.innerHTML = "" + imgVariables.rationaleBot;
    associationN.innerHTML = "" + imgVariables.associationBot;
    feelingN.innerHTML = "" + imgVariables.feelingBot;

    sensationN.style.display = "none";
    rationaleN.style.display = "none";
    associationN.style.display = "none";
    feelingN.style.display = "none";

    var textToType = functionN.innerText;

    console.log(textToType);

    var typewriter = new Typewriter(functionN, {
        delay: 50,
    });

    typewriter
        .typeString(textToType) // Get text content inside the element
        .start();

    let narrator = document.getElementById("botNarrator");

    // Event listener for change in dropdown selection
    bots.addEventListener("change", function () {
        // Object corresponding map dropdown values to n elements
        const narrations = {
            f: functionN,
            s: sensationN,
            r: rationaleN,
            a: associationN,
            fe: feelingN
        };

        // Hide all narrations
        Object.values(narrations).forEach(el => el.style.display = "none");

        // Show the selected narration if it exists
        const selectedNarration = narrations[bots.value];
        if (selectedNarration) {
            selectedNarration.style.display = "block";
        }

        const imagePath = {
            f: "/images/functionGIF.gif",
            s: "/images/sensationGIF.gif",
            r: "/images/rationaleGIF.gif",
            a: "/images/associationGIF.gif",
            fe: "/images/feelingGIF.gif"
        };

        const selectedPath = imagePath[bots.value];
        narrator.src = selectedPath;

        var textToType = selectedNarration.innerText;

        console.log(textToType);

        var typewriter = new Typewriter(selectedNarration, {
            delay: 75,
        });

        typewriter
            .typeString(textToType) // Get text content inside the element
            .start();
    });
}

//Auto-Switch Image on Load
switchImg();

//Handling UI Interactions (Menu Toggle & Image Switching)
document.getElementById("showBotsMenu").addEventListener("click", function () {
    document.getElementById("botsMenu").style.display = "flex";
});

document.getElementById("closeBotsMenu").addEventListener("click", function () {
    document.getElementById("botsMenu").style.display = "none";
});

document.getElementById("switchImg").addEventListener("click", function () {
    switchImg();
});

//hide all image info within info button and make a toggle effect to show and hide them
let randomText = document.querySelectorAll(".randomText");

console.log(randomText);

Array.from(randomText).forEach(randomText => {
    randomText.style.display = "none";
});

document.getElementById("infoButton").addEventListener("click", function () {
    Array.from(randomText).forEach(randomText => {
        if (randomText.style.display === "none") {
            randomText.style.display = "block"; // Show it
        } else {
            randomText.style.display = "none"; // Hide it
        }
    })
});
