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