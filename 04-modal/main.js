const cardButtons = document.querySelectorAll('.card button');
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

// displays a bigger version of the image
function handleButtonClick(e) {
    const button = e.currentTarget;
    const card = button.closest('.card');
    const imgSrc = card.querySelector('img').src;
    const desc = card.dataset.description;
    const name = card.querySelector('h2').textContent;
    // feed the image and desc into the modal
    modalInner.innerHTML = `
        <img width="600" height="600" src="${imgSrc.replace('200', '600')}" alt="${name}" />
        <p>${desc}</p>
    `;
    // show the modal
    modalOuter.classList.add('open');
}

cardButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function closeModal() {
    modalOuter.classList.remove('open');
}
modalOuter.addEventListener('click', (e) => {
    // e.target is the thing that got clicked on
    // closest will find in its sibling and up
    const isOutside = !e.target.closest('.modal-inner'); // so if it's clicking outside, it will return a value of null

    if (isOutside) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});