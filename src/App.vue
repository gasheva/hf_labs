<script lang="ts" setup>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        Список
      </RouterLink>
    </nav>
  </header>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
header {
    line-height: 1.5;
    margin-bottom: 3rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

.wrapper {
    max-width: 60%;
    margin-inline: auto;
    height: 100vh;
}

@media (max-width: 768px) {
    .wrapper {
        max-width: 80%;
    }
}

@media (max-width: 480px) {
    .wrapper {
        max-width: 90%;
    }
}
</style>
