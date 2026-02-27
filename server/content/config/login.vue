<template>
  <div class="min-h-screen flex flex-col bg-fafafa antialiased">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold tracking-widest serif">L'ATELIER</span>
          </router-link>
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-sm uppercase tracking-widest hover:text-art-gold transition-colors">Galerie</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Form -->
    <main class="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
      <div class="max-w-md w-full bg-white p-10 shadow-lg rounded-sm border-t-4 border-art-gold">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 serif">Connexion</h2>
          <p class="mt-2 text-sm text-gray-600">Accédez à votre espace collectionneur</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="sr-only">Adresse email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              placeholder="Adresse email"
              class="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-art-gold focus:border-art-gold sm:text-sm"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="Mot de passe"
              class="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-art-gold focus:border-art-gold sm:text-sm"
            >
          </div>

          <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>

          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 text-sm font-medium text-white bg-art-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-art-gold transition-colors"
          >
            Se connecter
          </button>

          <div class="text-center">
            <router-link to="/register" class="text-sm text-art-gold hover:text-art-black hover:underline">
              Pas encore de compte ? S'inscrire
            </router-link>
          </div>
        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-art-black text-white py-12">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h3 class="text-xl mb-4 serif">L'ATELIER</h3>
        <p class="text-gray-400 text-sm">Art contemporain & Classique</p>
        <div class="mt-8 text-xs text-gray-600">&copy; 2023 L'Atelier Galerie. Tous droits réservés.</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    handleLogin() {
      if (!this.form.email || !this.form.password) {
        this.errorMsg = 'Veuillez remplir tous les champs.'
        return
      }
      // Simulation login
      const user = { name: this.form.email.split('@')[0], email: this.form.email }
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.serif { font-family: 'Playfair Display', serif; }
.text-art-gold { color: #c5a059; }
.border-art-gold { border-color: #c5a059; }
.focus\:ring-art-gold:focus { --tw-ring-color: #c5a059; }
.focus\:border-art-gold:focus { border-color: #c5a059; }
.bg-art-black { background-color: #1a1a1a; }
.bg-fafafa { background-color: #fafafa; }
</style>
