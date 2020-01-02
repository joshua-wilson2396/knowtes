'use strict'

// let data

// const processData = () => {
//     data = '2934874598298'
// }

// processData()
// console.log(data)


let noteIdent = uuidv4()

//Read existing notes from localStorage
const getSavedNotes = () => {
const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }


}

//removeNote, onClick gets note by UUIDv4 call, removes it from the DOM
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate the DOM structure for a note
const genereateNoteDOM = (note) => {

    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

        //Setup the note title text
        if (note.title.length > 0) {
            textEl.textContent = note.title
        } else {
            textEl.textContent = 'Unnamed note'
        }
        textEl.classList.add('list-item__title')
        noteEl.appendChild(textEl)

        //Setup the Link
        noteEl.setAttribute('href', `/edit.html#${note.id}`)
        noteEl.classList.add('list-item')

        //Setup the status message
        statusEl.textContent = generateLastEdited(note.updatedAt)
        statusEl.classList.add('list-item__subtitle')
        noteEl.appendChild(statusEl)

        return noteEl
}

//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return - 1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0 
            }
        })
    } else if (sortBy === 'byCreated') {
       return notes.sort(function (a,b) {
            if (a.createdAt < b.createdAt) {
                return 1
            } else if (a.createdAt > b.createdAt) {
                return - 1
            } else {
                return 0
            }
       })
    } else if (sortBy === 'alpha') {
        return notes.sort(function (a,b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//Render application notes

const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => {
        let title = note.title.toLowerCase().includes(filters.searchText.toLowerCase());
        let body = note.body.toLowerCase().includes(filters.searchText.toLowerCase());
        return title || body;
    })

        notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach( (note) => { 
            const noteEl = genereateNoteDOM(note)
            notesEl.appendChild(noteEl);
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Add a note! :)'
        notesEl.appendChild(emptyMessage)
    }

   
}

//store notes in the local browser storage

let storeNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes))

//Generate the last edited message

const generateLastEdited = (timestamp) => `Last updated: ${moment(timestamp).fromNow()}`