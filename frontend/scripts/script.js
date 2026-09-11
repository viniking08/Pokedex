const pokemonGrid = document.getElementById("pokemonGrid");
let allPokemon = [];

async function buscarPokemons() {
    try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    allPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return await response.json();
        })
    )
    renderizarPokemons();

    console.log(data);
    } catch (error) {
    console.log(error);
    }
}

function renderizarPokemons() {
    allPokemon.forEach(i => {
        console.log(i)
        pokemonGrid.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="img-card" src="${i.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${i.name}">
        <div class="card-body">
            <h5 class="card-title">${i.name}</h5>
            <p class="card-text">No. ${i.id}</p>
            <a href="#" class="btn btn-primary">Ver Detalhes</a>
        </div>
    </div>
        `
    })
}

buscarPokemons();

