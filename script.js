const app = () => {
    let bookShelf = [];

    function inputData(t) {
        t.preventDefault();
        const input = {
            bt: document.getElementById('bookTitle'),
            ba: document.getElementById('bookAuthor'),
            by: document.getElementById('bookYear'),
            bic: document.getElementById('bookIsComplete')
        },
        data = {
            id: +new Date,
            title: input.bt.value,
            author: input.ba.value,
            year: input.by.value,
            isComplete: input.bic.checked
        };
        bookShelf.push(data), document.dispatchEvent(new Event('bookChanged'))
    }

    function searchTitle(t) {
        t.preventDefault();
        const input = document.getElementById('searchBookTitle');
        query = input.value,query?data(bookShelf.filter(((bookShelf) => {
            return bookShelf.title.toLowerCase().includes(query.toLowerCase())
        }))):data(bookShelf)
    }

    function author(t) {
        const bt = Number(t.target.id),
        ba = bookShelf.findIndex(((bookShelf) => {
            return bookShelf.id === bt
        }));
        -1!==ba&&(bookShelf[ba]={...bookShelf[ba],isComplete:!0},document.dispatchEvent(new Event('bookChanged')))
    }

    function year(t) {
        const bt = Number(t.target.id),
        ba = bookShelf.findIndex(((bookShelf) => {
            return bookShelf.id === bt
        }));
        -1!==ba&&(bookShelf[ba]={...bookShelf[ba],isComplete:!1},document.dispatchEvent(new Event('bookChanged')))
    }

    function bookIsComplete(t) {
        const bt = Number(t.target.id),
        ba = bookShelf.findIndex(((bookShelf) => {
            return bookShelf.id === bt
        }));
        -1!==ba&&(bookShelf.splice(ba,1),document.dispatchEvent(new Event('bookChanged')))
    }

    function data(bookShelf) {
        const incomplete = document.getElementById('incompleteBookshelfList'),
        complete = document.getElementById('completeBookshelfList');
        incomplete.innerHTML = '', complete.innerHTML = '';
        for (const data of bookShelf) {
            const bookShelf = document.createElement('article');
            bookShelf.classList.add('book_item');
            const a = document.createElement('h3');
            a.innerText = data.title;
            const u = document.createElement('p');
            u.innerText = 'Author: ' + data.author;
            const r = document.createElement('p');
            if (r.innerText = 'Year: ' + data.year, bookShelf.appendChild(a), bookShelf.appendChild(u), bookShelf.appendChild(r), data.isComplete) {
                const incomplete = document.createElement('div');
                incomplete.classList.add('action');
                const o = document.createElement('button');
                o.id = data.id, o.innerText = 'Repeat again', o.classList.add('yellow'), o.addEventListener('click', year);
                const a = document.createElement('button');
                a.id = data.id, a.innerText = 'Remove from shelf', a.classList.add('orange'), a.addEventListener('click', bookIsComplete), incomplete.appendChild(o), incomplete.appendChild(a), bookShelf.appendChild(incomplete), complete.appendChild(bookShelf);
            } else {
                const complete = document.createElement('div');
                complete.classList.add('action');
                const d = document.createElement('button');
                d.id = data.id, d.innerText = 'Mark as complete', d.classList.add('yellow'), d.addEventListener('click', author);
                const a = document.createElement('button');
                a.id = data.id, a.innerText = 'Remove from shelf', a.classList.add('orange'), a.addEventListener('click', bookIsComplete), complete.appendChild(d), complete.appendChild(a), bookShelf.appendChild(complete), incomplete.appendChild(bookShelf);
            }
        }
    }

    function a() {
        !function(bookShelf) {
            localStorage.setItem('books', JSON.stringify(bookShelf))
        }(bookShelf), data(bookShelf)
    }

    window.addEventListener('load', () => {
        bookShelf = JSON.parse(localStorage.getItem('books')) || [], data(bookShelf);
        const input = document.getElementById('inputBook'),
        search = document.getElementById('searchBook');
        input.addEventListener('submit', inputData), search.addEventListener('submit', searchTitle), document.addEventListener('bookChanged', a);
    })
}