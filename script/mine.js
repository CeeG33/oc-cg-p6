import { handleModal } from "./modal.js"

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

function createCarousel(filmCategory) { 
    const sectionId = filmCategory.id
    const carouselTitle = filmCategory.categoryTitle
    const data = filmCategory.filmData

    const sectionLocation = document.getElementById(sectionId);
    const dataDetails = data.results;
    
    const h1 = createHtmlElement("h1", carouselTitle);
    sectionLocation.appendChild(h1);
    
    const buttonDiv = createHtmlElement("div", null, "button-carousel");
    sectionLocation.appendChild(buttonDiv);
    
    const buttonL = createHtmlElementWithDataAction("button", "⩤", "slideLeft");
    buttonDiv.appendChild(buttonL);
    
    const buttonR = createHtmlElementWithDataAction("button", "⩥", "slideRight");
    buttonDiv.appendChild(buttonR);
    
    const carousel = createHtmlElementWithDataTarget("div", null, "carousel", "carousel");

    const carouselContainer = createHtmlElement("div", null, "carousel-container");

    sectionLocation.appendChild(carouselContainer)

    carouselContainer.appendChild(carousel);

    const carouselWidth = carouselContainer.offsetWidth;
    
    let cardStyle;
    let cardMarginRight;

    for (let film of dataDetails) {
        const filmUrl = film.url;
        const filmCard = createHtmlElementWithDataTarget("article", null, "card", "card");
        
        filmCard.addEventListener("click", () => handleModal(filmUrl));

        const filmImg = createHtmlImg(film.image_url, film.title);
        filmCard.appendChild(filmImg);

        carousel.appendChild(filmCard);
        
        cardStyle = window.getComputedStyle(filmCard);
        
        cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
        
    }
    
    let offset = 0;
    const maxX = -728;
    
    buttonL.addEventListener("click", function() {
        if (offset !== 0) {
            offset += carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    })

    buttonR.addEventListener("click", function() {
        if (offset !== maxX) {
            offset -= carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    })

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

async function createBestFilmHtml(bestFilmResult) {
    const firstFilmTitle = bestFilmResult.title;
    
    const filmTitle = createHtmlElement("h1", firstFilmTitle)
    const bestFilmSection = document.querySelector("#best-film")
    bestFilmSection.appendChild(filmTitle)
    
    const firstFilmImage = createHtmlImg(bestFilmResult.image_url, bestFilmResult.title);
    bestFilmSection.appendChild(firstFilmImage);

    const playButton = createHtmlElement("button", "►")
    playButton.addEventListener("click", () => handleModal(bestFilmResult.url))
    bestFilmSection.appendChild(playButton);

    

}

export { createCarousel, createBestFilmHtml, loadFilmData }