class Producte {
    constructor(info = {}) {
        this.id = info.id;
        this.name = info.name;
        this.descriiption;
        this.tipus = info.tipus;
        this.allergens = info.allergens;
        this.price = info.price;
        this.calories = info.calories;
        this.img=info.img;
    }

    buildHTML(){}

}

export default Producte;