$(document).ready(() => {

    var pokeArr = [];
    var poke1;
    var poke2;
    var points = 0;
    var allElements = $('.poke-card');
    var totalPointToWin = allElements.length / 2;
    showPoints(points);


    $('.poke-card').click(function() {
        let pokeElement = $(this)[0].getElementsByClassName('poke-card-content')[0];
        pokeArr.push(pokeElement);
        pokeElement.classList.add('active');
        
        let pokeClassName = pokeElement.className.split(' ')[1];
        if (poke1) {
            // allElements.addClass('disabled');
            poke2 = pokeClassName;

            if (poke1 === poke2) {
                points++;
                showPoints(points);
                if (points === totalPointToWin) {
                    console.log('HAS GANADO!!');
                }
                pokeArr = [];
                // allElements.removeClass('disabled');
            } else {
                setTimeout(() => {
                    pokeArr.forEach(poke => {
                        poke.classList.remove('active');
                        pokeArr = [];
                    });
                }, 1200);
                // allElements.removeClass('disabled');
            }
            poke1 = '';
            poke2 = '';
        } else {
            poke1 = pokeClassName;
        }
    });


    function showPoints(points) {
        $('#points').html(points);
    }

});