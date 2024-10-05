const texts = [
    "Mt. Ebott, 201X\nA human climbed the mountain and fell into the land of the monsters.",
    "To the monsters' terror, the human began slaughtering any being that dared cross its path.",
    "No matter the effort took to end the madness...",
    "It always ended with futility.",
    "Harnessing DETERMINATION, the human would always triumph over even the most powerful monsters.",
    "However...",
    "Someone was watching from afar.",
    "Massacres came and went... Until...",
    "Various Genocides routes later...",
    "Finally they stumbled upon a mysterious door, never before seen.",
    "Curiosity struck them and they turned the doorknob.",
    "A strange figure stood in the center of the room, broken and motionless.",
    "Any sort of attempt to interact with it garnered no response.",
    "Suddenly, it left.",
    "The human fell unconscious.",
    "The invisible figure quickly started towards a little snowy town.",
    "There, it found a skeleton named Sans.",
    "To the figure's fortuity, it found the skeleton had great knowledge of many things.",
    "Seeing him as a valuable tool, it spoke to him frequently through his fantasies.",
    "It talked about many things...",
    "These many things included everything that the human had done.",
    "The massacres, the mayhem, and the plight.",
    "Of course, the skeleton's belief wavered tremendously.",
    "That was until the figure spilled not words, but experiences.",
    "The skeleton saw. The skeleton reeled in dread.",
    "He knew he couldn't let this issue fester.",
    "He swore to his last breath that he'd be pulling out all the stops."
];
const images = [
    "resources/intro.image.1.png",
    "resources/intro.image.2.png",
    "resources/intro.image.2.png",
    "resources/intro.image.2.png",
    "resources/intro.image.2.png",
    null,
    "resources/intro.image.3.png",
    "resources/intro.image.3.png",
    null,
    "resources/intro.image.4.png",
    "resources/intro.image.5.png",
    "resources/intro.image.6.png",
    "resources/intro.image.6.png",
    "resources/intro.image.7.png",
    null,
    null,
    "resources/intro.image.8.png",
    "resources/intro.image.8.png",
    "resources/intro.image.8.png",
    "resources/intro.image.9.png",
    "resources/intro.image.9.png",
    "resources/intro.image.9.png",
    "resources/intro.image.9.png",
    "resources/intro.image.9.png",
    "resources/intro.image.10.png",
    "resources/intro.image.10.png",
    "resources/intro.gif.gif"
];
const container = document.getElementById('text-container');
const imageContainer = document.getElementById('image-container');
const imageElement = document.getElementById('current-image');
let textIndex = 0;
let charIndex = 0;

const typeSfx = document.querySelector('#typeSfx');

let audioContext, audioBuffer;

async function loadAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch('resources/undertale.flavor.text.sfx.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playSound() {
    if (audioContext && audioBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
}

function typeText() {
    console.log('Typing text:', texts[textIndex]);
    if (charIndex < texts[textIndex].length) {
        const char = texts[textIndex][charIndex];
        if (char === '\n') {
            container.innerHTML += '<br>';
        } else {
            let textColor = 'white';
            if (textIndex === 25 || textIndex === 26) {
                textColor = 'red';
            }
            container.innerHTML += `<span style="color: ${textColor}">${char}</span>`;
            playSound();
            const lines = container.innerHTML.split('<br>');
            const lastLine = lines[lines.length - 1];
            const tempElement = document.createElement('span');
            tempElement.style.visibility = 'hidden';
            tempElement.style.whiteSpace = 'nowrap';
            tempElement.innerHTML = lastLine;
            document.body.appendChild(tempElement);
            if (tempElement.offsetWidth > 1240) {
                lines[lines.length - 1] = lastLine.slice(0, -1);
                lines.push(char);
                container.innerHTML = lines.join('<br>');
            }
            document.body.removeChild(tempElement);
        }
        charIndex++;
        setTimeout(typeText, 65);
    } else {
        setTimeout(nextPhase, 2000);
    }
}

function nextPhase() {
    textIndex++;
    charIndex = 0;
    container.innerHTML = '';
    if (textIndex < texts.length) {
        updateImage();
        typeText();
    }
}

function updateImage() {
    if (images[textIndex]) {
        imageElement.src = images[textIndex];
        imageContainer.style.opacity = '1';
    } else {
        imageContainer.style.opacity = '0';
    }
}

function handleImageError() {
    console.error('Failed to load image:', imageElement.src);
    imageContainer.style.opacity = '0';
}

imageElement.addEventListener('error', handleImageError);

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const typeSfx = document.querySelector('#typeSfx');
    const backgroundMusic = document.querySelector('#backgroundMusic');
    backgroundMusic.volume = 0.5; // Sets volume to 50%

    loadAudio().catch(error => {
        console.error('Error loading audio:', error);
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'z' || event.key === 'Z') {
            if (textIndex === 0 && charIndex === 0) {
                backgroundMusic.play();
                updateImage();
                typeText();
            }
        }
    });

    backgroundMusic.addEventListener('ended', () => {
        fadeOutGif();
    });
});

function fadeOutGif() {
    const gif = document.getElementById('current-image');
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            gif.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
            gif.style.display = 'none';
        }
    }, 100);
}