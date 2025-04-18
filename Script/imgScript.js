import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = await d3.csv("Script/imageData.csv");
console.log(data[0].path);

console.log(document.cookie);

console.log(data)

function appendImgs() {
    const container = document.querySelector(".imgContainer"); // Ensure a container exists in HTML

    for (let num = 0; num < data.length; num++) {  // Loop through all data entries
        let path = data[num].path;
        // console.log(path);
        const img = document.createElement("img");
        img.setAttribute("data-source", data[num].source);
        img.src = path;
        img.id = `image${num}`; //adding id for each img
        console.log(data[num].type);
        img.classList.add(data[num].type);
        container.appendChild(img);
    }
}

appendImgs();
// document.addEventListener("DOMContentLoaded", appendImgs);

function getCookie(imgNum) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split("; ");
    // console.log(cookieArray);
    for (let i = 0; i < cookieArray.length; i++) {
        let comment = cookieArray[i].split("=");
        // console.log(comment);
        if (comment[0] === `comment${imgNum}`) {//comment[0] is the first portion of the splited cookieArray[i]
            return comment[1];//return the comment part of the splited cookieArray[i]
        }
    }
}
console.log(getCookie(8));

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
    sourceSelector.innerHTML = `<option value="None">select source</option>`; // Reset the sourceSelector

    const Imgs = document.querySelectorAll("img:not(.hide)"); //Any of the imgs that don't have this class
    const seenSources = new Set(); // Track unique sources

    Imgs.forEach(img => {
        const source = img.getAttribute("data-source");
        if (!seenSources.has(source)) {
            seenSources.add(source);
            const option = document.createElement("option");
            option.value = source;
            option.innerHTML = source;
            sourceSelector.append(option);
        }
    });
};

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

let arraySources = ["Pinterest", "Walmart", "Uncommon Goods", "Amazon", "Annual Photography Award", "Art.com", "Etsy", "NASA", "Weibo", "Wikipedia", "Behance", "My Modern Met", "TATE", "Poster House", "Ebay"];

let sourceSelector = document.querySelector("#sourceSelector");

//shows the correspoding images as a source is selected
sourceSelector.addEventListener("change", function () {
    let sourceValue = sourceSelector.value;
    let typeValue = typeSelector.value;

    if (arraySources.includes(sourceValue) && (typeValue !== "None")) {
        // console.log(sourceValue);

        // const notHidden = document.querySelectorAll(":not(hide)");
        // exclude elements that are already hidden

        const typeSelected = document.querySelectorAll(`.${typeValue}`);
        // console.log(typeSelected);

        const sourceSelected = document.querySelectorAll(`img[data-source="${sourceValue}"]`);
        // console.log(sourceSelected);

        //[...typeSelected] take typeSelected and interpret it as an array
        const combinedSelected = [...typeSelected].filter(v => [...sourceSelected].indexOf(v) > -1);
        console.log(combinedSelected);
        //check the type selector and exclude those that are not selected

        hideImgs(allImgs);
        showImgs(combinedSelected);
    } else {
        const sourceSelected = document.querySelectorAll(`img[data-source="${sourceValue}"]`);

        hideImgs(allImgs);
        showImgs(sourceSelected);
    }
});

// console.log(sourceSelector);

const scrollContainer = document.querySelector(".scrollContainer");
const scrollLeft = document.getElementById("scrollLeft");
const scrollRight = document.getElementById("scrollRight");

// Scroll left
scrollLeft.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -730, behavior: "smooth" }); // Adjust scroll amount
});

// Scroll right
scrollRight.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 730, behavior: "smooth" }); // Adjust scroll amount
});

const descriptionDiv = document.getElementById("descriptionDiv");

const inputDescription = document.getElementById("inputDescription");

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", function () {
        // Remove only images from descriptionDiv (but not from the document)
        descriptionDiv.querySelectorAll("img").forEach(img => img.remove());

        // Show descriptionDiv
        descriptionDiv.style.display = "flex";

        // Clone the clicked image instead of moving it
        const clonedImg = this.cloneNode(true);

        if (window.innerWidth < 500) {
            clonedImg.style.width = "65vw";
        } else {
            clonedImg.style.width = "28vw";
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 500) {
                clonedImg.style.width = "65vw";
            } else {
                clonedImg.style.width = "28vw";
            }
        });

        // clonedImg.style.width = "28vw";

        // Append the cloned image inside descriptionDiv
        descriptionDiv.appendChild(clonedImg);

        let imgNum = img.getAttribute("id").split("e")[1]; //only get the number after "image"

        inputDescription.innerHTML = `Your Own Description: <br> ${getCookie(imgNum)}`;
    });
});

document.getElementById("closeImgDescription").addEventListener("click", function () {
    document.getElementById("descriptionDiv").style.display = "none";
});

function screenChange() {
    if (window.innerWidth < 500) {
        document.querySelector("#about").innerHTML = "P";
    } else {
        document.querySelector("#about").innerHTML = "PERCEPTION";
    }
}

window.addEventListener('resize', () => {
    screenChange();
});

screenChange();
