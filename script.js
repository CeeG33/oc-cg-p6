const urlImdbScore = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const urlImdbScore7films = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
const urlImdbScore7filmsCrimeCategory = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=crime";
const urlImdbScore7filmsMysteryCategory = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=mystery";
const urlImdbScore7filmsSportCategory = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=sport";
const urlErrorMessage = "Problème dans l'URL fourni ! ";
const jsonErrorMessage = "Problème dans la conversion en JSON ! ";
const idLocationErrorMessage = "Problème de la localisation de l'ID dans le code HTML ! ";


// Fonction qui récupère les données d'une URL donnée et les renvoie sous format JSON
async function getData(url) {
    const response = await fetch(url);
    const errorMessage = urlErrorMessage;

    if (!response.ok) {
        throw new Error (errorMessage + "Code erreur: " + response.status);
    }

    return response.json();
}

/* Fonction qui crée une balise HTML ayant les paramètres suivants :
typeToCreate = Type de la balise.
textContent = Contenu texte de la balise.
className = Classe de la balise(ignoré si nul).
idName = ID de la balise(ignoré si nul).
*/
function createHtmlElement(typeToCreate, textContent = null, className = null, idName = null) {
    const element = document.createElement(typeToCreate);
    element.textContent = textContent; 
    if (className !==  null) { 
        element.className = className;
    }
    if (idName !==  null) { 
        element.id = idName;
    }

    return element;
}

/* Fonction qui crée une balise HTML ayant les paramètres suivants :
typeToCreate = Type de la balise.
textContent = Contenu texte de la balise.
dataAction = Action déclenchée par la balise.
className = Classe de la balise(ignoré si nul).
idName = ID de la balise(ignoré si nul).
*/
function createHtmlElementWithDataAction(typeToCreate, textContent = null, dataAction, className = null, idName = null) {
    const element = document.createElement(typeToCreate);
    element.textContent = textContent; 
    if (className !==  null) { 
        element.className = className;
    }
    if (idName !==  null) {
        element.id = idName;
    }
    
    element.dataset.action = dataAction;

    return element;
}

/* Fonction qui crée une balise HTML ayant les paramètres suivants :
typeToCreate = Type de la balise.
textContent = Contenu texte de la balise.
dataTarget = Data ciblée par la balise.
className = Classe de la balise(ignoré si nul).
idName = ID de la balise(ignoré si nul).
*/
function createHtmlElementWithDataTarget(typeToCreate, textContent = null, dataTarget, className = null, idName = null) {
    const element = document.createElement(typeToCreate);
    element.textContent = textContent; 
    if (className !==  null) { 
        element.className = className;
    }
    if (idName !==  null) {
        element.id = idName;
    }
    
    element.dataset.target = dataTarget;

    return element;
}


/* Fonction qui crée une balise HTML image ayant les paramètres suivants :
imgUrl = URL de l'image.
imgAlt = Texte alternatif de l'image.
*/
function createHtmlImg(imgUrl, imgAlt) {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = imgAlt + " Cover Image";
    return img;
}


/* Fonction qui crée un caroussel selon les paramètres suivants :
sectionId = ID de la balise dans laquelle on souhaite créer le caroussel.
carouselTitle = Titre du caroussel qui sera affiché à l'utilisateur.
data = données à partir desquels se crée le caroussel.
*/

function carousel(sectionId, carouselTitle, data) {
    const sectionTitle = sectionId;
    const sectionLocation = document.getElementById(sectionTitle);
    const dataDetails = data.results;
    const h1 = createHtmlElement("h1", carouselTitle);
    sectionLocation.appendChild(h1);
    const buttonDiv = createHtmlElement("div", "", "button-carousel");
    sectionLocation.appendChild(buttonDiv);
    const buttonL = createHtmlElementWithDataAction("button", "L", "slideLeft");
    buttonDiv.appendChild(buttonL);
    const buttonR = createHtmlElementWithDataAction("button", "R", "slideRight");
    buttonDiv.appendChild(buttonR);
    const carouselUl = createHtmlElementWithDataTarget("ul", "", "carousel", "carousel");
    sectionLocation.appendChild(carouselUl);

    console.log(dataDetails);
    
    for (let film of dataDetails) {
        const filmUrl = film.url;
        const filmCard = createHtmlElementWithDataTarget("li", "", "card", "js-modal");
        const linkContainer = createHtmlElement("a", null, "js-modal");
        linkContainer.setAttribute("href", "#modal");
        linkContainer.addEventListener("click", (event) => openModal(event, filmUrl));

        const filmImg = createHtmlImg(film.image_url, film.title);
        linkContainer.appendChild(filmImg);

        filmCard.appendChild(linkContainer);

        carouselUl.appendChild(filmCard);
        
    }
}
/* Charge les informations d'un film et crée les balises HTML dédiées selon les paramètres suivants :
data = Data de la film à charger.
modalLocation = Emplacement de la modale.
*/

function loadFilmData(data, modalLocation) {
    const img = data.image_url;
    const title = data.title;
    const genre = "Genres : " + data.genres.join(", ");
    const date = data.date_published;
    let rated = null;
    if (data.rated !== "Not rated or unkown rating" && data.rated !== "Not Rated") {
        rated = data.rated;
    }

    const imdb = "IMDb Score : " + data.imdb_score;
    let director = null;
    if (data.directors.length > 1) {
        director = "Director : " + data.directors.join(", ");
    } else {
        director = "Director : " + data.directors[0];
    }
    const actors = "Actors : " + data.actors.join(", ");
    const duration = "Duration : " + data.duration + " mins";
    let countries = null;
    if (data.countries.length > 1) {
        countries = "Country : " + data.countries.join(", ");
    } else {
        countries = "Country : " + data.countries[0];
    }
    let grossIncome = null;
    if (data.worldwide_gross_income !== null) {
        grossIncome = "Worldwide Gross Income : " + data.worldwide_gross_income.toLocaleString("en-EN", {style: "currency", currency: "USD"});
    } else {
        grossIncome = "";
    }
    const description = "Description : " + data.description;

    let durationDateRatedContent = null;
    if (rated !== null) {
        durationDateRatedContent = "Duration : " + duration + " - Release date : " + date + " - " + rated;
    } else {
        durationDateRatedContent = duration + " - Release date : " + date;
    }
    
    let filmImageModal = modalLocation.querySelector("img");
    filmImageModal.src = img;
    filmImageModal.alt = title + " Cover Image";

    let h1Title = modalLocation.querySelector("h1");
    h1Title.textContent = title;

    let h2DurationDateRated = modalLocation.querySelector("h2");
    h2DurationDateRated.textContent = durationDateRatedContent;

    const genreDirectorCountryContent = genre + " - " + director + " - " + countries
    let h3GenreDirectorCountry = modalLocation.querySelector("h3");
    h3GenreDirectorCountry.textContent = genreDirectorCountryContent;

    let h3ImdbScore = modalLocation.querySelector("h3.imdb-score");
    h3ImdbScore.textContent = imdb;
    
    let descriptionContent = modalLocation.querySelector("p.description");
    descriptionContent.textContent = description;

    let actorsContent = modalLocation.querySelector("p.actors");
    actorsContent.textContent = actors;

    if (grossIncome !== null) {
        let grossIncomeContent = modalLocation.querySelector("p.gross-income");
        grossIncomeContent.textContent = grossIncome;
    }
}

// Récupération et affichage de la data du meilleur film selon sa note IMDb (best film)
const bestFilmsPromise = getData(urlImdbScore);
bestFilmsPromise.then(bestFilms => {
    const sectionTitle = "best-film";
    const sectionLocation = document.getElementById(sectionTitle);
    firstFilm = bestFilms.results[0];
    firstFilmTitle = firstFilm.title;
    firstFilmUrl = firstFilm.url;
    const filmTitle = createHtmlElement("h1", firstFilmTitle);
    sectionLocation.appendChild(filmTitle);
    const firstFilmImage = createHtmlImg(firstFilm.image_url, firstFilm.title);
    sectionLocation.appendChild(firstFilmImage);

    const modalClass = ".modal-wrapper"
    const modalLocation = document.querySelector(modalClass);
    const firstFilmPromise = getData(firstFilmUrl);
    firstFilmPromise.then(data => {
        loadFilmData(data, modalLocation);
           
    });
    
    
});

/* Récupération de la data des 7 meilleurs films selon leur note IMDb (best rated films).
Création d'un caroussel.
Affichage de la data dans le caroussel.
*/
const best7FilmsPromise = getData(urlImdbScore7films);
const best7FilmsCarousel = best7FilmsPromise.then(data => carousel("best-rated-films", "best rated films", data));

// Idem pour la catégorie Crime.
const best7FilmsCrimeCategoryPromise = getData(urlImdbScore7filmsCrimeCategory);
const best7FilmsCrimeCategoryCarousel = best7FilmsCrimeCategoryPromise.then(data => carousel("crime-category", "crime", data));

// Idem pour la catégorie Mystery.
const best7FilmsMysteryCategoryPromise = getData(urlImdbScore7filmsMysteryCategory);
const best7FilmsMysteryCategoryCarousel = best7FilmsMysteryCategoryPromise.then(data => carousel("mystery-category", "mystery", data));

// Idem pour la catégorie Sport.
const best7FilmsSportCategoryPromise = getData(urlImdbScore7filmsSportCategory);
const best7FilmsSportCategoryCarousel = best7FilmsSportCategoryPromise.then(data => carousel("sport-category", "sport", data));

let modal = null;

const openModal = function (event, filmUrl) {
    event.preventDefault();
    modal = document.getElementById("modal");
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    const filmDataPromise = getData(filmUrl);
            filmDataPromise.then(data => {
                loadFilmData(data, document.querySelector(".modal-wrapper"));
            });
}

const closeModal = function (event) {
    if (modal === null) return;
    event.preventDefault();
    window.setTimeout(function() {
        modal.style.display = "none";
        modal = null;
    }, 500)
    
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(link => {
    link.addEventListener("click", openModal);
})

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
})

function openBestFilmModal() {
    const modalLocation = document.querySelector(".modal-wrapper");
    const bestFilmPromise = getData(urlImdbScore);
    bestFilmPromise.then(data => {
        const bestFilm = data.results[0];
        const bestFilmUrl = bestFilm.url;
        const bestFilmPromise2 = getData(bestFilmUrl);
        bestFilmPromise2.then(data => {
            loadFilmData(data, modalLocation);
            modal.style.display = null;
            modal.removeAttribute("aria-hidden");
            modal.setAttribute("aria-modal", "true");
            modal.addEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
            modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
        })
        
    });
}


/*



const best7FilmsPromise = getData(urlImdbScore7films);
best7FilmsPromise.then(best7Films => {
    const sectionTitle = "best-rated-films";
    const sectionLocation = document.getElementById(sectionTitle);
    const bestFilmsH1Text = "Films les mieux notés";
    const allFilms = best7Films.results;
    const h1 = createHtmlElement("h1", bestFilmsH1Text);
    sectionLocation.appendChild(h1);
    const buttonDiv = createHtmlElement("div", "", "button-carousel");
    sectionLocation.appendChild(buttonDiv);
    const buttonL = createHtmlElementWithDataAction("button", "L", "slideLeft");
    buttonDiv.appendChild(buttonL);
    const buttonR = createHtmlElementWithDataAction("button", "R", "slideRight");
    buttonDiv.appendChild(buttonR);
    const carouselUl = createHtmlElementWithDataTarget("ul", "", "carousel", "carousel");
    sectionLocation.appendChild(carouselUl);
    console.log(allFilms);
    for (let film of allFilms) {
        const filmCard = createHtmlElementWithDataTarget("li", "", "card", "card");
        const filmImg = createHtmlImg(film.image_url, film.title);
        filmCard.appendChild(filmImg);
        carouselUl.appendChild(filmCard);
    }
});


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