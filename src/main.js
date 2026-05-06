/*
  Здесь всего немного JavaScript.
  Если ты пока не уверен в JS, можешь просто не трогать этот файл.

  Что делает код:
  1. Открывает и закрывает мобильное меню.
  2. Закрывает меню после клика по ссылке.
*/

const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector(".site-nav");
const menuLinks = document.querySelectorAll(".site-nav a");

function closeMenu() {
  siteMenu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const menuIsOpen = siteMenu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
