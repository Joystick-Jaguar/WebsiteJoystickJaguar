const hamburgerMenu = document.getElementById("hamburgermenu");

document.addEventListener("DOMContentLoaded", () => {
  hamburgerMenu.addEventListener("click", (event) => {
    if (event.target !== hamburgerMenu) return;
    closeModal()
  });
});

function openModal() {
  hamburgerMenu.showModal();
  document.body.classList.add('no-scroll');
}

function closeModal() {
  hamburgerMenu.close();
  document.body.classList.remove('no-scroll');
}
