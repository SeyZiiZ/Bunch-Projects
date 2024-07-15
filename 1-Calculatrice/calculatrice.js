function suppr (str) {
    let tableau = str.split('')
    tableau.pop();
    return tableau.join('')
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#display");
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonValue = button.innerText;

            if (buttonValue === 'C') {
                input.value = '';
                buttonValue = '';
            } else if (buttonValue === 'Suppr') {
                input.value = suppr(input.value);
            } else if (buttonValue === '=') {
                const result = eval(input.value);
                if (result === Infinity || result === -Infinity) {
                    input.value = 0;
                } else {
                    try {
                        input.value = result;
                    } catch (e) {
                        throw Error("Impossible de calculer");
                    }
                }
            } else {
                input.value += buttonValue;
            }
        });
    })
})