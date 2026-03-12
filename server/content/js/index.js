// State from localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let user = JSON.parse(localStorage.getItem('user') || 'null');
let artworks = [];

// Load artworks
export function fetch_data() {
    fetch('tableaux.json')
        .then(r => r.json())
        .then(data => {
            artworks = data;
            renderGallery();
        })
        .catch(() => {
            // Fallback inline data if fetch fails
            artworks = [
                {
                    id: 1,
                    title: "Éclats de Couleurs",
                    artist: "Jean Dupont",
                    price: 1200,
                    description: "Une explosion abstraite de bleu et d'orange capturant l'énergie pure.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/1402917a1-914a-4454-81db-791684209f4c.png"
                },
                {
                    id: 2,
                    title: "Sérénité Alpine",
                    artist: "Marie Claire",
                    price: 2500,
                    description: "Paysage majestueux reflétant la tranquillité des montagnes.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/17681f78f-830e-448c-a2ce-23cd2184747a.png"
                },
                {
                    id: 3,
                    title: "La Dame en Vert",
                    artist: "Alessandro Rossi",
                    price: 4500,
                    description: "Portrait classique inspiré de la Renaissance, riche en détails.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/19832fe1f-eb38-4354-88ae-8c69d100f62f.png"
                },
                {
                    id: 4,
                    title: "Géométrie Noire",
                    artist: "Modernist X",
                    price: 1800,
                    description: "Minimalisme pur. Une étude de formes et d'ombres.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/1b347924a-ac84-4124-bf72-b0b81d30785d.png"
                },
                {
                    id: 5,
                    title: "Nature Morte Dorée",
                    artist: "Élodie Blanc",
                    price: 950,
                    description: "Impressionnisme vibrant célébrant les fruits de la saison.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/185eb515c-e4f7-440a-8913-61dd35ae3fa4.png"
                },
                {
                    id: 6,
                    title: "Rêve Suspendu",
                    artist: "Fantasy Art Co.",
                    price: 3200,
                    description: "Un monde onirique où la gravité n'a plus de sens.",
                    image: "https://image.qwenlm.ai/public_source/ff6d7f4e-ec7a-48bc-a9a0-cac3a470408a/1982b727b-eea0-4abb-9ae1-47cab482e4a4.png"
                }
            ];
            renderGallery();
        });
}

export function renderGallery() {
    const grid = document.getElementById('artworks-grid');
    grid.innerHTML = artworks.map(art => `
            <div class="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div class="overflow-hidden bg-gray-200 relative">
                    <img src="${art.image}" alt="${art.title}" class="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900" style="font-family:'Playfair Display',serif">${art.title}</h3>
                            <p class="text-sm text-gray-500 italic">${art.artist}</p>
                        </div>
                        <span class="text-lg font-bold text-art-gold">${art.price} €</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-6">${art.description}</p>
                    <button onclick="addToCart(${art.id})" class="w-full bg-art-black text-white py-3 px-4 uppercase text-xs tracking-widest hover:bg-art-gold transition-colors duration-300">
                        Ajouter au Panier
                    </button>
                </div>
            </div>
        `).join('');
}

export function updateNav() {
    const authBtns = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const usernameDisplay = document.getElementById('username-display');
    if (user) {
        authBtns.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userProfile.classList.add('flex');
        usernameDisplay.innerText = `Bonjour, ${user.name}`;
    } else {
        authBtns.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

export function updateCartCount() {
    const el = document.getElementById('cart-count');
    el.innerText = cart.length;
    el.style.opacity = cart.length > 0 ? '1' : '0';
}

export function addToCart(id) {
    const artwork = artworks.find(a => a.id === id);
    cart.push(artwork);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Ajouté au panier');
}

export function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartModal();
}

export function goToCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    renderCartModal();
}

export function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

export function renderCartModal() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = total + ' €';
    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="px-6 py-10 text-center text-gray-500">Votre panier est vide.</div>';
    } else {
        itemsEl.innerHTML = cart.map((item, i) => `
                <div class="px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center">
                        <img class="h-16 w-16 object-cover rounded border border-gray-200" src="${item.image}" alt="${item.title}">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-art-black" style="font-family:'Playfair Display',serif">${item.title}</div>
                            <div class="text-sm text-gray-500">${item.artist}</div>
                            <div class="text-sm font-bold text-art-gold mt-1">${item.price} €</div>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${i})" class="text-red-500 hover:text-red-700 text-sm">Retirer</button>
                </div>
            `).join('');
    }
}

export function checkout() {
    if (cart.length === 0) return;
    if (!user) {
        closeCart();
        showToast('Veuillez vous connecter pour acheter');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        return;
    }
    alert(`Merci pour votre achat de ${cart.length} œuvre(s) !`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeCart();
}

export function logout() {
    user = null;
    cart = [];
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    updateNav();
    updateCartCount();
    showToast('Déconnecté');
}

export function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

// Init
fetch_data();
updateNav();
updateCartCount();