let speech  = new SpeechSynthesisUtterance();
let voice =[]

let selectVoice = document.querySelector('#sl');

window.speechSynthesis.onvoiceschanged = () => {
voice = window.speechSynthesis.getVoices();
speech.voice = voice[0]

voice.forEach((voice,i) =>(selectVoice.options[i]=new Option(voice.name,i)))
}

document.querySelector("button").addEventListener("click",()=>
{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech)
})
