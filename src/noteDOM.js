export const generateNoteDOM = (selector, value) => {
  const temp = `<div class="note">
    <span class="note-text">${value}</span>
    <button>remove</button>
  </div>`;
  selector.innerHTML += temp;
};


export const updateNumberOfNotesDOM = (selector, num) => {
  const temp = `
    <h3>${num > 0 ? `There are ${num} notes left`: "No notes"}</h3>
  `; 
  selector.innerHTML = temp;
}

export const removeNoteFromDOM = (selector, note) => {
  const removeNote = selector.parentNode;
  const noteText = removeNote.children[0].innerHTML;
  const notes = removeNote.parentNode;
  notes.removeChild(removeNote);
}