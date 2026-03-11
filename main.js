const translations = {
    pl: {
        metaTitle: "Portfolio MZ",
        introHeadline: "Cześć, mam na imię <span>Michał</span>",
        introRolePrefix: "Jestem",
        introDescription: "Jestem absolwentem Informatyki Stosowanej na AGH, z doświadczeniem w IT i gastronomii. Szukam możliwości rozwoju w branży IT oraz w sektorze edukacyjnym, gdzie mogę wykorzystać wiedzę, umiejętności komunikacyjne i chęć ciągłej nauki.",
        scrollAria: "Przewiń do sekcji projektów",
        scrollDown: "Przewiń w dół",
        projectsTitle: "PROJEKTY",
        project1: "Praca inżynierska (PL)",
        project2: "Wprowadzenie do Atlassian (PL)",
        project3: "Automatyzacja Atlassian dla skalowalnych projektów (PL)",
        project4: "Analiza wpływu poziomu edukacji w Polsce na różne sektory społeczno-ekonomiczne",
        project5: "Projekt UX/UI <br>Easy Nanny",
        project6: "Biznesplan kawiarni (PL)",
        footerText: "Stworzone przez: Michał Zychowicz",
        typingWords: ["inżynierem informatyki.", "technikiem informatykiem.", "entuzjastą Agile/Scrum.", "miłośnikiem kawy."],
    },
    en: {
        metaTitle: "Portfolio MZ",
        introHeadline: "Hello, my name is <span>Michał</span>",
        introRolePrefix: "I'm",
        introDescription: "I am an Applied Computer Science graduate from AGH, with experience in IT and gastronomy, seeking opportunities to grow in the IT industry and in the education sector, where I can apply my knowledge, communication skills, and eagerness to learn.",
        scrollAria: "Scroll to projects section",
        scrollDown: "Scroll down",
        projectsTitle: "PROJECTS",
        project1: "Engineering Thesis (PL)",
        project2: "Introduction to Atlassian (PL)",
        project3: "Atlassian Automation for Scalable Projects (PL)",
        project4: "Analyzing the Impact of Education Levels in Poland on Various Socioeconomic Sectors",
        project5: "UX/UI Project <br>Easy Nanny",
        project6: "Coffee Shop Business Plan (PL)",
        footerText: "Created by: Michał Zychowicz",
        typingWords: ["IT Engineer.", "IT Technician.", "Agile/Scrum Enthusiast.", "Coffee Enthusiast."],
    },
};

const typingElement = document.getElementById("typing");
const prefixElement = document.getElementById("przedrostek");
const langToggle = document.getElementById("lang-toggle");

let currentLang = localStorage.getItem("lang") === "en" ? "en" : "pl";
let words = translations[currentLang].typingWords;
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const waitTime = 2000;
const resetDelay = 500;

function applyPolishNonBreakingSpaces(text) {
    return text.replace(/(^|[\s>])([AaIiOoUuWwZz])\s+/g, "$1$2\u00A0");
}

function formatTextForLanguage(text, lang) {
    if (lang !== "pl") {
        return text;
    }
    return applyPolishNonBreakingSpaces(text);
}

function getEnglishPrefix(word) {
    const startsWithVowel = /^[aeiou]/i.test(word);
    return startsWithVowel ? "an " : "a ";
}

function setPrefix() {
    if (currentLang === "en") {
        prefixElement.textContent = getEnglishPrefix(words[wordIndex]);
        return;
    }

    prefixElement.textContent = "";
}

function applyTranslations(lang) {
    const langPack = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const value = langPack[key];

        if (typeof value !== "string") {
            return;
        }

        const formattedValue = formatTextForLanguage(value, lang);

        if (value.includes("<")) {
            element.innerHTML = formattedValue;
            return;
        }

        element.textContent = formattedValue;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        const mappings = element.dataset.i18nAttr.split(";");

        mappings.forEach((mapping) => {
            const [attr, key] = mapping.split(":").map((part) => part.trim());
            if (!attr || !key || !langPack[key]) {
                return;
            }
            element.setAttribute(attr, formatTextForLanguage(langPack[key], lang));
        });
    });

    document.title = langPack.metaTitle;
    document.documentElement.lang = lang;
    if (langToggle) {
        const isPolish = lang === "pl";
        langToggle.textContent = isPolish ? "🇬🇧" : "🇵🇱";
        langToggle.setAttribute("aria-label", isPolish ? "Przełącz na angielski" : "Switch to Polish");
    }

    words = langPack.typingWords;
    wordIndex = 0;
    letterIndex = 0;
    isDeleting = false;
    typingElement.textContent = "";
    setPrefix();
}

function typeWord() {
    if (!isDeleting) {
        if (letterIndex === 0) {
            typingElement.textContent = "";
            setPrefix();
        }

        typingElement.textContent += words[wordIndex].charAt(letterIndex);
        letterIndex++;

        if (letterIndex <= words[wordIndex].length) {
            setTimeout(typeWord, Math.floor(Math.random() * 50) + 110);
        } else {
            setTimeout(() => {
                isDeleting = true;
                setTimeout(typeWord, resetDelay);
            }, waitTime);
        }
    } else {
        typingElement.textContent = words[wordIndex].slice(0, letterIndex);
        letterIndex--;

        if (letterIndex >= 0) {
            setTimeout(typeWord, Math.floor(Math.random() * 50) + 60);
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWord, resetDelay);
        }
    }
}

if (langToggle) {
    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "pl" ? "en" : "pl";
        localStorage.setItem("lang", currentLang);
        applyTranslations(currentLang);
    });
}

applyTranslations(currentLang);
typeWord();

const scrollIndicator = document.querySelector(".scroll-indicator");
const projectsSection = document.getElementById("projects");

if (scrollIndicator && projectsSection) {
    scrollIndicator.addEventListener("click", (event) => {
        event.preventDefault();
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}
