<template>
  <div class="text-art-black antialiased">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold tracking-widest serif">L'ATELIER</span>
          </router-link>
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-sm uppercase tracking-widest hover:text-art-gold transition-colors">Galerie</router-link>
            <template v-if="!user">
              <router-link to="/login" class="text-sm uppercase tracking-widest hover:text-art-gold transition-colors">Connexion</router-link>
            </template>
            <template v-else>
              <span class="text-sm font-semibold">Bonjour, {{ user.name }}</span>
              <button @click="logout" class="text-xs text-gray-500 hover:text-red-500">Déconnexion</button>
            </template>
            <button @click="showCart = true" class="relative group">
              <svg class="w-6 h-6 text-gray-700 group-hover:text-art-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span v-if="cart.length > 0" class="absolute -top-2 -right-2 bg-art-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {{ cart.length }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Gallery -->
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-art-black serif">Collection Actuelle</h1>
          <div class="w-24 h-1 bg-art-gold mx-auto"></div>
          <p class="mt-4 text-gray-500 max-w-2xl mx-auto">Découvrez notre sélection exclusive d'œuvres d'art contemporain et classique.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div
            v-for="art in artworks"
            :key="art.id"
            class="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div class="overflow-hidden bg-gray-200 relative">
              <img :src="art.image" :alt="art.title" class="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-xl font-bold serif text-gray-900">{{ art.title }}</h3>
                  <p class="text-sm text-gray-500 italic">{{ art.artist }}</p>
                </div>
                <span class="text-lg font-bold text-art-gold">{{ art.price }} €</span>
              </div>
              <p class="text-gray-600 text-sm mb-6">{{ art.description }}</p>
              <button
                @click="addToCart(art)"
                class="w-full bg-art-black text-white py-3 px-4 uppercase text-xs tracking-widest hover:bg-art-gold transition-colors duration-300"
              >
                Ajouter au Panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Cart Modal -->
    <div v-if="showCart" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" @click.self="showCart = false">
      <div class="bg-white w-full max-w-2xl mx-4 rounded shadow-xl">
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-xl font-bold serif">Votre Panier</h2>
          <button @click="showCart = false" class="text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          <div v-if="cart.length === 0" class="px-6 py-10 text-center text-gray-500">Votre panier est vide.</div>
          <div v-for="(item, index) in cart" :key="index" class="px-6 py-4 flex items-center justify-between">
            <div class="flex items-center">
              <img class="h-16 w-16 object-cover rounded border border-gray-200" :src="item.image" :alt="item.title">
              <div class="ml-4">
                <div class="text-sm font-medium text-art-black serif">{{ item.title }}</div>
                <div class="text-sm text-gray-500">{{ item.artist }}</div>
                <div class="text-sm font-bold text-art-gold mt-1">{{ item.price }} €</div>
              </div>
            </div>
            <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700 text-sm">Retirer</button>
          </div>
        </div>
        <div class="px-6 py-4 border-t bg-gray-50">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold">Total</span>
            <span class="text-2xl font-bold serif">{{ cartTotal }} €</span>
          </div>
          <button @click="checkout" class="w-full py-3 bg-art-gold text-white text-sm uppercase tracking-widest hover:bg-yellow-600 transition-colors">
            Passer la commande
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="fixed bottom-5 right-5 bg-art-black text-white px-6 py-3 rounded shadow-lg z-50">
        {{ toast }}
      </div>
    </transition>
  </div>
</template>

<script>
import artworksData from 'content/json/tableaux.js'

export default {
  name: 'GalleryPage',
  data() {
    return {
      artworks: artworksData,
      cart: JSON.parse(localStorage.getItem('cart') || '[]'),
      user: JSON.parse(localStorage.getItem('user') || 'null'),
      showCart: false,
      toast: null,
      toastTimer: null
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((sum, item) => sum + item.price, 0)
    }
  },
  methods: {
    addToCart(artwork) {
      this.cart.push(artwork)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.showToast('Ajouté au panier')
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    checkout() {
      if (this.cart.length === 0) return
      if (!this.user) {
        this.showCart = false
        this.$router.push('/login')
        return
      }
      alert(`Merci pour votre achat de ${this.cart.length} œuvre(s) !`)
      this.cart = []
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.showCart = false
    },
    logout() {
      this.user = null
      this.cart = []
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
      this.showToast('Déconnecté')
    },
    showToast(message) {
      this.toast = message
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = null }, 3000)
    }
  }
}
</script>

<style scoped>
.serif { font-family: 'Playfair Display', serif; }
.text-art-black { color: #1a1a1a; }
.text-art-gold { color: #c5a059; }
.bg-art-black { background-color: #1a1a1a; }
.bg-art-gold { background-color: #c5a059; }
.hover\:bg-art-gold:hover { background-color: #c5a059; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
