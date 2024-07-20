document.addEventListener("DOMContentLoaded", () => {

    const timezones = [
        { country: "France", timezone: "Europe/Paris" },
        { country: "United States (New York)", timezone: "America/New_York" },
        { country: "United States (Los Angeles)", timezone: "America/Los_Angeles" },
        { country: "Japan", timezone: "Asia/Tokyo" },
        { country: "Australia (Sydney)", timezone: "Australia/Sydney" },
        { country: "India", timezone: "Asia/Kolkata" },
        { country: "Brazil", timezone: "America/Sao_Paulo" },
        { country: "Russia (Moscow)", timezone: "Europe/Moscow" },
        { country: "South Africa", timezone: "Africa/Johannesburg" }
    ];

    const divBase = document.querySelector('#timezones');

    timezones.forEach(({ country, timezone }) => {
        const article = createArticle('h2', `Time in ${country}: ${getHour(timezone)}`);
        divBase.appendChild(article);

        setInterval(() => {
            article.innerText = `Time in ${country}: ${getHour(timezone)}`;
        }, 1000);
    });
});

function getHour(timezone) {
    let date = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
    return date;
}

function createArticle(tagName, content) {
    const article = document.createElement(tagName);
    article.innerText = content;
    return article;
}
