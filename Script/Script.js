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

// let path;
// let altText;
// let type;
// let origin;

function getRandomObject() {
    const num = Math.floor(Math.random() * 37);
    // console.log(num);
    let path = data[num].path;
    let altText = data[num].altText;
    let type = data[num].type;
    let source = data[num].source;
    console.log(path);
    return { path, altText, type, source };
}

console.log(getRandomObject());

let imgVariables = getRandomObject();

document.getElementById("randomImage").src = imgVariables.path;

document.getElementById("randomAltText").innerHTML = "Original Alt-text: " + imgVariables.altText;

document.getElementById("randomType").innerHTML = "Image Type: " + imgVariables.type;

document.getElementById("randomSource").innerHTML = "Source: " + imgVariables.source;

