document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("number");
    const button = document.getElementById("convert-btn");
    const output = document.getElementById("output");

    function toRoman (num) {
        const lookup = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
        let roman = '';
        for (let i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }

    button.addEventListener("click", () => {
        const inputValue = parseInt(input.value, 10);
        if (isNaN(inputValue)) {
            output.innerHTML = `Please enter a valid number`;
        } else if (inputValue < 1) {
          output.innerHTML = `Please enter a number greater than or equal to 1`
        } else if (inputValue > 3999) {
          output.innerHTML = `Please enter a number less than or equal to 3999`
        } else {
            const romanValue = toRoman(inputValue);
            output.innerHTML = `The Roman value of ${inputValue} is : ${romanValue}`;
        }
    });
});