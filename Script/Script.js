import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log("cookies at the start:", document.cookie);//track cookie

// Importing D3.js and Loading CSV Data
const data = await d3.csv("Script/imageData.csv");
console.log(data[0].path);

let randomNum;

let button = document.querySelector("#userInputButton");
button.onclick = function () {
    let text = document.querySelector("#userInput");//replace spaces with %20
    text = encodeURI(text.value);
    console.log(text.value);
    document.cookie = `comment${randomNum} = ${text}`;
    alert(document.cookie);
}

function showCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);//removes the percent signs
    let cookies = decodedCookie.split('; ');
    console.log(cookies);
    let commentCookie = cookies.find(row => row.startsWith(`comment${randomNum}=`));
    console.log(commentCookie);
    if (commentCookie) {
        let commentValue = commentCookie.split("=")[1];
        document.querySelector("#cookieTester").innerText = "Stored Comment: " + decodeURIComponent(commentValue);
    }
}

//Picking a Random Image from the CSV
function getRandomObject() {
    // randomNum = Math.floor(Math.random() * 40);
    randomNum = 9;
    let path = data[randomNum].path;
    let altText = data[randomNum].altText;
    let type = data[randomNum].type;
    let source = data[randomNum].source;
    let functionBot = data[randomNum].functionBot;
    let sensationBot = data[randomNum].sensationBot;
    let rationaleBot = data[randomNum].rationaleBot;
    let associationBot = data[randomNum].associationBot;
    let feelingBot = data[randomNum].feelingBot;
    console.log(path);
    return { path, altText, type, source, functionBot, sensationBot, rationaleBot, associationBot, feelingBot };
}

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
    randomAltText.innerHTML = "Original Alt-text";
    randomType.innerHTML = "Image Type";
    randomSource.innerHTML = "On-line Source";


    document.getElementById("botNarrator").src = "/images/functionGIF.gif";

    // Store bot narrations using data-attributes(Get text in the speech bubble)
    let botsDropdown = document.getElementById("bots");
    botsDropdown.setAttribute("data-f", imgVariables.functionBot);
    botsDropdown.setAttribute("data-s", imgVariables.sensationBot);
    botsDropdown.setAttribute("data-r", imgVariables.rationaleBot);
    botsDropdown.setAttribute("data-a", imgVariables.associationBot);
    botsDropdown.setAttribute("data-fe", imgVariables.feelingBot);


    // 🔥 Delay the function call to ensure attributes are set first
    setTimeout(() => {
        botsToImg();
        botsDropdown.dispatchEvent(new Event("change"));
    }, 100);
    // botsToImg(imgVariables);
}

document.getElementById("randomAltText").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "Original Alt-text") ? this.getAttribute("data-alt") : "Original Alt-text";
});

document.getElementById("randomType").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "Image Type") ? this.getAttribute("data-type") : "Image Type";
});

document.getElementById("randomSource").addEventListener("click", function () {
    this.innerHTML = (this.innerHTML === "On-line Source") ? this.getAttribute("data-source") : "On-line Source";
});

//Handling Bot Responses Based on Dropdown Selection
function botsToImg() {
    // Get the dropdown and the element to pop out
    const bots = document.getElementById("bots");
    const functionN = document.getElementById("functionN");
    const sensationN = document.getElementById("sensationN");
    const rationaleN = document.getElementById("rationaleN");
    const associationN = document.getElementById("associationN");
    const feelingN = document.getElementById("feelingN");

    const narrations = {
        f: functionN,
        s: sensationN,
        r: rationaleN,
        a: associationN,
        fe: feelingN
    };

    // Ensures that no previous bot narration is visible before a new one is selected.
    // Prevents old text from staying on screen when switching between dropdown options.
    // Resets the text before setting a new narration.
    function updateNarration() {
        console.log("Dropdown changed to:", bots.value);

        Object.values(narrations).forEach(el => {
            el.style.display = "none";
            el.innerHTML = "";
        });


        console.log([bots.value]);

        //bots.value:f/s/r/a/fe
        const selectedNarration = narrations[bots.value];
        if (selectedNarration) {
            const botText = bots.getAttribute(`data-${bots.value}`);
            //check if bot text is received
            console.log("Checking data-* attributes:", {
                function: bots.getAttribute("data-f"),
                sensation: bots.getAttribute("data-s"),
                rationale: bots.getAttribute("data-r"),
                association: bots.getAttribute("data-a"),
                feeling: bots.getAttribute("data-fe"),
            });

            console.log("Bot text for selected option:", botText);

            selectedNarration.style.display = "block";
            selectedNarration.innerHTML = botText;

            var textToType = selectedNarration.innerText;

            console.log(textToType);

            var typewriter = new Typewriter(selectedNarration, {
                delay: 60,
            });

            typewriter
                .typeString(textToType) // Get text content inside the element
                .start();
        }

        let narrator = document.getElementById("botNarrator");

        //bot GIF changes correspondingly
        const imagePath = {
            f: "/images/functionGIF.gif",
            s: "/images/sensationGIF.gif",
            r: "/images/rationaleGIF.gif",
            a: "/images/associationGIF.gif",
            fe: "/images/feelingGIF.gif"
        };

        const selectedPath = imagePath[bots.value];
        narrator.src = selectedPath;
    }

    //Ensures the correct bot text appears for the selected dropdown option immediately.
    bots.addEventListener("change", updateNarration);
    updateNarration();
}

//Auto-Switch Image on Load
switchImg();

showCookie();

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
