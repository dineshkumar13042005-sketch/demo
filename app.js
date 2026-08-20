// ==========================================================================
// BAKETERIA ARTISAN BAKERY - INTERACTIVE LOGIC & ORDER ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initCategoryTabs();
    initOrderModal();
    setDefaultDate();
    initFloatingParticles();
});

// Header Glassmorphism Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// Category Tabs Filter System
function initCategoryTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Order Modal Logic
let currentCartCount = 0;

function initOrderModal() {
    setDefaultDate();
}

function setDefaultDate() {
    const dateInput = document.getElementById('orderDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
}

function openOrderModal(cakeName = null) {
    const modal = document.getElementById('orderModal');
    const cakeSelect = document.getElementById('cakeSelect');
    const modalCakeTitle = document.getElementById('modalCakeTitle');

    if (cakeName && cakeSelect) {
        for (let i = 0; i < cakeSelect.options.length; i++) {
            if (cakeSelect.options[i].value.toLowerCase().includes(cakeName.toLowerCase())) {
                cakeSelect.selectedIndex = i;
                break;
            }
        }
        modalCakeTitle.textContent = `Order ${cakeName}`;
    } else if (modalCakeTitle) {
        modalCakeTitle.textContent = "Order Your Custom Cake";
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Product Catalog Data with Prices & Image Paths
const cakeCatalogData = {
    'jackfruit cake': { price: '₹650 / 1kg', priceNum: 650, img: 'jackfruit-cake.jpg', label: 'Signature Jackfruit Cake' },
    'chocolate cake': { price: '₹550 / 1kg', priceNum: 550, img: '9.jpg', label: 'Rich Chocolate Cake' },
    'birthday cake': { price: '₹500 / 1kg', priceNum: 500, img: 'hero-cake.jpg', label: 'Classic Birthday Cake' },
    'vanilla cake': { price: '₹450 / 1kg', priceNum: 450, img: 'vanilla-cake.jpg', label: 'Vanilla Sponge Cake' },
    'butterscotch cake': { price: '₹500 / 1kg', priceNum: 500, img: '10.jpg', label: 'Butterscotch Praline Cake' },
    'black forest cake': { price: '₹550 / 1kg', priceNum: 550, img: 'black-forest-cake.jpg', label: 'Black Forest Cake' },
    'red velvet cake': { price: '₹600 / 1kg', priceNum: 600, img: 'red-velvet-cake.jpg', label: 'Red Velvet Cake' },
    'custom theme cake': { price: '₹750 / 1kg', priceNum: 750, img: 'designer-cake.jpg', label: 'Custom Theme Cake' },
    'photo cake': { price: '₹700 / 1kg', priceNum: 700, img: 'photo-cake.jpg', label: 'Edible Photo Cake' },
    'designer cake': { price: '₹850 / 1kg', priceNum: 850, img: 'designer-cake.jpg', label: 'Luxury Designer Cake' },
    'brownie tub': { price: '₹350 / tub', priceNum: 350, img: '8.jpg', label: 'Fudgy Brownie Tub' },
    'chocolate brownie': { price: '₹300 / pack', priceNum: 300, img: '7.jpg', label: 'Chocolate Brownie Pack' },
    'chocolate sauce brownie': { price: '₹380 / tub', priceNum: 380, img: '5.jpg', label: 'Hot Chocolate Sauce Brownie' },
    'birthday custom cake': { price: '₹800 / 1kg', priceNum: 800, img: 'hero-cake.jpg', label: 'Custom Birthday Cake' },
    'anniversary cake': { price: '₹850 / 1kg', priceNum: 850, img: 'red-velvet-cake.jpg', label: 'Anniversary Special Cake' },
    'baby shower cake': { price: '₹850 / 1kg', priceNum: 850, img: '2.jpg', label: 'Baby Shower Custom Cake' },
    'wedding tier cake': { price: '₹1,200 / 1kg', priceNum: 1200, img: '6.jpg', label: 'Grand Wedding Tier Cake' },
    'corporate event cake': { price: '₹950 / 1kg', priceNum: 950, img: 'black-forest-cake.jpg', label: 'Corporate Event Cake' }
};

// Delivery Option Toggle Handler for Order Modal
function handleDeliveryOptionChange(optionType) {
    const radioCardDoorstep = document.getElementById('radioCardDoorstep');
    const radioCardTakeaway = document.getElementById('radioCardTakeaway');
    const addressWrapper = document.getElementById('deliveryAddressWrapper');
    const takeawayStoreBox = document.getElementById('takeawayStoreBox');
    const deliveryAddressInput = document.getElementById('deliveryAddress');

    if (optionType === 'takeaway') {
        if (radioCardDoorstep) radioCardDoorstep.classList.remove('active');
        if (radioCardTakeaway) radioCardTakeaway.classList.add('active');
        if (addressWrapper) addressWrapper.style.display = 'none';
        if (takeawayStoreBox) takeawayStoreBox.style.display = 'block';
        if (deliveryAddressInput) deliveryAddressInput.removeAttribute('required');
    } else {
        if (radioCardTakeaway) radioCardTakeaway.classList.remove('active');
        if (radioCardDoorstep) radioCardDoorstep.classList.add('active');
        if (addressWrapper) addressWrapper.style.display = 'block';
        if (takeawayStoreBox) takeawayStoreBox.style.display = 'none';
        if (deliveryAddressInput) deliveryAddressInput.setAttribute('required', 'true');
    }
}

// Delivery Option Toggle Handler for Cart Modal
function handleCartDeliveryOptionChange(optionType) {
    const cartRadioCardDoorstep = document.getElementById('cartRadioCardDoorstep');
    const cartRadioCardTakeaway = document.getElementById('cartRadioCardTakeaway');
    const cartAddressWrapper = document.getElementById('cartDeliveryAddressWrapper');
    const cartTakeawayStoreBox = document.getElementById('cartTakeawayStoreBox');

    if (optionType === 'takeaway') {
        if (cartRadioCardDoorstep) cartRadioCardDoorstep.classList.remove('active');
        if (cartRadioCardTakeaway) cartRadioCardTakeaway.classList.add('active');
        if (cartAddressWrapper) cartAddressWrapper.style.display = 'none';
        if (cartTakeawayStoreBox) cartTakeawayStoreBox.style.display = 'block';
    } else {
        if (cartRadioCardTakeaway) cartRadioCardTakeaway.classList.remove('active');
        if (cartRadioCardDoorstep) cartRadioCardDoorstep.classList.add('active');
        if (cartAddressWrapper) cartAddressWrapper.style.display = 'block';
        if (cartTakeawayStoreBox) cartTakeawayStoreBox.style.display = 'none';
    }
}

function getPublicPhotoUrl(imgPath) {
    if (!imgPath) return '';
    // If running on local file system, convert to public HTTPS link so WhatsApp can fetch and unfurl the image preview
    if (window.location.protocol === 'file:') {
        return 'https://baketeria.com/' + imgPath.replace(/^\/+/, '');
    }
    return window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + imgPath;
}

function handleOrderSubmit(event) {
    event.preventDefault();

    const cakeSelect = document.getElementById('cakeSelect').value;
    const cakeSize = document.getElementById('cakeSize').value;
    const eggPreference = document.getElementById('eggPreference').value;
    const customMessage = document.getElementById('customMessage').value;
    const orderDate = document.getElementById('orderDate').value;
    const customerPhone = document.getElementById('customerPhone').value;
    
    // Get Delivery Option & Address
    const deliveryOptionRadio = document.querySelector('input[name="deliveryOption"]:checked');
    const selectedDeliveryOption = deliveryOptionRadio ? deliveryOptionRadio.value : 'Doorstep Delivery';
    const deliveryAddress = document.getElementById('deliveryAddress') ? document.getElementById('deliveryAddress').value : '';
    const specialInstructions = document.getElementById('specialInstructions').value;

    currentCartCount++;
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = currentCartCount;

    // Get item price & picture URL
    const itemData = cakeCatalogData[cakeSelect.toLowerCase()] || { price: '₹550 / kg', img: 'hero-cake.jpg' };
    const photoLink = getPublicPhotoUrl(itemData.img);

    let deliveryDetailText = '';
    if (selectedDeliveryOption === 'Takeaway') {
        deliveryDetailText = `📦 *Delivery Option:* Takeaway (Store Pickup)%0A` +
            `📍 *Pickup Location:* Baketeria Bakery, Ayanavaram, Chennai – 600023`;
    } else {
        deliveryDetailText = `🚚 *Delivery Option:* Doorstep Delivery%0A` +
            `📍 *Delivery Address:* ${deliveryAddress || 'Not provided'}`;
    }

    const message = `🎂 *NEW BAKETERIA ORDER INQUIRY*%0A%0A` +
        `🍰 *Item:* ${cakeSelect}%0A` +
        `⚖️ *Weight / Size:* ${cakeSize}%0A` +
        `🌱 *Type:* ${eggPreference}%0A` +
        `✍️ *Custom Message:* ${customMessage || 'None'}%0A` +
        `📅 *Delivery Date:* ${orderDate}%0A` +
        `📞 *Contact:* ${customerPhone}%0A` +
        `${deliveryDetailText}%0A` +
        `📝 *Special Notes:* ${specialInstructions || 'None'}%0A%0A` +
        `Thank you for baking with Baketeria! ✨%0A%0A` +
        `${photoLink}`;

    showToast(`🎂 Order inquiry for ${cakeSelect} sent! Opening WhatsApp...`);

    closeOrderModal();

    setTimeout(() => {
        const whatsappUrl = `https://wa.me/919344273174?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Shopping Cart State & Management Engine
let cartItems = [];

function addToCart(itemName) {
    const existingIndex = cartItems.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (existingIndex > -1) {
        cartItems[existingIndex].qty += 1;
    } else {
        cartItems.push({ name: itemName, qty: 1 });
    }
    updateCartUI();
    showToast(`🛒 "${itemName}" added to your cart!`);

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('bounce');
        setTimeout(() => cartBtn.classList.remove('bounce'), 600);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) {
        cartCount.textContent = totalQty;
    }
    renderCartModal();
}

function openCartModal() {
    renderCartModal();
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeCartQty(index, delta) {
    if (cartItems[index]) {
        cartItems[index].qty += delta;
        if (cartItems[index].qty <= 0) {
            cartItems.splice(index, 1);
        }
        updateCartUI();
    }
}

function removeCartItem(index) {
    if (cartItems[index]) {
        const removedName = cartItems[index].name;
        cartItems.splice(index, 1);
        updateCartUI();
        showToast(`🗑️ Removed "${removedName}" from cart`);
    }
}

function renderCartModal() {
    const list = document.getElementById('cartItemsList');
    const totalItemsEl = document.getElementById('cartTotalItems');
    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

    if (totalItemsEl) totalItemsEl.textContent = totalQty;

    if (!list) return;

    if (cartItems.length === 0) {
        list.innerHTML = `
            <div class="empty-cart-view">
                <i class="fa-solid fa-basket-shopping empty-icon"></i>
                <p>Your shopping basket is currently empty.</p>
                <button class="btn btn-sm btn-primary" onclick="closeCartModal(); location.href='#menu';">
                    Browse Fresh Cakes
                </button>
            </div>
        `;
        return;
    }

    let html = '';
    cartItems.forEach((item, idx) => {
        const itemInfo = cakeCatalogData[item.name.toLowerCase()] || { price: '₹500', priceNum: 500, img: 'hero-cake.jpg' };
        html += `
            <div class="cart-item-row">
                <img src="${itemInfo.img}" alt="${item.name}" class="cart-thumb">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">${itemInfo.price}</span>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
                    <button class="remove-btn" onclick="removeCartItem(${idx})" title="Remove item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function checkoutCartWhatsApp() {
    if (cartItems.length === 0) {
        showToast('Your cart is empty! Add cakes to your basket first.');
        return;
    }

    const itemsSummary = cartItems.map(item => {
        const info = cakeCatalogData[item.name.toLowerCase()] || { price: '₹500 / 1kg', priceNum: 500, img: 'hero-cake.jpg' };
        const photoLink = getPublicPhotoUrl(info.img);
        return `• *${item.qty}x ${item.name}*%0A  ${photoLink}`;
    }).join('%0A%0A');

    const cartDeliveryOptionRadio = document.querySelector('input[name="cartDeliveryOption"]:checked');
    const selectedCartDeliveryOption = cartDeliveryOptionRadio ? cartDeliveryOptionRadio.value : 'Doorstep Delivery';
    const cartDeliveryAddress = document.getElementById('cartDeliveryAddress') ? document.getElementById('cartDeliveryAddress').value : '';

    let deliveryDetailText = '';
    if (selectedCartDeliveryOption === 'Takeaway') {
        deliveryDetailText = `📦 *Delivery Option:* Takeaway (Store Pickup)%0A` +
            `📍 *Pickup Location:* Baketeria Bakery, Ayanavaram, Chennai – 600023`;
    } else {
        deliveryDetailText = `🚚 *Delivery Option:* Doorstep Delivery%0A` +
            `📍 *Delivery Address:* ${cartDeliveryAddress || 'Not provided'}`;
    }

    const message = `🎂 *BAKETERIA BASKET ORDER*%0A%0A` +
        `🛒 *Items Ordered:*%0A${itemsSummary}%0A%0A` +
        `${deliveryDetailText}%0A%0A` +
        `Please confirm item availability & delivery slot! ✨`;

    closeCartModal();
    showToast('🛒 Redirecting to WhatsApp with item photos, delivery preference and prices...');

    setTimeout(() => {
        window.open(`https://wa.me/919344273174?text=${message}`, '_blank');
    }, 1000);
}

// Interactive Floating Rose, Chocolate & Cake Piece Particle System (Mobile Optimized)
function initFloatingParticles() {
    // Disable canvas animation on mobile phones to ensure 60fps smooth scrolling and prevent lag
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
    if (isMobile) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'floatingParticles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 20; // Lightweight count for smooth desktop 60fps performance
    const colors = [
        'rgba(255, 77, 121, 0.75)',  // Rose Pink Particle
        'rgba(255, 130, 160, 0.65)', // Soft Rose Petal Dot
        'rgba(248, 214, 162, 0.75)', // Golden Cake Piece Dot
        'rgba(212, 155, 75, 0.7)',   // Chocolate Amber Sparkle
        'rgba(255, 105, 140, 0.85)', // Deep Rose Glow
        'rgba(255, 235, 240, 0.6)'   // Cake Powder Sprinkle
    ];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 0.5 + 0.2,
            speedX: Math.random() * 0.4 - 0.2,
            swing: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.015 + 0.005,
            isSquare: Math.random() > 0.65
        });
    }

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    function animate() {
        if (isTabActive) {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.y -= p.speedY;
                p.swing += p.swingSpeed;
                p.x += Math.sin(p.swing) * 0.5 + p.speedX;

                if (p.y < -12) {
                    p.y = height + 12;
                    p.x = Math.random() * width;
                }
                if (p.x < -12) p.x = width + 12;
                if (p.x > width + 12) p.x = -12;

                ctx.fillStyle = p.color;
                ctx.beginPath();
                if (p.isSquare) {
                    ctx.rect(p.x, p.y, p.radius * 1.8, p.radius * 1.8);
                } else {
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                }
                ctx.fill();
            });
        }

        requestAnimationFrame(animate);
    }

    animate();
}
