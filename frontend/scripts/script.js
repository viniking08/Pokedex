const pokemonGrid = document.getElementById("pokemonGrid");
let allPokemon = [];
const pokemonClicado = allPokemon.find(i => i.name === event.target.dataset.pokemon);

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
        pokemonGrid.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="img-card" src="${i.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${i.name}">
        <div class="card-body">
            <h5 class="card-title">${i.name}</h5>
            <p class="card-text">No. ${i.id}</p>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalPokemon" data-pokemon="${i.name}">
    Ver Detalhes
</a>
        </div>
    </div>
        `
    })
}

pokemonGrid.addEventListener("click", (event) => { // ativa clicando em qualquer lugar mas só funciona no botao
    if (event.target.dataset.pokemon) {

        const pokemonClicado = allPokemon.find(i => i.name === event.target.dataset.pokemon);

        document.querySelector("#nomePokemon").textContent = pokemonClicado.name;

        document.querySelector("#imagemPokemon").src = pokemonClicado.sprites.other["official-artwork"].front_default;

        document.querySelector("#tipoPokemon").textContent = pokemonClicado.types.map(tipo => tipo.type.name).join(" / ");

        document.querySelector("#hpPokemon").textContent = pokemonClicado.stats[0].base_stat;

        document.querySelector("#ataquePokemon").textContent = pokemonClicado.stats[1].base_stat;

        document.querySelector("#defesaPokemon").textContent = pokemonClicado.stats[2].base_stat;

        document.querySelector("#velocidadePokemon").textContent = pokemonClicado.stats[5].base_stat;

        document.querySelector("#alturaPokemon").textContent = pokemonClicado.height / 10 + " m";

        document.querySelector("#pesoPokemon").textContent = pokemonClicado.weight / 10 + " kg";

    }
});

buscarPokemons();