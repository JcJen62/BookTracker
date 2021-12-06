

async function FetchBooksRead() {
    let bookRead = {}

    await fetch(`/api/booksRead`)
        .then(response => response.json())
        .then(data => bookRead = data);
    return bookRead
}

async function FetchBooksToRead() {
    let bookToRead = {}

    await fetch(`/api/booksToRead`)
        .then(response => response.json())
        .then(data => bookToRead = data);
    return bookToRead
}

async function search(term) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    let result = []
    await fetch(`https://openlibrary.org/search.json?q=${encodeURI(term)}`, requestOptions)
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
    let results = await search(searchTerm)
    if (results.docs.length === 0) {
        return
    }
    updateList(results.docs)
})

let readBooks = document.querySelector("#addToFinished")
readBooks.addEventListener("click", () => {
    let checked = document.querySelectorAll(".form-check-input")

    checked.forEach(element => {
        if (element.checked) {
            const addBooks = async (data) => {
                const response = await fetch(`api/booksReadAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            addBooks({ "id": element.id, "name": element.name, "rating": 0 })
        }

    })

    document.querySelector("#myBooks").innerHTML = ""
    displayReadBooks()
})

let toReadBooks = document.querySelector("#addToRead")
toReadBooks.addEventListener("click", () => {
    let checked = document.querySelectorAll(".form-check-input")

    checked.forEach(element => {
        if (element.checked) {
            const addBooksToRead = async (data) => {
                const response = await fetch(`api/booksToReadAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            addBooksToRead({ "id": element.id, "name": element.name })
        }
    })

    document.querySelector("#futureBooks").innerHTML = ""
    displayFutureBooks()
})

async function displayReadBooks() {
    let bookRead = await FetchBooksRead();

    bookRead.forEach(element => {
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

            let book = {
                "id": event.currentTarget.id,
                "rating": newRating
            }

            const updateRating = async (data) => {
                const response = await fetch(`api/booksReadEdit`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            updateRating(book)

            document.querySelector("#myBooks").innerHTML = ""
            displayReadBooks()
        })
    });
}

async function displayFutureBooks() {
    let bookToRead = await FetchBooksToRead();

    bookToRead.forEach(element => {
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
    for (let i = 0; i < 30; i++) {
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

displayFutureBooks()
displayReadBooks()