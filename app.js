// *Toggle Add form
const buttonShowForm = document.getElementById('button-show-form');
const buttonCloseModal = document.getElementById('close-modal');
const modalContainer = document.getElementById('modal-container');
const outerModal = document.getElementById('outer-modal');

// ? add Event Listener to open modal
buttonShowForm.addEventListener('click', openModal);

// ? add the function for open Modal
function openModal() {
  modalContainer.classList.remove('modal-hide');
  modalContainer.classList.add('modal-show');
}

// ? add Event Listener to close modal
buttonCloseModal.addEventListener('click', closeModal);

// ? add Event Listener to close modal for outer Modal
outerModal.addEventListener('click', closeModal);


// ? add the function for close Modal
function closeModal() {
  modalContainer.classList.add('modal-hide');
  modalContainer.classList.remove('modal-show');
}

// * *** ---------------- end toggle modal  --------------  ***


// * ***  ------- 👉 👌    ADD NOTE AND STORE IT     👉 👌 -------   ***

// ? ❤ ---- *** Constant For Elements  *** ----- ❤
const formAddNote = document.getElementById('form-add-note');
const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');
const containerBody = document.getElementById('container-body');
const numberOfTasks = document.getElementById('numberOfTasks');

// ? ❤ ---- *** HTML For Append in Note body  *** ----- ❤
const NewNote = (id, title, description, time) => {
  return `
   <div class="note-list" id="note-number-${id}" data-index-number="${id}">
        <div class="note-left">
          <!--  <div class="check-box checked-note" id="btn-check-${id}">
            <i class="fa fa-check"></i>
          </div> -->
            <!-- end of  check box -->
            <!--  checked-note-body    ,    un-checked-note-body     -->
            <div class="container-note un-checked-note-body">
                <h3 class="title-note ">${title}</h3>
                <p class="description-note ">${description}</p>
            </div>
            <!-- end of  container note -->
        </div>
        <!-- end of note left -->

        <div class="note-right">
            <div class="time-note">${time}</div>
            <div class="actions-note">
                <i class="fa fa-trash" id="btn-trash-${id}" data-index-number="${id}"></i>
                <!--                <i class="fa fa-edit"></i>-->
            </div>
        </div>
        <!-- end of note right -->
    </div>
  `;
}


// ? ❤ ---- *** Function to format date  *** ----- ❤
const formatDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let AMPM = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + AMPM;
}


// ? add Event Listener to submit form
formAddNote.addEventListener('submit', (event) => {
  event.preventDefault();


  // get input
  let title = formTitle.value.toString();
  let description = formDescription.value.toString();
  let timeOfNoting = formatDate(new Date());

  if (title.length && description.length) {
    // make input as object
    let objectFormInput = {
      id: Math.floor(Math.random() * 999),
      title,
      description,
      timeOfNoting
    };

    // save data to local storage
    SaveDataToLocalStorage(objectFormInput);

    loadNumberOfTasks(JSON.parse(localStorage.getItem('formNote')) || []);

    containerBody.innerHTML += NewNote(objectFormInput.id, title, description, timeOfNoting);
  } else {
    alert("sorry Enter title and description");
  }

  closeModal();
  formTitle.value = null;
  formDescription.value = null;
})

// ? ❤ ---- *** Function to Save Data To Local Storage  *** ----- ❤
const SaveDataToLocalStorage = (input) => {
  let data = [];
  // Parse the serialized data back into an array of objects
  data = JSON.parse(localStorage.getItem('formNote')) || [];

  // Push the new data (whether it be an object or anything else) onto the array
  data.push(input);

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('formNote', JSON.stringify(data));
  location.reload();
}


// * ***  ------- 👉 👌  ------  LOADING ------  👉 👌 -------   ***

// ? ❤ ---- *** Function load All Note  *** ----- ❤
const loadAllNote = (arrayOfNotes) => {
  arrayOfNotes.forEach(({id, title, description, timeOfNoting}) => {
    containerBody.innerHTML += NewNote(id, title, description, timeOfNoting);
  });
}

// ? ❤ ---- *** Function load Number Of Tasks  *** ----- ❤
const loadNumberOfTasks = (arrayOfNotes) => {
  numberOfTasks.innerHTML = `${arrayOfNotes.length} Tasks`;
}

// ? ❤ ---- *** RUN Function  loadAllNote *** ----- ❤
loadAllNote(JSON.parse(localStorage.getItem('formNote')) || []);


// * ***  ------- 👉 👌  ------  DELETE NOTE ------  👉 👌 -------   ***

// ? ❤ ---- ***  get element  *** ----- ❤
const buttonTrash = document.querySelectorAll('.fa-trash');

// ? ❤ ---- ***  forEach for delete note (for loop on button) *** ----- ❤
buttonTrash.forEach((note) => {
  note.addEventListener('click', () => {
    RemoveDataFromLocalStorage(note.dataset.indexNumber);
  });
  loadNumberOfTasks(JSON.parse(localStorage.getItem('formNote')) || []);
});


// ? ❤ ---- ***  functions for delete note *** ----- ❤
const RemoveDataFromLocalStorage = (indexNote) => {
  // Parse the serialized data back into an array of objects
  let data = JSON.parse(localStorage.getItem('formNote')) || [];

  let filter = data.filter((note) => {
    return note['id'] != indexNote;
  });

  containerBody.innerHTML = null;

  filter.forEach(({id, title, description, timeOfNoting}) => {
    containerBody.innerHTML += NewNote(id, title, description, timeOfNoting);
  });


  localStorage.removeItem('formNote');

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('formNote', JSON.stringify(filter));

  location.reload();
}


// ? ❤ ---- ***  get element  *** ----- ❤
const noteList = document.querySelectorAll('.container-note');

// ?  ***** -----  loop to effect for note to check ro not ----   *****
noteList.forEach((note) => {
  note.addEventListener('click', (event) => {
    if (event.target.parentElement.classList.contains('un-checked-note-body')) {
      AddClassCheck(event.target.parentElement, 'un-checked-note-body', 'checked-note-body');
    } else {
      AddClassCheck(event.target.parentElement, 'checked-note-body', 'un-checked-note-body');
    }

  });
});


// ?  ***** -----  Functions For Add Class and remove other class when check element ----   *****
const AddClassCheck = (Element, removeClass, addedClass) => {
  Element.classList.remove(removeClass);
  Element.classList.add(addedClass);
}


