import { getData } from "./apiservice.js";
import { loadFilmData } from "./mine.js";

const modal = document.getElementById("modal");

async function handleModal (filmUrl) {
    const filmDetails = await loadModalData(filmUrl)
    loadFilmData(filmDetails, modal);
    openModal(filmDetails)
}

async function loadModalData(filmUrl) {
    if (filmUrl === undefined) return;
    const filmData = await getData(filmUrl);
    return filmData
}

//Récupérer la data du film avant, puis passer la data directement au lieu de faire la récupératin dans la fonction openModal
const openModal = async (filmDetails) => { 
    console.log("Détails du film : " + filmDetails);
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    
}

// Fermeture de la modale.
const closeModal = function (event) {
    window.setTimeout(function() {
        modal.style.display = "none";
    }, 500)
    
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

}

export { modal, handleModal, closeModal }