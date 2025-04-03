let aboutText = document.getElementById("About");

var textToType = aboutText.innerHTML;

console.log(textToType);

var typewriter = new Typewriter(aboutText, {
    delay: 65,
});

typewriter
    .typeString(textToType) // Get text content inside the element
    .start();

aboutText.addEventListener("click", handleClick);

function handleClick() {
    typewriter.stop();
    aboutText.innerHTML = textToType;
}
