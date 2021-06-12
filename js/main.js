/* ================================================MENU SHOW Y HIDDEN============================================= */

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// **************************  Menu Show  *************************/
// Validate if constant exists //
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// **************************  Menu Hidden  *************************/

if (navClose) {
  navClose.addEventListener("click", () => {
    console.log("yes");
    navMenu.classList.remove("show-menu");
  });
}

// **************************  Menu Hidden  *************************/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  var navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));
