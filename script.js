const carousel = document.querySelector("[data-target='carousel']");
const card = carousel.querySelector("[data-target='card']");
const leftButton = document.querySelector("[data-target='slideLeft']");
const rightButton = document.querySelector("[data-target='slideRight']");

const carouselWidth = carousel.offsetWitdh;
const cardStyle = card.currentStyle || window.getComputedStyle(card);
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

const cardCount = carousel.querySelectorAll("[data-target='card']").length;

let offset = 0;
const maxX = -((cardCount / 4) * carouselWidth + (cardMarginRight * (cardCount / 4)) - carouselWidth - cardMarginRight);

leftButton.addEventListener("click", function() {
    if (offset !== 0) {
        offset += carouselWidth + cardMarginRight;
        carousel.style.transform = 'translateX(${offset}px)';
    }
})

leftButton.addEventListener("click", function() {
    if (offset !== 0) {
        offset -= carouselWidth + cardMarginRight;
        carousel.style.transform = 'translateX(${offset}px)';
    }
})



// Envoi de la requête à l'API pour obtenir le meilleur film selon son score IMDb
/*fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => response.json())
    .then(data => {
        console.log(data.results[0]);

        const best_film = document.getElementById("best-film");
        const best_film_item = document.createElement("h1");
        best_film_item.textContent = data.results.title;

        best_film.appendChild(best_film_item);
    })

    .catch(error => {
        console.error("Une erreur s'est produite", error);
    });

*/