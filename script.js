document.addEventListener("DOMContentLoaded", function () {
  //mobile menu
  const mobileOpen = document.querySelector(".btn__open");
  const mobileClose = document.querySelector(".btn__close");
  const mobileMenu = document.querySelector(".header__nav");
  const overlay = document.querySelector(".overlay");

  const mobileResponsive = window.matchMedia("(max-width: 47.5em)");

  function mobileSize(e) {
    if (e.matches) {
      mobileMenu.classList.add("menuClosed");
    } else {
      mobileMenu.classList.remove("menuClosed", "open");
      overlay.classList.add("noOverlay");
      document.body.classList.remove("no-scroll");
      mobileOpen.classList.remove("inactive");
    }
  }

  mobileResponsive.addEventListener("change", mobileSize);

  mobileSize(mobileResponsive);

  function toggleMobileMenu() {
    mobileOpen.classList.add("inactive");
    document.body.classList.add("no-scroll");
    overlay.classList.remove("noOverlay");
    mobileMenu.classList.remove("menuClosed");
    mobileMenu.classList.add("open");
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("menuClosed");
    mobileOpen.classList.remove("inactive");
    overlay.classList.add("noOverlay");
    document.body.classList.remove("no-scroll");

    mobileMenu.addEventListener("transitionend", function backToDefault() {
      mobileMenu.classList.remove("open");
      mobileMenu.removeEventListener("transitionend", backToDefault);
    });
  }

  mobileOpen.addEventListener("click", toggleMobileMenu);
  mobileClose.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  // sections tab
  const menuOptions = document.querySelectorAll(".menu__item");
  const sections = document.querySelectorAll("section");

  console.log(sections);

  menuOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      // all the sections will turn off
      sections.forEach((section) => {
        section.classList.add("sectionOFF");
        section.classList.remove("selected");
      });
      // the section that go with the index will turn on
      sections[index].classList.remove("sectionOFF");
      sections[index].classList.add("selected");
      menuOptions.forEach((option) => {
        option.classList.remove("navOn");
      });
      option.classList.add("navOn");

      logoState(index);
      if (mobileMenu.classList.contains("open")) {
        closeMobileMenu();
      }
    });
  });

  // home buttons

  const logo = document.querySelector(".header__logo");
  const btnExplore = document.querySelector(".main__explore");

  logo.addEventListener("click", () => {
    if (logo.classList.contains("clickable")) {
      menuOptions[0].click(); // activates the logic that home already has (navOn)
    }
  });

  btnExplore.addEventListener("click", () => {
    menuOptions[1].click(); // activates the logic that destination already has (navOn)
  });

  function logoState(index) {
    if (index === 0) {
      // if we´re at home the clic won't work
      logo.classList.remove("clickable");
    } else {
      // if we aren't, it will work
      logo.classList.add("clickable");
    }
  }

  logoState(0);

  //destination fetch json
  const dName = document.querySelector(".d__name");
  const dDescription = document.querySelector(".d__description");
  const dDistance = document.querySelector(".d__distance");
  const dTravel = document.querySelector(".d__travel");
  const dImg = document.querySelector(".d__img");
  const dTabs = document.querySelectorAll(".d__tab");

  let destinationsData = []; // se inicia la lista vacia para después llenarla con la info de JSON (inicializar la variable)

  async function loadData() {
    // función asíncrona permite que el código espere a que los datos lleguen sin trabar la página
    const response = await fetch("starter-code/data.json"); // await hace que la variable no guarde nada hasta que fetch regrese con la info. El primer await trae la respuesta del servidor
    const data = await response.json(); // El segundo await convierte el cuerpo de esa respuesta a algo legible para js.
    // response: Es la respuesta del servidor.
    // data: Es la transformación de esa respuesta en algo que JS pueda usar (objetos y listas).
    // Se le llama "Parsing" (analizar y convertir datos).

    destinationsData = data.destinations;
    crewData = data.crew;
    techData = data.technology;

    // the default info DESTINATION
    updateDestination(0);
    renderTabs();

    // the default info CREW
    updateCrew(0);
    renderDots();

    // the default info TECHNOLOGY
    updateTech(0);
    renderBtns();
  }

  loadData();

  function updateDestination(index) {
    // el index representa en que boton hizo clic el usuario 0, 1, 2
    const destination = destinationsData[index]; // Se crea una "referencia Local", o sea, un const destination para simplificar el acceso a la información del objeto actual
    // El index es el parámetro que permite saber qué planeta mostrar según el clic del usuario
    // se actualiza el DOM

    dImg.style.backgroundImage = `url(${destination.images.webp})`; // se usa Template Literals, es basicamente el sustituto de + para agregar el valor de una variable
    // `${}` . String Interpolation es meter la info en la variable

    dName.textContent = destination.name;
    dDescription.textContent = destination.description;
    dDistance.textContent = destination.distance;
    dTravel.textContent = destination.travel;
  }

  function renderTabs() {
    dTabs.forEach((tab, index) => {
      // Se hace un mapeo, se vincula un elemento visual (tab) con un dato del JSON usando su posición en la lista (index).
      // create the name list
      tab.textContent = destinationsData[index].name;
      tab.addEventListener("click", () => {
        dTabs.forEach((tab) => {
          tab.classList.remove("planetOn");
        });
        tab.classList.add("planetOn");
        updateDestination(index);
      });
    });
  }

  //crew fetch json
  const cName = document.querySelector(".c__name");
  const cRole = document.querySelector(".c__role");
  const cBio = document.querySelector(".c__description");
  const cImg = document.querySelector(".c__img");
  const cDots = document.querySelectorAll(".c__dot");

  let crewData = []; // se inicia la lista vacia para después llenarla con la info de JSON (inicializar la variable)

  function updateCrew(index) {
    const crew = crewData[index];

    cImg.style.backgroundImage = `url(${crew.images.webp})`;

    cName.textContent = crew.name;
    cBio.textContent = crew.bio;
    cRole.textContent = crew.role;
  }

  function renderDots() {
    cDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        cDots.forEach((dot) => {
          dot.classList.remove("onBtn");
        });
        dot.classList.add("onBtn");
        updateCrew(index);
      });
    });
  }

  //tech fetch json
  const tName = document.querySelector(".t__name");
  const tDescription = document.querySelector(".t__description");
  const tImg = document.querySelector(".t__img");
  const tBtn = document.querySelectorAll(".t__btn");

  const desktopMediaQuery = window.matchMedia("(min-width: 69.5em)");

  let techData = []; // se inicia la lista vacia para después llenarla con la info de JSON (inicializar la variable)
  let currentSize = 0;

  function updateTech(index) {
    currentSize = index; //guarda la posicion de la "diapositiva" en la que se encuentra el usuario en caso de que volteé la pantalla siga en la misma "diapositiva"
    // La variable currentSize actúa como un ancla. Sin ella, el diseño responsivo perdería la sincronía con la interacción del usuario
    const tech = techData[index];

    tName.textContent = tech.name;
    tDescription.textContent = tech.description;

    sizeChange(tech); //se manda la informacion de la const tech a la funcion sizeChange
  }

  function sizeChange(tech) {
    // con los datos de la posicion del usuario en tech se checa que coincida la medida
    if (desktopMediaQuery.matches) {
      tImg.style.backgroundImage = `url(${tech.images.portrait})`;
    } else {
      tImg.style.backgroundImage = `url(${tech.images.landscape})`;
    }
  }

  desktopMediaQuery.addEventListener("change", () => {
    // el comando "change" detecta si hay algun cambio en el match de tabletMediaQuery
    const currentTech = techData[currentSize]; // techData recibe la informacion de la posicion del usuario
    sizeChange(currentTech);
  });

  function renderBtns() {
    tBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        tBtn.forEach((btn) => {
          btn.classList.remove("onBtn");
        });
        btn.classList.add("onBtn");
        updateTech(index);
      });
    });
  }
});
