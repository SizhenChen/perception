import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = await d3.csv("Script/imageData.csv");
console.log(data[0].path);

function appendImgs() {
    const container = document.querySelector(".imgContainer"); // Ensure a container exists in HTML

    for (let num = 0; num < data.length; num++) {  // Loop through all data entries
        let path = data[num].path;
        // console.log(path);
        const img = document.createElement("img");
        img.setAttribute("data-source", data[num].source);
        img.src = path;
        img.id = `image${num}`;
        img.classList.add(data[num].type);
        console.log(data[num].type);
        container.appendChild(img);
    }
}

appendImgs();
// document.addEventListener("DOMContentLoaded", appendImgs);

function showImgs(listOfImgs) {
    for (let i = 0; i < listOfImgs.length; i++) {
        listOfImgs[i].classList.remove("hide");
    }
}

function hideImgs(listOfImgs) {
    for (let i = 0; i < listOfImgs.length; i++) {
        listOfImgs[i].classList.add("hide");
    }
}

function updateSources() {
    const sourceSelector = document.querySelector("#sourceSelector");
    sourceSelector.innerHTML = '<option class="optionStyle" value="None">select source</option>'; // Reset the sourceSelector

    const Imgs = document.querySelectorAll("img:not(.hide)"); //Any of the imgs that don't have this class
    const seenSources = new Set(); // Track unique sources

    Imgs.forEach(img => {
        const source = img.getAttribute("data-source");
        if (!seenSources.has(source)) {
            seenSources.add(source);
            const option = document.createElement("option");
            option.value = source;
            option.innerHTML = source;
            option.style.background = "#000000";
            option.style.color = "white";
            sourceSelector.append(option);
        }
    });
    // const sourceSelector = document.querySelector("#sourceSelector");
    // sourceSelector.innerHTML = '<option value="None">None</option>';//Reset the sourceSelector to only have one option "None"
    // const Imgs = document.querySelectorAll("img:not(.hide)"); //Any of the imgs that don't have this class
    // for (let i = 0; i < Imgs.length; i++) {
    //     const option = document.createElement("option"); //creates a new option
    //     option.setAttribute("value", Imgs[i].getAttribute("data-source")); //option's value is set as the image's source
    //     option.innerHTML = Imgs[i].getAttribute("data-source");
    //     sourceSelector.append(option); //append the created option inside the sourceSelector
    // }
}

let typeSelector = document.querySelector("#typeSelector");

let allImgs = document.querySelectorAll("img");

typeSelector.onclick = function () {
    console.log(typeSelector.value);
    if (typeSelector.value === "Graphic") {
        const typeSelected = document.querySelectorAll(".Graphic");
        hideImgs(allImgs);
        showImgs(typeSelected);
    } else if (typeSelector.value === "Illustration") {
        const typeSelected = document.querySelectorAll(".Illustration");
        hideImgs(allImgs);
        showImgs(typeSelected);
    } else if (typeSelector.value === "Photography") {
        const typeSelected = document.querySelectorAll(".Photography");
        hideImgs(allImgs);
        showImgs(typeSelected);
    } else if (typeSelector.value === "Product") {
        const typeSelected = document.querySelectorAll(".Product");
        hideImgs(allImgs);
        showImgs(typeSelected);
    };

    updateSources();
};

