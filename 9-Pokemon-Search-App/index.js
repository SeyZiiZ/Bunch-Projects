const fetchDiv = document.getElementById("fetch-div");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomPokemonButton = document.getElementById("random-button");
const pokemonInfoDiv = document.querySelector(".pokemon-info");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("types");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const getPokemonUser = (searchInputValue) => {
    let searchInputCleaned = searchInputValue.toLowerCase().replace(/[^a-z0-9]/g, '');
    return searchInputCleaned;
};

const randomNumber = () => {
    const maxNumber = 1025;
    return Math.floor(Math.random() * maxNumber);
}

async function fetchData(userPokemon) {
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userPokemon}`);
        const data = await res.json();
        return data;
    } catch (err) {
        alert(`Impossible to find the pokemon(s) : ${err}`);
        return null;
    }
}

const getData = (data) => {
    if (data) {
        const { name, id, height, weight, types, stats, sprites } = data;
        const typesNames = types.map(typeInfo => typeInfo.type.name);

        pokemonName.innerText = `Nom : ${name}`;
        pokemonId.innerText = `Id : ${id}`;
        pokemonWeight.innerText = `Poids : ${weight}`;
        pokemonHeight.innerText = `Taille : ${height}`;
        pokemonType.innerText = `Type : ${typesNames}`;
        pokemonHP.innerText = `HP : ${stats[0].base_stat}`;
        pokemonAttack.innerText = `Attack : ${stats[1].base_stat}`;
        pokemonDefense.innerText = `Defense : ${stats[2].base_stat}`;
        pokemonSpecialAttack.innerText = `Special Attack : ${stats[3].base_stat}`;
        pokemonSpecialDefense.innerText = `Special Defense : ${stats[4].base_stat}`;
        pokemonSpeed.innerText = `Speed : ${stats[5].base_stat}`;

        fetchDiv.innerHTML = 
        `
            <img src="${sprites.front_default}" alt="${name} picture" width="250px" >
        `;
    } else {
        pokemonName.innerText = 'Error fetching data';
    }
}

searchButton.addEventListener('click', async () => {
    const userInput = searchInput.value;

    const data = await fetchData(getPokemonUser(userInput));
    getData(data);
});

randomPokemonButton.addEventListener("click", async () => {
    const userInput = randomNumber();
    console.log(userInput);
    const data = await fetchData(userInput);
    getData(data);
})

document.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
