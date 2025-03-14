import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = await d3.csv("Script/imageData.csv");
console.log(data[0].path);

let button = document.querySelector("#userInputButton");
button.onclick = function () {
    let text = document.querySelector("#userInput");
    console.log(text.value);
}

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

function switchImg() {
    let imgVariables = getRandomObject();

    document.getElementById("randomImage").src = imgVariables.path;

    document.getElementById("randomAltText").innerHTML = "Original Alt-text: " + imgVariables.altText;

    document.getElementById("randomType").innerHTML = "Image Type: " + imgVariables.type;

    document.getElementById("randomSource").innerHTML = "On-line Source: " + imgVariables.source;

    botsToImg(imgVariables);
}

function botsToImg(imgVariables) {
    // Get the dropdown and the element to pop out
    const bots = document.getElementById("bots");
    const functionN = document.getElementById("functionN");
    const sensationN = document.getElementById("sensationN");
    const rationaleN = document.getElementById("rationaleN");
    const associationN = document.getElementById("associationN");
    const feelingN = document.getElementById("feelingN");

    functionN.innerHTML = "" + imgVariables.functionBot;
    sensationN.innerHTML = "" + imgVariables.sensationBot;
    rationaleN.innerHTML = "" + imgVariables.rationaleBot;
    associationN.innerHTML = "" + imgVariables.associationBot;
    feelingN.innerHTML = "" + imgVariables.feelingBot;

    sensationN.style.display = "none";
    rationaleN.style.display = "none";
    associationN.style.display = "none";
    feelingN.style.display = "none";

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
    });
}

switchImg();

document.getElementById("showBotsMenu").addEventListener("click", function () {
    document.getElementById("botsMenu").style.display = "flex";
});

document.getElementById("closeBotsMenu").addEventListener("click", function () {
    document.getElementById("botsMenu").style.display = "none";
});

document.getElementById("switchImg").addEventListener("click", function () {
    switchImg();
});


