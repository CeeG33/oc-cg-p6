
const urlErrorMessage = "Problème dans l'URL fourni ! ";

// Fonction qui récupère les données d'une URL donnée et les renvoie sous format JSON
async function getData(url) {
    if (url === undefined) return;
    const response = await fetch(url);
    const errorMessage = urlErrorMessage;

    if (!response.ok) {
        throw new Error (errorMessage + "Code erreur: " + response.status);
    }

    return response.json();
}

async function getBestFilmData() {
    const bestFilmPromise = getData(urlImdbScore);
    const data = await bestFilmPromise;
    const bestFilm = data.results[0];
    const bestFilmUrl = bestFilm.url;
    const bestFilmPromise2 = getData(bestFilmUrl);
    return bestFilmPromise2
}

export { getData, getBestFilmData }