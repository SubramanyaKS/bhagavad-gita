export const speak = (
  text: string,
  lang: string,
  rate = 1,
  pitch = 1
) => {
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = lang;
  speech.rate = rate;
  speech.pitch = pitch;

  const voices = window.speechSynthesis.getVoices();

voices.forEach((voice) => {
  console.log(voice.name, voice.lang);
});

  window.speechSynthesis.speak(speech);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};