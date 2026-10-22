const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    if (Object.keys(morseJS).length === 0) {
      reject("The Morse dictionary is empty.");
    } else {
      resolve(morseJS);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const text = prompt("Enter a word or sentence to translate into Morse code:");
    if (text === null) {
      reject("Translation cancelled.");
      return;
    }

    const translation = [];
    for (const character of text.toLowerCase()) {
      if (!Object.prototype.hasOwnProperty.call(morseJS, character)) {
        reject(`Unsupported character: "${character}"`);
        return;
      }
      translation.push(morseJS[character]);
    }
    resolve(translation);
  });
}

function joinWords(morseTranslation) {
  document.getElementById("morse-output").textContent = morseTranslation.join("\n");
}

toJs()
  .then(morseJS => toMorse(morseJS))
  .then(morseTranslation => joinWords(morseTranslation))
  .catch(error => {
    document.getElementById("morse-output").textContent = String(error);
    console.error(error);
  });
