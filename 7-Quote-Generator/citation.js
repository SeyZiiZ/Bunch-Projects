import { citations } from "./citation2.js";
import { background } from "./citation2.js";

const container = document.querySelector("#citation-container");
const quoteBtn = document.querySelector("#button");

var i = 0;

const getCitation = () => {

    i <= 8 ? i++ : i = 0;

    container.innerHTML = 
    `
    <h2>${citations[i].text}</h2>
    <p>- ${citations[i].author}</p>
    `;

    console.log(i);

    const color = background[i - 1].backgroundColor;
    document.body.style.backgroundColor = color;
}

quoteBtn.addEventListener("click", getCitation);

container.innerHTML = 
    `
        <h2>${citations[0].text}</h2>
        <p>- ${citations[0].author}</p>
    `;

