const urlImdbScore = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const urlImdbScore7films = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
const urlErrorMessage = "Problème dans l'URL fourni ! ";
const jsonErrorMessage = "Problème dans la conversion en JSON ! ";
const idLocationErrorMessage = "Problème de la localisation de l'ID dans le code HTML ! ";
const bestFilmsH1Text = "Films les mieux notés";

// Fonction qui récupère les données d'une URL donnée et les renvoie sous format JSON
async function getData(url) {
    const response = await fetch(url);
    const errorMessage = urlErrorMessage;

    if (!response.ok) {
        throw new Error (errorMessage + "Code erreur: " + response.status);
    }

    return response.json();
}

/* Fonction qui crée un élément HTML ayant les paramètres suivants :
idLocationInHtml = ID de la balise dans laquelle on souhaite créer l'élément.
elementIdToCreate = ID de l'élément à créer.
content = Contenu de l'élément à créer.
*/
async function createHtmlElement(idLocationInHtml, elementIdToCreate, content) {
    const location = document.getElementById(idLocationInHtml);
    const element = await document.createElement(elementIdToCreate);
    element.textContent = content; 
    if (!location) {
        throw new Error (idLocationErrorMessage);
    }
    location.appendChild(element);
}

/* Fonction qui crée une balise HTML image ayant les paramètres suivants :
idLocationInHtml = ID de la balise dans laquelle on souhaite créer l'image.
imgUrl = URL de l'image.
imgAlt = Texte alternatif de l'image.
*/
async function createHtmlImg(idLocationInHtml, imgUrl, imgAlt) {
    const location = document.getElementById(idLocationInHtml);
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = imgAlt + " Cover Image";
    
    if (!location) {
        throw new Error (idLocationErrorMessage);
    }
    location.appendChild(img);
}

// Récupération et affichage de la data du meilleur film selon sa note IMDb (best film)
const bestFilmsPromise = getData(urlImdbScore);
bestFilmsPromise.then(bestFilms => {
    firstFilm = bestFilms.results[0];
    firstFilmTitle = firstFilm.title;
    createHtmlElement("best-film", "h1", firstFilmTitle);
    createHtmlImg("best-film", firstFilm.image_url, firstFilm.title);
});

// Début de la même chose mais avec les 7 meilleurs films.
const best7FilmsPromise = getData(urlImdbScore7films);
best7FilmsPromise.then(best7Films => {
    const allFilms = best7Films.results;
    const h1 = createHtmlElement("best-rated-films", "h1", bestFilmsH1Text);
    const buttonDiv = createHtmlElement("best-rated-films", "div", "");
    buttonDiv.class = "button-carousel";
    const buttonL = createHtmlElement("button-carousel", "button", "L");
    buttonL.data-action = "slideLeft";
    const buttonR = createHtmlElement("button-carousel", "button", "R");
    buttonL.data-action = "slideLeft";
    buttonR.data-action = "slideRight";
    
    const carouselUl = createHtmlElement("best-rated-films", "ul", "");

    console.log(allFilms);
    for (let film of allFilms) {

    }
});











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