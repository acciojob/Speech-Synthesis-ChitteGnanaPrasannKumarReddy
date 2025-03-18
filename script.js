// Your script here.

const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('textarea');


function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}


function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}


function setOption() {
  msg[this.name] = this.value;
}


function speak() {
  if (!textArea.value.trim()) return; 
  msg.text = textArea.value;
  speechSynthesis.cancel(); 
  speechSynthesis.speak(msg);
}


function stop() {
  speechSynthesis.cancel();
}


speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);


populateVoices();
