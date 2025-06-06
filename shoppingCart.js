const URL = "https://my-json-server.typicode.com/prataprohit007/shopping-cart/categories";
const categoryContainer = document.querySelector('.category-container');
const itemsContainer = document.querySelector('.items');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');

let data = [];
let cart = {};


async function getData() {
    const response = await fetch(URL);
    data = await response.json();
    console.log(data);

    // Show category tabs
    data.forEach((category, index) => {
        const tab = document.createElement('div');
        tab.className = 'category-tab';
        tab.textContent = `${category.name} (${category.products.length})`;
        tab.addEventListener('click', () => showProducts(index));
        categoryContainer.appendChild(tab);
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.style.borderBottom = 'none';
            });
            e.target.style.borderBottom = '2px solid black';
        });

    });

    // Initially show first category
    showProducts(0);
}

function showProducts(categoryIndex) {
    const products = data[categoryIndex].products;
    itemsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <p>${product.name}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button>Add to cart</button>
        `;

        card.querySelector('button').addEventListener('click', () => {
            addToCart(product);
        });

        itemsContainer.appendChild(card);
    });
}

function addToCart(product) {
    const key = product.name;

    if (!cart[key]) {
        cart[key] = {
            ...product,
            quantity: 1
        };
    } else {
        cart[key].quantity += 1;
    }

    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    for (const key in cart) {
        const item = cart[key];
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeItem('${item.name}')">x</button>
        `;
        cartItemsContainer.appendChild(div);
    }

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(name) {
    if (cart[name]) {
        delete cart[name];
        updateCartUI();
    }
}

getData();
