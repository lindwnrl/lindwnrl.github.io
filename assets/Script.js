const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
        });
    });
}

const portraitCard = document.querySelector('.portrait-card');
if (portraitCard) {
    portraitCard.addEventListener('click', () => {
        portraitCard.classList.toggle('is-revealed');
    });
}

const identityOutput = document.querySelector('#identity-output');
const identityButtons = document.querySelectorAll('.identity-btn');
const identityDescriptions = [
    "Currently learning Spansih while mastering English and recalling Arabic.",
    "As a software developer, i design, develop, and experiment with software to turn ideas into functional solutions.",
    "This gentleman has a keen interest in Cyber Security, explore vulnerabilities, and learn how to build more secure systems.",
    "Also a linux larp.However he did this not because he hate Windows",
    "As it written in the option, I have a broad curiosity across technology, constantly learning new skills and exploring different fields.",
    "C'mon dude.I don't have to convince you do i?"
];
let identityTypingTimer;

function typeIdentity(text) {
    if (!identityOutput) return;
    clearInterval(identityTypingTimer);
    identityOutput.textContent = '';

    let index = 0;
    identityTypingTimer = setInterval(() => {
        identityOutput.textContent += text[index];
        index += 1;

        if (index >= text.length) {
            clearInterval(identityTypingTimer);
        }
    }, 35);
}

identityButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const index = Number(button.dataset.identity);
        identityButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        typeIdentity(identityDescriptions[index]);
    });
});
typeIdentity(identityDescriptions[0]);

const typingElement = document.querySelector('#typing');
const roles = ['Software Developer', 'Cybersecurity Learner', 'Linux Explorer', 'Larp of All Trades'];
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingElement) return;
    const role = roles[roleIndex];
    typingElement.textContent = deleting ? role.slice(0, characterIndex - 1) : role.slice(0, characterIndex + 1);
    characterIndex += deleting ? -1 : 1;

    if (!deleting && characterIndex === role.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
        return;
    }
    if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeRole, deleting ? 45 : 80);
}

typeRole();

// INTRO ANIMATION

const introScreen = document.querySelector('#introScreen');
const introTyping = document.querySelector('#introTyping');

if (introScreen && introTyping) {

    document.body.classList.add('intro-active');

    const introText = "Hello";
    let introIndex = 0;

    function typeIntro() {

        if (introIndex < introText.length) {

            introTyping.textContent += introText[introIndex];

            introIndex++;

            setTimeout(typeIntro, 300);

        } else {

            // Wait before fading out
            setTimeout(() => {

                introScreen.classList.add('is-hidden');

                // Remove intro after fade animation
                setTimeout(() => {
                    introScreen.remove();
                    document.body.classList.remove('intro-active');
                }, 900);

            }, 1000);
        }
    }

    typeIntro();
}