<template>
  <div id="app">
    <nav class="navbar">
      <h1>Drama Girl Design Inspiration</h1>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/fonts" class="nav-link">Font Showcase</router-link>
        <router-link to="/logo" class="nav-link">Logo Design</router-link>
        <router-link to="/stars" class="nav-link">Stars</router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    updatePageTitle() {
      const routeTitles = {
        '/': 'Home',
        '/fonts': 'Font Showcase',
        '/logo': 'Logo Design',
        '/stars': 'Stars'
      }
      
      const currentPath = this.$route.path
      const pageTitle = routeTitles[currentPath] || 'Page'
      document.title = `${pageTitle} - Drama Girl Design Inspiration`
    }
  },
  mounted() {
    this.updatePageTitle()
  },
  watch: {
    '$route'() {
      this.updatePageTitle()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #1a1a1a;
  color: #e0e0e0;
}

#app {
  min-height: 100vh;
  background-color: #1a1a1a;
}

.navbar {
  background: linear-gradient(135deg, #FF1493 0%, #C71585 50%, #8B0A50 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.2);
  transform: translateY(-1px);
  transition: all 0.3s ease;
}

.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.3);
  font-weight: 600;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1a1a1a;
}
</style>