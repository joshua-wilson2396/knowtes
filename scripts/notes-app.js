'use strict'

let notes = getSavedNotes();
const timestamp = moment().valueOf()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    notes.push({
        id: noteIdent,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    storeNotes(notes)
    location.assign(`/edit.html#${noteIdent}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})




