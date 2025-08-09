// Datos de productos
const products = [
    //--------------------------------------- Fragancias
    {
        id: 1,
        name: "NITRO",
        type: "fragancias",
        price: 130.00,
        /*image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",*/
		image: "img/BO_202513_NITRO.jpg",
        promotionEnd: "2025-08-31"
    },
    {
        id: 2,
        name: "NITRO AIR",
        type: "fragancias",
        price: 140.00,
        image: "img/BO_202513_NITRO_AIR.png",
        promotionEnd: "2025-08-31"
    },
    {
        id: 3,
        name: "NITRO NIGHT",
        type: "fragancias",
		price: 140.00,
        image: "img/BO_202513_NITRO_NIGHT.jpg",
        promotionEnd: "2025-08-31"
    },
	{
        id: 4,
        name: "NITRO ULTIMATE",
        type: "fragancias",
        price: 140.00,
        image: "img/BO_202513_NITRO_ULTIMATE.webp",
        promotionEnd: "2025-08-31"
    },
	{
        id: 5,
        name: "SATIN ROUGE",
        type: "fragancias",
        price: 160.00,
        image: "img/200108160_SatinRouge_galeria3.webp",
        promotionEnd: "2025-08-31"
    },
    {
        id: 6,
        name: "",
        type: "fragancias",
        price: 19.00,
        image: "img/BO_202513_1_56_01328.webp",
        promotionEnd: "2025-08-31"
    },
    //--------------------------------------- Maquillaje
    
    
    //--------------------------------------- Moda
    {
        id: 7,
        name: "Vestido Elegante",
        type: "moda",
        price: 89.00,
        image: "img/photo101.png",
        promotionEnd: "2025-08-20"
    },
    {
        id: 8,
        name: "Blusa de Seda",
        type: "moda",
        price: 65.00,
        image: "img/photo101.png",
        promotionEnd: "2025-07-18"
    },
    {
        id: 9,
        name: "Pantalón de Vestir",
        type: "moda",
        price: 75.00,
        image: "img/photo101.png",
        promotionEnd: "2025-09-05"
    },
    //--------------------------------------- Accesorios
    {
        id: 10,
        name: "Bolso de Cuero",
        type: "accesorios",
        price: 120.00,
        image: "img/photo101.png",
        promotionEnd: "2025-08-12"
    },
    {
        id: 11,
        name: "Collar de Perlas",
        type: "accesorios",
        price: 45.00,
        image: "img/photo101.png",
        promotionEnd: "2025-07-28"
    },
    {
        id: 12,
        name: "Gafas de Sol",
        type: "accesorios",
        price: 85.00,
        image: "img/photo101.png",
        promotionEnd: "2025-08-25"
    }
];

// Carrito de compras
let cart = [];

// Elementos del DOM
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const cartItems = document.getElementById('cart-items');

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para verificar si la promoción está activa
function isPromotionActive(promotionEnd) {
    const today = new Date();
    const endDate = new Date(promotionEnd);
    return today <= endDate;
}

// Función para obtener el nombre del tipo de producto
function getProductTypeName(type) {
    const types = {
        'fragancias': 'Fragancia',
        'maquillaje': 'Maquillaje',
        'moda': 'Moda',
        'accesorios': 'Accesorio'
    };
    return types[type] || type;
}

// Función para renderizar productos
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> No se encontraron productos.
                </div>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const isActive = isPromotionActive(product.promotionEnd);
        const promotionClass = isActive ? 'promotion-active' : '';
        const promotionIcon = isActive ? '<i class="fas fa-fire"></i>' : '<i class="fas fa-calendar-times"></i>';
        
        const productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="product-card animate-scale-in" style="animation-delay: ${index * 0.1}s">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h5 class="product-name">${product.name}</h5>
                        <p class="product-type">${getProductTypeName(product.type)}</p>
                        <p class="product-price">Bs. ${product.price.toFixed(2)}</p>
                        <p class="product-promotion ${promotionClass}">
                            ${promotionIcon} Promoción hasta: ${formatDate(product.promotionEnd)}
                        </p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Función para filtrar productos
function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = products;
    
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.type === category);
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Función para agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification();
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Animación del contador
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

// Función para mostrar notificación del carrito
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 90px;
        right: 20px;
        z-index: 1050;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i> Producto agregado al carrito
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para renderizar items del carrito
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = `
        ${cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                <div>
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">${getProductTypeName(item.type)}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <span class="ms-3 fw-bold">BS. ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('')}
        <hr>
        <div class="d-flex justify-content-between">
            <strong>Total: Bs. ${total.toFixed(2)}</strong>
        </div>
    `;
}

// Función para actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            renderCartItems();
        }
    }
}

// Función para remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);
cartBtn.addEventListener('click', () => {
    renderCartItems();
    cartModal.show();
});

// Scroll suave para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    
    // Animación de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.animate-fade-in, .animate-slide-in').forEach(el => {
        observer.observe(el);
    });
});

// Transiciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in, .animate-slide-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .product-card {
        opacity: 0;
        animation: fadeIn 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);