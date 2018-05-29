import { addToNotes, getNumberOfNotes } from './noteDOM';

class Note {
  constructor() {
    this.notes = [];
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(note) {
    const notes = this.notes.filter(item => item !== note);
    //deep copy
    this.notes = [...notes];
  }
  
  getLatestNote() {
    return this.notes[this.notes.length-1];
  }

  numberOfNotes() {
    return this.notes.length;
  }
}

export default Note;