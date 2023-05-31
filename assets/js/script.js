// Number of cat images
const numberCats = 16

// 1 for true, 0 for false
const hasBreeds = 1

const url = `https://api.thecatapi.com/v1/images/search?limit=${numberCats}&has_breeds=${hasBreeds}&api_key=live_ZgwncwSdE3fC6IJdLbVmw1a4H0NdqW7O4A6tZH0jimDg7fxO8rkwqGjxhSOnfknS`

// Access to API depending on types and methods
async function fetchData(method, bodyObject) {

    const options = {
        method: method,
        headers: {
        'Accept': 'application/json'
        },
        body: bodyObject
    }

    // Change the headers depending on the method of the API
    if (method === 'DELETE' || method === 'POST') { options.headers['Authorization'] = `Bearer ${token}`}

    const response = await fetch(url, options);
    if (response.ok === true){
        if (method === 'GET') {
            const data = await response.json()
            return data
            
        } else {
            return response
        }
    } else {
        alert("Impossible de communiquer avec l'API")
    }
}

const getCats = async () => {
    const cats = await fetchData('GET')
    const catsList = document.getElementById('cats-grid')
    for (cat of cats){
        const catDiv = document.createElement('div')
        catDiv.classList.add('cat-item')

        // Add cat image
        const catImgDiv = document.createElement('div')
        catImgDiv.classList.add('cat-item-img')
        const catImg = document.createElement('img')
        catImg.src = cat.url
        catImgDiv.appendChild(catImg)
        catDiv.appendChild(catImgDiv)

        // Add cat breed
        const catInfoDiv = document.createElement('div')
        catInfoDiv.classList.add('cat-item-info')
        const catBreed = document.createElement('p')
        catBreed.innerText = cat.breeds[0].name
        catInfoDiv.appendChild(catBreed)
        catDiv.appendChild(catInfoDiv)

        catsList.appendChild(catDiv)
    }
}

// Main function when the website is loading
async function init() {
    getCats()
}

// Call the function initProject() when the page is loading
window.addEventListener('load', init)