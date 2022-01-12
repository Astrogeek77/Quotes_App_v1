const quoteText = document.querySelector(".quote-text"),
  quoteBtn = document.querySelector(".btn"),
  // authorName = document.querySelector(".name"),
  // tags = document.querySelector(".tag"),
  animeName = document.querySelector(".anime"),
  characterName = document.querySelector(".character");
(speechBtn = document.querySelector(".speech")),
  (copyBtn = document.querySelector(".copy")),
  (twitterBtn = document.querySelector(".twitter")),
  (synth = speechSynthesis);

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("https://animechan.vercel.app/api/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.quote;
      // tags.innerText = result.tags[0].toUpperCase();
      // authorName.innerText = result.author;
      animeName.innerText = result.anime;
      animeName.title = result.anime;
      characterName.innerText = result.character;
      characterName.title = result.character;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${characterName.innerText} from ${animeName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

randomQuote();
