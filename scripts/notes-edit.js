'use strict'

const getNoteTitle = document.querySelector('#note-title')
const getNoteBody = document.querySelector('#note-body')
const removeNoteElement = document.querySelector('#remove-note')
const lastUpdated = document.getElementById('last-updated')
let notes = getSavedNotes()
let noteID = location.hash.substring(1)
let note = notes.find( (note) => note.id === noteID)

if (!note) {
    location.assign('/index.html')
}


//read and write using .value
getNoteTitle.value = note.title
getNoteBody.value = note.body
lastUpdated.textContent = generateLastEdited(note.updatedAt)


getNoteTitle.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    lastUpdated.textContent = generateLastEdited(note.updatedAt)
    storeNotes(notes)
})

getNoteBody.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    lastUpdated.textContent = generateLastEdited(note.updatedAt)
    storeNotes(notes)
})

removeNoteElement.addEventListener('click', (e) => {
    removeNote(note.id)
    storeNotes(notes)
    location.assign('/index.html')
})


const home = document.querySelector('#home')
home.addEventListener('click', () => location.assign('/index.html'))

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteID)
        
        if (!note) {
            location.assign('/index.html')
        }
        
        
        
        //read and write using .value
        getNoteTitle.value = note.title
        getNoteBody.value = note.body
        lastUpdated.textContent = generateLastEdited(note.updatedAt)
    }
    
})



