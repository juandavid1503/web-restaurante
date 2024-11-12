// Lista de productos con enlaces de imágenes
const products = [
    { id: 1, name: 'Hamburguesa isleña', price: 15000, image: 'images/hamburguesa-isleña.jpg' },
    { id: 2, name: 'Hamburguesa costeña', price: 15000, image: 'images/hamburguesa-costeña.jpg' },
    { id: 3, name: 'Hamburguesa gaucha', price: 12000, image: 'images/hamburguesa-gaucha.jpg' },
    { id: 4, name: 'Hamburguesa doble carne', price: 20000, image: 'images/hamburguesa-doble-carne.jpg' },
    { id: 5, name: 'Choripan', price: 10000, image: 'images/choripan.jpg' },
    { id: 6, name: 'Coca cola', price: 4000, image: 'images/coca-cola.jpg' },
    { id: 7, name: 'Sprite', price: 4000, image: 'images/sprite.jpg' },
    { id: 8, name: 'Corona', price: 7000, image: 'images/corona.jpg' },
    { id: 9, name: 'Francesa', price: 4000, image: 'images/francesa.jpg' },
    { id: 10, name: 'Casco', price: 4000, image: 'images/casco.jpg' },
];

let cart = [];

// Renderiza la lista de productos con imágenes
const productList = document.getElementById('product-list');
products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('product');
    productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100px; height:auto; border-radius: 8px;">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
    `;
    productList.appendChild(productEl);
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
}

function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    alert('¡Pago éxitoso!');
    cart = [];
    renderCart();
}

// Cambia entre las páginas de productos y carrito
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
