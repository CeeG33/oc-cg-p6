const urlImdbScore = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const urlErrorMessage = "Problème dans l'URL fourni ! ";
const jsonErrorMessage = "Problème dans la conversion en JSON ! ";

// Fonction qui récupère les données d'une URL donnée et les renvoie sous format JSON
async function getData(url) {
    const response = await fetch(url);
    const errorMessage = urlErrorMessage;

    if (!response.ok) {
        throw new Error (errorMessage + "Code erreur: " + response.status);
    }

    return response.json();
}


const bestFilmsPromise = getData(urlImdbScore);
bestFilmsPromise.then(bestFilms => {
    const firstFilm = bestFilms.results[0];
    const firstFilmTitle = firstFilm.title
    console.log(firstFilm);
    console.log(firstFilmTitle);
})










/*

async function main() {
    const bestFilmsData = await getData(urlImdbScore);
    console.log(bestFilmsData);

    const firstRankedFilm = bestFilmsData.results[0];
    console.log(firstRankedFilm);

    const firstRankedFilmTitle = firstRankedFilm.title;
    console.log(firstRankedFilmTitle);
}

main();


// Envoi de la requête à l'API pour obtenir le meilleur film selon son score IMDb
fetch(url_imdb_score)
    .then(response => response.json())
    .then(data => {
        const first_film = data.results[0]
        console.log(first_film);
        console.log(first_film.title);

        const best_film = document.getElementById("best-film");
        const best_film_h1 = document.createElement("h1");
        best_film_h1.textContent = first_film.title;
        best_film.appendChild(best_film_h1);
        const best_film_img = document.createElement("img");
        best_film_img.src = first_film.image_url;
        best_film_img.alt = first_film.title + " Cover image";
        best_film.appendChild(best_film_img);
    })

    .catch(error => {
        console.error("Une erreur s'est produite !! >>", error);
    });

// Création du caroussel
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
*/