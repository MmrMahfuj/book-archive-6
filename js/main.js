
const bookContainer = document.getElementById('book-container');

// fetch data loaded 
const searchTeam = () => {
    document.getElementById('empty-error').classList.add('d-none');
    bookContainer.textContent = '';
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('error').classList.add('d-none');

    const searchText = document.getElementById('search-field').value;
    if (searchText === '') {
        emptySearch();
    }
    else {
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => dataFilter(data.docs))
    }
}


// display data 
const dataFilter = (allData) => {
    document.getElementById('search-field').value = '';
    console.log(allData);


    if (allData.length === 0) {
        document.getElementById('error').classList.remove('d-none');
        document.getElementById('spinner').classList.add('d-none');
    }
    else {

        //  data filtering 
        const allBooks = allData.filter(allData => allData.cover_i !== undefined && allData.first_publish_year !== undefined && allData.title !== undefined && allData.author_name !== undefined && allData.publisher !== undefined && allData.publish_date !== undefined)

        console.log(allBooks);
        if (allBooks.length === 0) {
            document.getElementById('error').classList.remove('d-none');
            document.getElementById('spinner').classList.add('d-none');
        }
        else {
            // clean 
            document.getElementById('result-numbers').innerText = '';

            // result count 
            document.getElementById('result-numbers').innerText = `Fount your result:- ${allBooks.length} Books`;

            displaybooks(allBooks);
        }
    }

}

const displaybooks = (allBooks) => {



    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = ` 
        <div class="card h-100 shadow">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title}</h5>
                <p class="card-text">Author: ${book.author_name}</p>
                <p class="card-text">First Publisher: ${book.publish_date[0]}</p>
                <p class="card-text">publisher: ${book.publisher}</p>
                <p class="card-text">first publisher year: ${book.first_publish_year}</p>
                
            </div>
        </div>    
        `;
        bookContainer.appendChild(div);
        document.getElementById('spinner').classList.add('d-none');
    })
}


const emptySearch = () => {
    document.getElementById('empty-error').classList.remove('d-none');
    document.getElementById('spinner').classList.add('d-none');
}