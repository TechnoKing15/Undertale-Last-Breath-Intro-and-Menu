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
    "The skeleton saw.\nThe skeleton reeled in dread.",
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

function createAudioInstance() {
    const audio = new Audio('resources/undertale.flavor.text.sfx.mp3');
    audio.volume = 0.5; // Adjust volume as needed
    return audio;
}

const audioPool = Array(5).fill(null).map(createAudioInstance);
let currentAudioIndex = 0;

function playSound() {
    const audio = audioPool[currentAudioIndex];
    audio.currentTime = 0;
    audio.play().catch(error => console.error('Error playing sound:', error));
    currentAudioIndex = (currentAudioIndex + 1) % audioPool.length;
}

function typeText() {
    if (charIndex < texts[textIndex].length) {
        const char = texts[textIndex][charIndex];
        if (char === '\n') {
            container.innerHTML += '<br>';
            charIndex++;
            setTimeout(typeText, 65);
        } else {
            let textColor = 'white';
            if (textIndex === 25 || textIndex === 26) {
                textColor = 'red';
            }
            container.innerHTML += `<span style="color: ${textColor}">${char}</span>`;
            playSound();
            charIndex++;
            container.scrollTop = container.scrollHeight;
            setTimeout(typeText, 65);
        }
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
    } else {
        fadeOutText();
    }
}

function updateImage() {
    if (images[textIndex]) {
        imageElement.src = images[textIndex];
        imageElement.style.display = 'block';
        imageContainer.style.opacity = '1';
        
        // Play sound when gif appears
        if (images[textIndex] === 'resources/intro.gif.gif') {
            gifSound.play();
        }
    } else {
        imageElement.style.display = 'none';
        imageContainer.style.opacity = '0';
    }
}

function handleImageError() {
    console.error('Failed to load image:', imageElement.src);
    imageContainer.style.opacity = '0';
}

imageElement.addEventListener('error', handleImageError);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    
    const menu = document.getElementById('menu');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.querySelector('#backgroundMusic');
    const startText = document.getElementById('start-text');
    const selectSound = new Audio('resources/ut.select.sound.mp3');
    backgroundMusic.volume = 0.3;

    startButton.addEventListener('click', function() {
        const menu = document.getElementById('menu');
        const elementsToHide = [
            document.getElementById('image-container'),
            document.getElementById('text-container'),
            document.getElementById('title-image'),
            document.getElementById('start-text'),
            document.getElementById('start-button'),
            document.getElementById('credits-button'),
            document.getElementById('settings-button')
        ];
        
        elementsToHide.forEach(element => {
            if (element) {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
            }
        });
        
        menu.style.display = 'flex';
        menu.offsetHeight;
        menu.classList.add('visible');
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        const menuGradient = document.getElementById('menu-gradient');
        menuGradient.style.opacity = '1';
    });

    let gameStarted = false;

    document.addEventListener('keydown', function(event) {
        if ((event.key === 'z' || event.key === 'Z' || event.key === 'Enter') && !gameStarted) {
            gameStarted = true;
            selectSound.play();
            const startText = document.getElementById('start-text');
            startText.style.color = '#f0fc04';
            startText.style.animation = 'blink 0.1s 6 step-end';
            setTimeout(() => {
                startText.style.display = 'none';
                backgroundMusic.play();
                setTimeout(() => {
                    updateImage();
                    typeText();
                }, 6000);
            }, 600);
        } else if (event.key === 'c' || event.key === 'C') {
            skipIntro();
        }
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
            showTitleImage();
        }
    }, 100);
}

function showTitleImage() {
    const titleImage = document.getElementById('title-image');
    const startButton = document.getElementById('start-button');
    const titleAppearSound = document.getElementById('titleAppearSound');
    const menuMusic = document.getElementById('menuMusic');
    const creditsButton = document.getElementById('credits-button');
    const settingsButton = document.getElementById('settings-button');
    const cursor = document.getElementById('custom-cursor');
    
    if (titleImage.style.opacity !== '1') {
        titleImage.style.display = 'block';
        titleImage.style.top = '50%';
        titleImage.style.transform = 'translate(-50%, -50%)';
        titleImage.style.opacity = '1';
        
        if (window.innerWidth < 1920 || window.innerHeight < 1080) {
            titleImage.style.transform = 'translate(-50%, -50%) scale(0.6)';
        }
        
        titleAppearSound.play();

        setTimeout(() => {
            menuMusic.play();
            const menuGradient = document.getElementById('menu-gradient');
            menuGradient.style.opacity = '1';
            createFloatingCircles();
            titleImage.style.top = '10%';
            titleImage.style.transform = window.innerWidth < 1920 || window.innerHeight < 1080 
                ? 'translate(-50%, 0) scale(0.6)'
                : 'translate(-50%, 0)';
            
            // Setup buttons immediately
            cursor.style.display = 'block';
            
            [startButton, creditsButton, settingsButton].forEach(button => {
                button.style.display = 'flex';
                button.style.visibility = 'visible';
                button.style.position = 'absolute';
            });
            
            document.body.classList.add('custom-cursor');
            
            // Animate everything together
            setTimeout(() => {
                cursor.style.opacity = '1';
                
                [startButton, creditsButton, settingsButton].forEach(button => {
                    button.style.left = '50%';
                    button.style.opacity = '1';
                });
                
                if (window.innerWidth >= 1920 && window.innerHeight >= 1080) {
                    startButton.style.top = '49%';
                    startButton.style.fontSize = '68px';
                    startButton.style.padding = '25px 60px';
                    
                    creditsButton.style.fontSize = '68px';
                    creditsButton.style.padding = '5px 30px';
                    creditsButton.style.top = 'calc(49% + 160px)';
                    
                    settingsButton.style.fontSize = '68px';
                    settingsButton.style.padding = '5px 30px';
                    settingsButton.style.top = 'calc(49% + 480px)';
                } else {
                    startButton.style.top = '50%';
                    creditsButton.style.top = 'calc(49% + 120px)';
                    settingsButton.style.top = 'calc(49% + 360px)';
                }
            }, 1000);
        }, 4000);
    }
}

function skipIntro() {
    textIndex = texts.length - 1;
    charIndex = texts[textIndex].length;
    container.innerHTML = `<span style="color: red">${texts[textIndex]}</span>`;
    updateImage();
    const backgroundMusic = document.querySelector('#backgroundMusic');
    backgroundMusic.currentTime = backgroundMusic.duration - 1;
    fadeOutText();
}

function fadeOutText() {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            container.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
            container.style.display = 'none';
            setTimeout(() => {
                fadeOutGif();
            }, 8000);
        }
    }, 100);
}

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 16) + 'px';
        cursor.style.top = (e.clientY - 16) + 'px';
    });
}

function isCustomCursorOverButton(cursorX, cursorY, buttonId) {
    const button = document.getElementById(buttonId);
    const rect = button.getBoundingClientRect();
    const buffer = 12;
    
    return cursorX >= rect.left - buffer &&
           cursorX <= rect.right + buffer &&
           cursorY >= rect.top - buffer &&
           cursorY <= rect.bottom + buffer;
}

const hoverSound = new Audio('resources/sound.hover.mp3');
let isPlayingSound = false;

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    const startButton = document.getElementById('start-button');
    const creditsButton = document.getElementById('credits-button');
    const settingsButton = document.getElementById('settings-button');
    
    cursor.style.left = (e.clientX - 16) + 'px';
    cursor.style.top = (e.clientY - 16) + 'px';
    
    const startWasHovering = startButton.classList.contains('custom-hover');
    const creditsWasHovering = creditsButton.classList.contains('custom-hover');
    const settingsWasHovering = settingsButton.classList.contains('custom-hover');
    
    const startIsHovering = isCustomCursorOverButton(e.clientX, e.clientY, 'start-button');
    const creditsIsHovering = isCustomCursorOverButton(e.clientX, e.clientY, 'credits-button');
    const settingsIsHovering = isCustomCursorOverButton(e.clientX, e.clientY, 'settings-button');
    
    if ((startIsHovering && !startWasHovering || 
         creditsIsHovering && !creditsWasHovering || 
         settingsIsHovering && !settingsWasHovering) && !isPlayingSound) {
        if (startIsHovering) startButton.classList.add('custom-hover');
        if (creditsIsHovering) creditsButton.classList.add('custom-hover');
        if (settingsIsHovering) settingsButton.classList.add('custom-hover');
        isPlayingSound = true;
        hoverSound.currentTime = 0;
        hoverSound.play();
        hoverSound.addEventListener('ended', () => {
            isPlayingSound = false;
        }, { once: true });
    } else if (!startIsHovering && startWasHovering) {
        startButton.classList.remove('custom-hover');
        isPlayingSound = false;
    } else if (!creditsIsHovering && creditsWasHovering) {
        creditsButton.classList.remove('custom-hover');
        isPlayingSound = false;
    } else if (!settingsIsHovering && settingsWasHovering) {
        settingsButton.classList.remove('custom-hover');
        isPlayingSound = false;
    }
});

const gifSound = new Audio('resources/sound.noise.mp3');

function createFloatingCircles() {
    const container = document.getElementById('floating-circles');
    const createCircle = () => {
        const circle = document.createElement('div');
        circle.className = 'floating-circle';
        circle.style.left = Math.random() * 100 + '%';
        circle.style.animationDelay = Math.random() * 8 + 's';
        circle.style.width = (Math.random() * 50 + 50) + 'px';
        circle.style.height = circle.style.width;
        
        container.appendChild(circle);
        
        circle.addEventListener('animationend', (e) => {
            if (e.animationName === 'float') {
                circle.remove();
            }
        });
    };

    // Create initial circles
    for (let i = 0; i < 20; i++) {
        createCircle();
    }

    // Keep creating new circles
    setInterval(createCircle, 650);
}