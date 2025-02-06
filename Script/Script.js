import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// d3.csv("Script/imageData.csv",(d)=>{
//     console.log(d);
//     data = d;
// });

const data = await d3.csv("Script/imageData.csv");
console.log(data[0].Origin);

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

let imgVariables = getRandomObject();

document.getElementById("randomImage").src = imgVariables.path;

document.getElementById("randomAltText").innerHTML = "Original Alt-text: " + imgVariables.altText;

document.getElementById("randomType").innerHTML = "Image Type: " + imgVariables.type;

document.getElementById("randomSource").innerHTML = "Source: " + imgVariables.source;

// Get the dropdown and the element to pop out
const bots = document.getElementById("bots");
const functionN = document.getElementById("functionN");
const sensationN = document.getElementById("sensationN");
const rationaleN = document.getElementById("rationaleN");
const associationN = document.getElementById("associationN");
const feelingN = document.getElementById("feelingN");

functionN.innerHTML = "Functional Description: " + imgVariables.functionBot;
sensationN.innerHTML = "Sensory Description: " + imgVariables.sensationBot;
rationaleN.innerHTML = "Metaphysical Description: " + imgVariables.rationaleBot;
associationN.innerHTML = "Association Description: " + imgVariables.associationBot;
feelingN.innerHTML = "Emotional Description: " + imgVariables.feelingBot;

sensationN.style.display = "none";
rationaleN.style.display = "none";
associationN.style.display = "none";
feelingN.style.display = "none";

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
});




