let aboutText = document.getElementById("About");

            var textToType = aboutText.innerText;

            console.log(textToType);

            var typewriter = new Typewriter(aboutText, {
                delay: 50,
            });

            typewriter
                .typeString(textToType) // Get text content inside the element
                .start();