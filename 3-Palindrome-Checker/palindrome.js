const input = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", function() {
    if (input.value.trim() === "") {
        result.innerText = `Enter input to check`
        setTimeout(() => {
            result.innerText = '';
        }, 2000)
    } else {
        const lower = input.value.trim().toLowerCase();
        const cleaned = lower.replace(/[^a-z0-9]/g, '');
        const reverse = cleaned.split('').reverse().join('');
        if (reverse === cleaned) {
            result.innerText = `${input.value} is a palindrome`;
        } else {
            result.innerText = `${input.value} is not a palindrome`;
        }
    }
});