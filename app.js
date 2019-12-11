// data
let usersNote = (function () {
  return {
    getValues: function () {
      return {
        titleValue: document.getElementById("new-note__title").value,
        textValue: document.getElementById("new-note__text").value
      };
    }
  };
})();

// UI

let UIcontroller = (function () {
  return {
    getElements: function () {
      return {
        createNote: document.querySelector(".add-note__btn"),
        showNote: document.getElementById("note-create"),
        hideNote: document.querySelector(".note-create__delete"),
        getNote: document.querySelector(".note-create__confirm"),
        allNotes: document.querySelector(".notes-grid"),
        deleteBtn: document.querySelector(".note__delete-btn"),
        deleteIcon: document.querySelector(".note__delete-icon")
      };
    }
  };
})();

// controller

let controller = (function (UNote, UIctrl) {
  let DOM = UIctrl.getElements();

  const concealNote = function () {
    DOM.showNote.style.display = "none";
  };
  let addNote = function () {
    let values = UNote.getValues();

    if (values.titleValue == "" || values.textValue == "") {
      alert("You should input title and description");
    } else {
      newNote(values.titleValue, values.textValue);
      concealNote();
    }
  };

  DOM.createNote.addEventListener("click", function () {
    DOM.showNote.style.display = "block";
  });

  DOM.hideNote.addEventListener("click", concealNote);
  document.addEventListener("keydown", function (e) {
    if (DOM.showNote.style.display == "block") {
      if (e.keyCode === 27 || e.which === 27) {
        concealNote();
      }
    }
  });

  function openNote() {
    document.querySelector(".note").classList.toggle("open");
  }
  newNote = function (title, text) {
    let addNote = document.createElement("div");
    DOM.allNotes.appendChild(addNote);
    addNote.classList.add("note");
    addNote.onclick = openNote;
    let newNoteTitle = document.createElement("h1");
    addNote.appendChild(newNoteTitle);
    newNoteTitle.classList.add("note__title");
    newNoteTitle.innerHTML += title;

    let newNoteText = document.createElement("p");
    addNote.appendChild(newNoteText);
    newNoteText.classList.add("note__text");
    newNoteText.innerHTML += text;

    let deleteBtn = document.createElement("button");
    let deleteIcon = document.createElement("ion-icon");
    addNote.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.classList.add("note__delete-btn");
    deleteIcon.setAttribute("name", "trash");
    deleteIcon.classList.add("note__delete-icon");

  };

  DOM.getNote.addEventListener("click", () => {
    concealNote();
    addNote();
    openNote();
  });
  document.addEventListener("keydown", e => {
    if (DOM.showNote.style.display == "block") {
      if (e.keyCode === 13 && e.ctrlKey) {
        concealNote();
        addNote();
      }
    }
  });

})(usersNote, UIcontroller);