
import { createCarousel, createBestFilmHtml } from "./mine.js"

import { getData } from "./apiservice.js"

import { modal, closeModal } from "./modal.js"



const dataCatalogue = [
    {
        "url": "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7",
        "id": "best-rated-films",
        "categoryTitle": "best rated films",
    },

    {
        "url": "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=crime",
        "id": "crime-category",
        "categoryTitle": "crime",
    },

    {
        "url": "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=mystery",
        "id": "mystery-category",
        "categoryTitle": "mystery",
    },

    {
        "url": "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=sport",
        "id": "sport-category",
        "categoryTitle": "sport",
    },
]

async function main() {
    //Aller chercher données.
    const data = []

    for (let category of dataCatalogue) {
        const filmResult = await getData(category.url)
        const dataObject = {
            "id": category.id, 
            "categoryTitle": category.categoryTitle,
            "filmData": filmResult
        }
        data.push(dataObject)   
    }

    const bestFilmCategory = data[0]

    const bestFilmUrl = bestFilmCategory.filmData.results[0].url
    
    const bestFilmResult = await getData(bestFilmUrl)
    
    createBestFilmHtml(bestFilmResult)

    data.forEach(filmCategory => createCarousel(filmCategory))


    // Prise en compte du bouton échap pour la fermeture de la modale.
    modal.addEventListener("click", closeModal);
    
    window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
        }
    })

}

main()

   


