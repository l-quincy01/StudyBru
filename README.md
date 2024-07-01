## Quiz

Simple quiz game mobile App

## Screenshots

<div style="display:flex;" >
<img src="/screenshots/1.PNG" width="20%" >
<img src="/screenshots/2.PNG" width="20%" >
<img src="/screenshots/3.PNG" width="20%" >
<img src="/screenshots/4.PNG" width="20%" >
<img src="/screenshots/5.PNG" width="20%" >
<img src="/screenshots/6.PNG" width="20%" >
<img src="/screenshots/6.PNG" width="20%" >
<img src="/screenshots/7.PNG" width="20%" >

</div>

const generateQuiz = async () => {
console.log("Generating quiz with notes:", notes);
const response = await fetch("http://localhost:3000/generate-quiz", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ notes }),
});
const data = await response.json();
setQuiz(data.questions);
console.log("Received quiz questions:", data.questions);
};
