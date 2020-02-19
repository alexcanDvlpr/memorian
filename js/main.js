var pokeArray = [];
var pokeArrayToShow = [];

startGame();




$(document).ready(() => {

    $('.poke-card').click(function() {
        $(this)[0].getElementsByClassName('poke-card-content')[0].classList.add('active');
    });

});


function startGame() {
    consumeApi('https://pokeapi.co/api/v2/pokemon?limit=151');
    prepareGame();
}


function prepareGame() {
    // Coger 4 pokemons aleatorios y duplicarlos para el memorian
    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * pokeArray.length);
        addTwoEqualsElement(pokeArray[random]);
    }
    let aux = [];
    $('#loading').hide();
    while (aux.length < pokeArrayToShow.length) {
        // Imprimir las tarjetas de forma aleatoria para el juego
        let cardRandom = Math.floor(Math.random() * pokeArrayToShow.length);
        let pokemon = pokeArrayToShow[cardRandom];
        if (!aux.includes(cardRandom)) {
            aux.push(cardRandom);
            $('#game').append(createHtmlElement(pokemon));
        }
    }
}

function addTwoEqualsElement(pokemon) {
    pokeArrayToShow.push(pokemon);
    pokeArrayToShow.push(pokemon);
}

function consumeApi(endpoint) {
    $.ajax(endpoint, {
        async: false,
        success: (data) => {
            let pokemons = data.results;
            pokemons.forEach(pokemon => {
                consumePokemon(pokemon.url);
            });
        }
    });
}

function consumePokemon(url) {
    $.ajax(url, {
        async: false,
        success: (data) => {
            pokeArray.push(data);
        }
    });
}

function createHtmlElement(pokemon) {
    return `<div class="poke-card">
    <a href="#">
        <div class="poke-card-content active ` + pokemon.name + `">
            <div class="front">
                <img src="./assets/img/bg-pokeball.png" alt="bg">
                <div class="back">
                    <img src="` + pokemon.sprites.front_default + `" alt="` + pokemon.name + `">
                    <div class="text-content text-center">
                        <p>` + titleCase(pokemon.name) + `</p>
                    </div>
                </div>
            </div>
        </div>
    </a>
</div>`;
}

function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    document.write(sentence.join(" "));
    return sentence;
}