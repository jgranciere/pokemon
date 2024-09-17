const imgPokemon = document.querySelector('.pokemon-img');
const button = document.querySelector('.btn');
const input = document.querySelector('.input-pokemon');
const form = document.querySelector('.form');
const section = document.querySelector('.pokemons-resultado');
const notFound = document.querySelector('.notfound');
const pokemonCount = 600;
const pokemonIcon = document.querySelector('.pokemon-icon');


const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
    }
}

const renderAllPokemons = async () => {
    section.innerHTML = ''; 
    for (let i = 1; i <= pokemonCount; i++) {
        const data = await fetchPokemon(i);
        if (data) {
            renderPokemonCard(data); 
        }
    }
}

const renderPokemonCard = (data) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemons-card');

    const pokemonNumber = document.createElement('span');
    pokemonNumber.classList.add('pokemon-number');
    pokemonNumber.textContent = data.id;

    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = data.name.toUpperCase();

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-img');
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.alt = `${data.name} image`;

    pokemonCard.appendChild(pokemonNumber);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonName);

    section.appendChild(pokemonCard);
}

const renderPokemon = async (pokemon) => {
    section.innerHTML = ''; 
    const data = await fetchPokemon(pokemon);

    if (data) {
        section.style.display = 'flex';
        notFound.style.display = 'none'; 
        renderPokemonCard(data);
    } else {
        section.style.display = 'none'; 
        notFound.style.display = 'block'; 
    }
}


window.addEventListener('load', () => {
    renderAllPokemons();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value === ''){
        section.style.display = 'none'; 
        notFound.style.display = 'block'; 
        return;
    }
    renderPokemon(input.value.toLowerCase());
})

button.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value === ''){
        section.style.display = 'none'; 
        notFound.style.display = 'block'; 
        return;
    }
    renderPokemon(input.value.toLowerCase());
})

pokemonIcon.addEventListener('click', () => {
    location.reload(); 
});


