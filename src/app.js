const pagesEl = document.querySelector('.pages')

const getPagesFromBackend = async () => {
    const res = await fetch('http://localhost:5000/pages')
    const data = await res.json()

    return data;
}

const addPagesToDom = async () => {
    const pages = await getPagesFromBackend();
    pages.forEach(page => {
        const div = document.createElement('div')
        div.className = 'page'
        div.innerHTML = `
            <h2>${page.title}</h2>
        `
        pagesEl.appendChild(div)
    })
}

addPagesToDom()