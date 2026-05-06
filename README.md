
## Cómo va

Cuando entras a la web, index.js es el archivo principal. Ese archivo carga los productos, pinta las pestañas y controla el carrito.

Lo que más se usa en el proyecto es esto:

- Clases: para guardar la información de cada producto.
- Herencia: para que entrantes, principales y bebidas hereden de una clase común.
- DOM: para buscar elementos de la página y cambiar lo que se ve.
- Fetch: para traer los datos desde el backend.
- Arrays: para guardar los productos y el carrito.
- Funciones: para repetir acciones como pintar el carrito o cargar los platos.
- Eventos: para detectar cuando pulsas una pestaña o un botón como el de + y -.
- Template strings: para crear el HTML de cada tarjeta sin escribirlo a mano.

## Los archivos JS

### index.js
Es el más importante. Se encarga de cargar los datos, cambiar de pestaña y guardar el carrito.

Funciones que gasta:

- pintaCarret() para enseñar el carrito.
- pintaQuantitat() para enseñar cuántas veces aparece cada producto.
- carregaEntrants(), carregaPrincipals() y carregaBegudes() para cargar los platos y su informacion.
- creaGrid() para poner las tarjetas de los platos.

### producte.js
Aquí están los datos normales de un producto.

Guarda cosas como el nombre, el precio, las calorías y la imagen.

### entrant.js
Sirve para los entrantes.

Usa la clase base y le añade lo que necesita para que salga en la web.

### principal.js
Sirve para los platos principales.

Funciona parecido a entrant.js, pero para otra categoría.

### beguda.js
Sirve para las bebidas.

Es practicamente como los 2 anteriores

## Carrito

El carrito funciona con  + y -

- + añade un producto al carrito.
- - quita un producto del carrito.

También se va actualizando el total.

El carrito está guardado en un array dentro de index.js y cada vez que cambias algo se vuelve a añadir en pantalla.

Para quitar un producto se recorre el array y se busca el que tiene el mismo id.

Para mostrar la cantidad de cada producto también se comprueba cuántas veces aparece en el array.

## Datos

Los productos se cargan desde un backend con fetch.

Las rutas que usa son estas:

api/entrants
api/principals
api/begudes


