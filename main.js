let booksRead = [
    {
        "id": "test",
        "name": "Cooking 101",
        "rating": 5
    }
]
let booksToRead = [
    {
        "id": "test",
        "name": "Cooking for Pros"
    }
]

async function search(term) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    let result = []
    await fetch(`http://openlibrary.org/search.json?q=${encodeURI(term)}`, requestOptions)
        .then(response => response.text())
        .then(res => {
            result = JSON.parse(res)
        })
        .catch(error => console.log('error', error));

    return result
}

let searchButton = document.querySelector("#searchInput")
searchButton.addEventListener("click", async () => {
    let searchTerm = document.querySelector("#searchBar").value
    if (searchTerm === "") {
        return
    }
    let results =  await search(searchTerm)
    if (results.docs.length === 0) {
        return
    }
    updateList(results.docs)
})

let readBooks = document.querySelector("#addToFinished")
readBooks.addEventListener("click", () => {
    let checked = document.querySelectorAll(".form-check-input")
    
    checked.forEach(element => {
        if (element.checked){
            booksRead.push({"id": element.id, "name": element.name, "rating": 0})
        } 
    })

    document.querySelector("#myBooks").innerHTML = ""
    displayReadBooks(booksRead)
})

let toReadBooks = document.querySelector("#addToRead")
toReadBooks.addEventListener("click", () => {
    let checked = document.querySelectorAll(".form-check-input")
    
    checked.forEach(element => {
        if (element.checked){
            booksToRead.push({"id": element.id, "name": element.name})
        } 
    })

    document.querySelector("#futureBooks").innerHTML = ""
    displayFutureBooks(booksToRead)
})

function displayReadBooks(arr){
    arr.forEach(element => {
        const itemDiv = document.createElement("li");
        itemDiv.classList.add("item-div");

        const item = document.createElement("p");
        item.setAttribute('id', 'bookText')
        item.appendChild(document.createTextNode(`${element.name} - Rating: ${element.rating}`));
        itemDiv.appendChild(item);

        const rating = document.createElement("input")
        rating.type = "text"
        rating.classList.add("form-control")
        rating.classList.add("rating")
        rating.setAttribute("id", `rating-${element.id}`)
        itemDiv.appendChild(rating)

        const subRating = document.createElement("button")
        subRating.classList.add("btn")
        subRating.classList.add("btn-outline-primary")
        subRating.classList.add("submit")
        subRating.setAttribute("id", `${element.id}`)
        subRating.type = "button"
        subRating.innerHTML = "Submit Rating"
        
        itemDiv.appendChild(subRating)

        let list = document.querySelector("#myBooks");
        list.appendChild(itemDiv);

        subRating.addEventListener("click", (event) => {
            const ratingId = `rating-${event.currentTarget.id}`
            const ratingElm = document.getElementById(ratingId)

            let newRating = parseInt(ratingElm.value)

            let book = booksRead.find(element => element.id === event.currentTarget.id)
            book.rating = newRating

            document.querySelector("#myBooks").innerHTML = ""
            displayReadBooks(booksRead)
        })
    });
}

function displayFutureBooks(arr){
    arr.forEach(element => {
        const itemDiv = document.createElement("li");
        itemDiv.classList.add("item-div");

        const item = document.createElement("p");
        item.appendChild(document.createTextNode(`${element.name}`));
        itemDiv.appendChild(item);

        let list = document.querySelector("#futureBooks");
        list.appendChild(itemDiv);
    });
}

function updateList(arr) {
    let filteredArr = arr.filter(x => x.type === 'work')
    for(let i = 0; i < 30; i++){
        let element = filteredArr[i]
        const itemDiv = document.createElement("li");
        itemDiv.classList.add("item-div");

        // Creates input for checkmark and appends to item-div
        const itemCheckmark = document.createElement("input");
        itemCheckmark.classList.add("form-check-input");
        itemCheckmark.type = "checkbox";
        itemCheckmark.setAttribute("id", `${element.key}`);
        itemCheckmark.setAttribute("name", `${element.title}`)
        itemDiv.appendChild(itemCheckmark);

        // Creates p for item and appends to item-div
        const item = document.createElement("p");
        item.appendChild(document.createTextNode(`${element.title}`));
        itemDiv.appendChild(item);

        // Append itemDiv to list
        let list = document.querySelector("#searchItems");
        list.appendChild(itemDiv);
    }
}

displayFutureBooks(booksToRead)
displayReadBooks(booksRead)