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
function createHtmlElement(typeToCreate, textContent, className = null, idName = null) {
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
function createHtmlElementWithDataAction(typeToCreate, textContent, dataAction, className = null, idName = null) {
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
function createHtmlElementWithDataTarget(typeToCreate, textContent, dataTarget, className = null, idName = null) {
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
        const filmCard = createHtmlElementWithDataTarget("li", "", "card", "card");
        const filmImg = createHtmlImg(film.image_url, film.title);
        const filmUrl = film.url;
        filmCard.appendChild(filmImg);
        carouselUl.appendChild(filmCard);
        const filmDataPromise = getData(filmUrl);
        const filmData = filmDataPromise.then(data => {
            const img = data.image_url;
            const title = data.title;
            const genre = data.genres.join(", ");
            const date = data.date_published;
            let rated = null;
            if (data.rated !== "Not rated or unkown rating" || "Not Rated") {
                rated = data.rated;
            }
            const imdb = data.imdb_score;
            let director = null;
            if (data.directors.length > 1) {
                director = data.directors.join(", ");
            } else {
                director = data.directors[0];
            }
            const actors = data.actors.join(", ");
            const duration = data.duration + " mins";
            let countries = null;
            if (data.countries.length > 1) {
                countries = data.countries.join(", ");
            } else {
                countries = data.countries[0];
            }
            let grossIncome = null;
            if (data.worldwide_gross_income !== null) {
                grossIncome = data.worldwide_gross_income.toLocaleString("en-EN", {style: "currency", currency: "USD"});
            };
            const description = data.description;
            console.log(filmData.title);
        });

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
    
    
    const modalId = "modal1"
    const modalLocation = document.getElementById(modalId);

    modalLocation.appendChild(firstFilmImage);
    modalLocation.appendChild(filmTitle);
    const firstFilmPromise = getData(firstFilmUrl);
    firstFilmPromise.then(data => {
        const img = data.image_url;
        const title = data.title;
        const genre = data.genres.join(", ");
        const date = data.date_published;
        let rated = null;
        if (data.rated !== "Not rated or unkown rating" || "Not Rated") {
            rated = data.rated;
        }
        const imdb = data.imdb_score;
        let director = null;
        if (data.directors.length > 1) {
            director = data.directors.join(", ");
        } else {
            director = data.directors[0];
        }
        const actors = "Acteurs : " + data.actors.join(", ");
        const duration = data.duration + " mins";
        let countries = null;
        if (data.countries.length > 1) {
            countries = data.countries.join(", ");
        } else {
            countries = data.countries[0];
        }
        let grossIncome = null;
        if (data.worldwide_gross_income !== null) {
            grossIncome = "Résultat au box-office : " + data.worldwide_gross_income.toLocaleString("en-EN", {style: "currency", currency: "USD"});
        };
        const description = "Description : " + data.description;

        let durationDateRatedContent = null;
        if (rated !== null) {
            durationDateRatedContent = duration + " - " + date + " - " + rated;
        } else {
            durationDateRatedContent = duration + " - " + date;
        }
        const h2DurationDateRated = createHtmlElement("h2", durationDateRatedContent);
        modalLocation.appendChild(h2DurationDateRated);

        const genreDirectorCountryContent = genre + " - " + director + " - " + countries
        const h3GenreDirectorCountry = createHtmlElement("h3", genreDirectorCountryContent);
        modalLocation.appendChild(h3GenreDirectorCountry);
        
        const pDescription = createHtmlElement("p", description);
        modalLocation.appendChild(pDescription);

        const pActors = createHtmlElement("p", actors);
        modalLocation.appendChild(pActors);

        if (grossIncome !== null) {
            const pGrossIncome = createHtmlElement("p", grossIncome);
            modalLocation.appendChild(pGrossIncome);
        }
        
        debugger     
    });
    
    
});

/* Récupération de la data des 7 meilleurs films selon leur note IMDb (best rated films).
Création d'un caroussel.
Affichage de la data dans le caroussel.
*/
const best7FilmsPromise = getData(urlImdbScore7films);
const best7FilmsCarousel = best7FilmsPromise.then(data => carousel("best-rated-films", "Les films les mieux notés", data));

// Idem pour la catégorie Crime.
const best7FilmsCrimeCategoryPromise = getData(urlImdbScore7filmsCrimeCategory);
const best7FilmsCrimeCategoryCarousel = best7FilmsCrimeCategoryPromise.then(data => carousel("crime-category", "Crime", data));

// Idem pour la catégorie Mystery.
const best7FilmsMysteryCategoryPromise = getData(urlImdbScore7filmsMysteryCategory);
const best7FilmsMysteryCategoryCarousel = best7FilmsMysteryCategoryPromise.then(data => carousel("mystery-category", "Mystery", data));

// Idem pour la catégorie Sport.
const best7FilmsSportCategoryPromise = getData(urlImdbScore7filmsSportCategory);
const best7FilmsSportCategoryCarousel = best7FilmsSportCategoryPromise.then(data => carousel("sport-category", "Sport", data));

let modal = null;

const openModal = function (event) {
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute("href"));
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

/*const loadModal(target) {

}
*/

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

document.querySelectorAll(".js-modal").forEach(lien => {
    lien.addEventListener("click", openModal);
})

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
})

async function get7BestFilmsUrlbyImdbScore(category) {
    const url = urlImdbScore7films + "&genre=" + category;
    const best7FilmsbyCategoryPromise = getData(url);
    const data = await best7FilmsbyCategoryPromise;
    const best7FilmsUrl = [];
    for (let result of data.results) {
        best7FilmsUrl.push(result.url);  
    }
    return best7FilmsUrl;
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