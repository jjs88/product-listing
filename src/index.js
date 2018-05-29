import './index.css';
import { generateNoteDOM, updateNumberOfNotesDOM, removeNoteFromDOM } from './noteDOM';
import Note from './note';
const notes = document.querySelector('.notes');
const noteForm = document.querySelector('.noteForm');
const inputNote = document.querySelector('[name="note"]');
const notesNum = document.querySelector('.notesNum');
import { addNote } from './noteDOM';
const note = new Note();


noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  note.addNote(inputNote.value);
  generateNoteDOM(notes, note.getLatestNote());
  updateNumberOfNotesDOM(notesNum, note.numberOfNotes());
  e.target.reset();
});

notes.addEventListener('click', (e) => {
  const removeNote = e.target.innerHTML === 'remove' && e.target.nodeName === 'BUTTON';
  //remove the note
  if(removeNote) {
    // remove from dom
    removeNoteFromDOM(e.target);
    //remove from note instance
    const noteText = e.target.parentNode.children[0].innerHTML;
    note.removeNote(noteText);
    // update number of notes #
    updateNumberOfNotesDOM(notesNum, note.numberOfNotes());
  }
});