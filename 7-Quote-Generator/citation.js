import { citations } from "./citation2.js";
const container = document.querySelector("#citation-container");
const quoteBtn = document.querySelector("#button");

var i = 0;

const getCitation = () => {

    i <= citations.length - 2 ? i++ : i = 0;

    container.innerHTML = 
    `
    <h2>" ${citations[i].text} "</h2>
    <p>- ${citations[i].author}</p>
    `;

    console.log(i);

    let j = i === 0 ? 0 : i;
    const color = citations[j].backgroundColor;
    document.body.style.backgroundColor = color;
}

quoteBtn.addEventListener("click", getCitation);

container.innerHTML = 
    `
        <h2>" ${citations[0].text} "</h2>
        <p>- ${citations[0].author}</p>
    `;
document.body.style.backgroundColor = '#77B1A9';
