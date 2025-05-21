function openMenu() {
  const menuButton = document.getElementById("menubutton");
  const menu = document.getElementById("menu");

  if (menu.classList.contains("closed")) {
    menu.classList.remove("closed");
    menu.classList.add("open");
    menuButton.classList.add("white");
    menuButton.classList.remove("black");

  } else {
    menu.classList.remove("open");
    menu.classList.add("closed");
    menuButton.classList.add("black");
    menuButton.classList.remove("white");
  }
}