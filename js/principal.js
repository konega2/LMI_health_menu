import Producte from "./producte.js";

export class Principal extends Producte {
    constructor(params = {}) {
        super(params);
        this.dietType = params.dietType;
    }

    buildHTML() {
        const imgUrl =
            !this.img || this.img === ""
                ? "assets/img/not_found.png"
                : `https://healthys-express-backend-production.up.railway.app/${this.img}`;

        const priceText = (this.price ?? "").toString();

        return `
    <div class="grid-item-card">
      <div class="grid-item-image">
        <img src="${imgUrl}" alt="Imatge del producte"
             onerror="this.onerror=null; this.src='assets/img/not_found.png';" />
      </div>

      <div class="grid-item-info">
        <div class="grid-item-header">
          <h2 class="grid-item-name">${this.name ?? ""}</h2>
          <span class="grid-item-price">${priceText}€</span>
        </div>

        <p class="grid-item-desc">${this.description ?? ""}</p>

        <div class="grid-item-meta">
          ${this.calories ? `<span>${this.calories} kcal</span>` : ""}
          ${Array.isArray(this.dietType) && this.dietType.length
                ? `<span>· ${this.dietType.join(" · ")}</span>`
                : ""
            }
        </div>

        ${Array.isArray(this.allergens) && this.allergens.length
                ? `<div class="grid-item-tags">
                 ${this.allergens
                    .map(a => `<span class="tag tag-allergen">${a}</span>`)
                    .join("")}
               </div>`
                : ""
            }

        <div class="carret-buttons">
          <button class="add-cart-button" onclick='afegirAlCarret(${JSON.stringify(this.id)}, ${JSON.stringify(this.name ?? "")}, ${JSON.stringify(this.price ?? 0)})'>
            +
          </button>
          <button class="remove-cart-button" onclick='treureDelCarret(${JSON.stringify(this.id)})'>
            -
          </button>
          <span class="carret-qty" data-producte-id=${JSON.stringify(this.id)}>(0)</span>
        </div>
      </div>
    </div>
  `;

    };
}
