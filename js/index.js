// Arranquem servidor amb:
// python3 -m http.server 8000

import { Entrant } from "./entrant.js";
import { Principal } from "./principal.js";
import { Beguda } from "./beguda.js";

//EL carrito de lo cojone
let carret = [];

function pintaQuantitat() {
  const textos = document.querySelectorAll(".carret-qty");

  for (let text of textos) {
    const idProducte = text.getAttribute('data-producte-id');
    let quantitat = 0;
    for (let article of carret) {
      if (String(article.id) === String(idProducte)) {
        quantitat++;
      }
    }
    text.textContent = `(${quantitat})`;
  }
}

function pintaCarret() {
  const llistaCarret = document.querySelector("#llista-carret");
  const totalCarret = document.querySelector("#carret-total");

  if (!llistaCarret || !totalCarret) {
    return;
  }

  if (carret.length === 0) {
    llistaCarret.innerHTML = "<li>Encara no has afegit cap producte.</li>";
    totalCarret.textContent = "0";
    return;
  }

  let html = "";
  let suma = 0;

  for (let article of carret) {
    html += `<li>${article.name} - ${article.price}€</li>`;
    suma += Number(article.price) || 0;
  }

  llistaCarret.innerHTML = html;
  totalCarret.textContent = suma.toFixed(2);
  pintaQuantitat();
}


//Funcion pa añdir las cosa al carro de lo cojone
window.afegirAlCarret = function (id, name, price) {
  carret.push({ id, name, price });
  pintaCarret();
};

//Funcion pa quitar las cosa al carro de lo cojone
window.treureDelCarret = function (id) {
  let posicio = -1;
  for (let i = 0; i < carret.length; i++) {
    if (carret[i].id === id) {
      posicio = i;
      break;
    }
  }

  if (posicio !== -1) {
    let nuevoCarret = [];
    for (let i = 0; i < carret.length; i++) {
      if (i !== posicio) {
        nuevoCarret.push(carret[i]);
      }
    }
    carret = nuevoCarret;
    pintaCarret();
  }
};

async function carregaEntrants() {
  try {
    const resposta = await fetch('https://healthys-express-backend-production.up.railway.app/api/entrants');
    const dades = await resposta.json(); // Convertim la resposta en JSON
    let entrants = [];
    for (let item of dades) {
      // Convertim l'item a entrant
      entrants.push(new Entrant(item));
    }

    creaGrid(entrants, "#entrants");
  } catch (error) {
    console.error("S'ha produït un error:", error);
  }
}

async function carregaPrincipals() {
  try {
    const resposta = await fetch('https://healthys-express-backend-production.up.railway.app/api/principals');
    const dades = await resposta.json();
    let principals = [];
    for (let item of dades) {
      principals.push(new Principal(item));
    }

    creaGrid(principals, "#principals");
  } catch (error) {
    console.error("S'ha produït un error:", error);
  }
}



async function carregaBegudes() {
  try {
    const resposta = await fetch('https://healthys-express-backend-production.up.railway.app/api/begudes');
    const dades = await resposta.json();
    let begudes = [];
    for (let item of dades) {
      begudes.push(new Beguda(item));
    }

    creaGrid(begudes, "#begudes");
  } catch (error) {
    console.error("S'ha produït un error:", error);
  }
}


function creaGrid(items, contenidor) {
  let containerItems = document.querySelector(contenidor);
  for (let item of items) {
    let itemGrid = item.buildHTML();
    containerItems.innerHTML += itemGrid;
  }

  pintaQuantitat();
}


function initTabs() {
  // Funció per inicialitzar les pestanyes
  // Aci no cal tocar res
  const buttons = document.querySelectorAll('.tabs button')
  const sections = document.querySelectorAll('.section')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.target

      buttons.forEach(b => b.classList.remove('active'))
      button.classList.add('active')

      sections.forEach(section => {
        section.classList.toggle(
          'hidden',
          section.id !== target
        )
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs()
  carregaEntrants()
  carregaPrincipals()
  carregaBegudes()
  pintaCarret()
})
