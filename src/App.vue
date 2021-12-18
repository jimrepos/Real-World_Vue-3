<template>
  <div id="app">
    <nav id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </nav>
    <router-view />
    <footer id="footer">
      <router-link to="/any-text-goes-here">Broken Link</router-link>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav, #footer {
  padding: 30px;
}

#nav a, #footer a {
  font-weight: bold;
}

a {
  color: #2c3e50;
}

#nav a.router-link-exact-active, #footer a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>
