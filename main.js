const words = ["Student.", "IT Technician.", "Effective Organizer.", "Coffee Enthusiast."];
const typingElement = document.getElementById('typing');
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false; // Zmienna kontrolująca, czy kasujemy tekst
const waitTime = 2000; // Czas na wyświetlenie pełnego słowa (ms)
const resetDelay = 500; // Czas przed zaczęciem następnego słowa (ms)

function typeWord() {
    if (!isDeleting) {
        // Inicjalizujemy tekst na pusty przed rozpoczęciem pisania
        if (letterIndex === 0) {
            typingElement.textContent = ""; // Zapewnia, że tekst na początku jest pusty
            if (wordIndex === 0 || wordIndex === 3) {
                document.getElementById("przedrostek").innerHTML = "a";
            } else{
                document.getElementById("przedrostek").innerHTML = "an";
            }
        }

        // Pisanie
        typingElement.textContent += words[wordIndex].charAt(letterIndex);
        letterIndex++;

        if (letterIndex <= words[wordIndex].length) {
            setTimeout(typeWord, Math.floor(Math.random() * 50)+110);
        } else {
            // Czekaj przed usuwaniem tekstu
            setTimeout(() => {
                isDeleting = true;
                setTimeout(typeWord, resetDelay); // Zrób przerwę przed kasowaniem
            }, waitTime);
        }
    } else {
        // Kasowanie
        typingElement.textContent = words[wordIndex].slice(0, letterIndex);
        letterIndex--;

        if (letterIndex >= 0) {
            setTimeout(typeWord, Math.floor(Math.random() * 50)+60);
        } else {
            // Po kasowaniu, zmień słowo
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Zmiana słowa
            setTimeout(typeWord, resetDelay); // Przerwa przed pisaniem
        }
    }
}

typeWord(); // Rozpoczynamy animację