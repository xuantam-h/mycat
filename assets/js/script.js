const numberImg = 'limit=10'
const url = `https://api.thecatapi.com/v1/images/search?${numberImg}&api_key=live_ZgwncwSdE3fC6IJdLbVmw1a4H0NdqW7O4A6tZH0jimDg7fxO8rkwqGjxhSOnfknS`

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
    console.table(cats)
    const catsList = document.getElementById('cats-grid')
    for (cat of cats){
        const catDiv = document.createElement('div')
        catDiv.classList.add('cat-item')

        // Add cat image
        const catImg = document.createElement('img')
        catImg.src = cat.url
        catDiv.appendChild(catImg)

        // Add cat breed
        const catBreed = document.createElement('p')
        catBreed.innerText = cat.breeds['name']
        catDiv.appendChild(catBreed)

        catsList.appendChild(catDiv)
    }
}

// Main function when the website is loading
async function initProject() {
    getCats()
}

// Call the function initProject() when the page is loading
window.addEventListener('load', initProject)