document.addEventListener("DOMContentLoaded", function () {

    const inputNumber = document.getElementById("text-input");
    const checkBtn = document.getElementById('button-check');
    const h1 = document.getElementById("h1-top");
    const chanceNumberSpan = document.getElementById("chanceNumber");
    const restartBtn = document.getElementById("restart-btn");

    let chanceNumber = 5;
    const computerNumber = randomNumber();
    chanceNumberSpan.innerHTML = `You have ${chanceNumber} chances !`;

    checkBtn.addEventListener('click', () => {
        checkResponse();
        chanceNumberSpan.innerHTML = `You have ${chanceNumber} chances left !`;
    })

    function checkResponse () {
        let inputValue = inputNumber.value;
        let parsedNumber = parseInt(inputValue);

        if (inputValue !== '' && !isNaN(parsedNumber)) {
            if (parsedNumber === computerNumber) {
                win(inputNumber, checkBtn);
                h1.innerText = `You found the right number !`
                const p = document.querySelector('.p-container');
                p.style.display = 'none';
                chanceNumberSpan.style.display = 'none';
                restartBtn.classList.toggle('hidden');
                restartBtn.addEventListener('click', () => {
                    location.reload();
                });
            } else {
                console.log(chanceNumber--);
                inputNumber.value = '';
                if (inputValue < computerNumber) {
                    spanInfo(`Too small !`, chanceNumberSpan);
                } else {
                    spanInfo(`Too big !`, chanceNumberSpan);
                }
            }
        } else {
            spanInfo("Please enter a number", checkBtn);
        };
    };
});

const win = (input, btn) => {
    input.style.display = 'none';
    btn.style.display = 'none';
}

const othersInfo = (str, type) => {
    const span = document.createElement("span");
    span.innerText = `${str}`;
    span.style.color = 'black';
    span.style.fontWeight = '300'
    type.appendChild(span);
}

const spanInfo = (str, button) => {
    const span = document.createElement("span");
    const parent = button.parentElement;
    span.innerText = `${str}`;
    span.style.color = 'red'
    parent.appendChild(span);
    setTimeout(() => {
        parent.removeChild(span);
    }, 3000);
}

const randomNumber = () => {
    const max = 20;
    const int = Math.floor(Math.random() * max);
    return int;
}