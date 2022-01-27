// start app project
console.log('start projects');


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


// *** * ------------- Add note and store it ------------------ * ***
const formAddNote = document.getElementById('form-add-note');
const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');
const containerBody = document.getElementById('container-body');
const numberOfTasks = document.getElementById('numberOfTasks');

// what add ;
const NewNote = (id, title, description, time) => {
  return `
   <div class="note-list" id="note-number-${id}">
        <div class="note-left">
            <div class="check-box checked-note" id="btn-check-${id}">
                <i class="fa fa-check"></i>
            </div>
            <!-- end of  check box -->
            <div class="container-note checked-note-body">
                <h3 class="title-note">${title}</h3>
                <p class="description-note">${description}</p>
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

// function to format date
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

    containerBody.innerHTML += NewNote(id, title, description, timeOfNoting);
  } else {
    alert("sorry Enter title and description");
  }

  closeModal();
  formTitle.value = null;
  formDescription.value = null;
})


const SaveDataToLocalStorage = (input) => {
  let data = [];
  // Parse the serialized data back into an array of objects
  data = JSON.parse(localStorage.getItem('formNote')) || [];

  // Push the new data (whether it be an object or anything else) onto the array
  data.push(input);

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('formNote', JSON.stringify(data));
}


// Load all notes
const loadAllNote = (arrayOfNotes) => {
  arrayOfNotes.forEach(({id, title, description, timeOfNoting}) => {
    containerBody.innerHTML += NewNote(id, title, description, timeOfNoting);
  });
}

const loadNumberOfTasks = (arrayOfNotes) => {
  numberOfTasks.innerHTML = `${arrayOfNotes.length} Tasks`;
}

loadAllNote(JSON.parse(localStorage.getItem('formNote')) || []);


// delete note

const buttonTrash = document.querySelectorAll('.fa-trash');


buttonTrash.forEach((e) => {
  e.addEventListener('click', (event) => {
    console.log(e.dataset.indexNumber)
  })
})
