<template>
  <header class="header">
    <router-link to="/" class="logo">Style Transfer</router-link>
    <nav class="nav">
      <router-link to="/" class="nav-item">Domov</router-link>
      <router-link to="/modely" class="nav-item">Modely</router-link>
    </nav>
  </header>
</template>

<style lang="scss">

$color-primary: #2E3532;
$color-secondary: #7E9181;
$color-tertiary: #C7CEDB;
$color-quaternary: #A0AAB2;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-primary;
  padding: 1rem;
  color: $color-tertiary;
  font-size: 2rem;
  padding-inline: 4rem;
}

.logo {
  font-weight: bold;
  text-decoration: none;
  color: $color-tertiary;
  transition: color 0.3s;
}

.logo:hover {
  color: $color-secondary;
}

.nav {
  display: flex;
  justify-content: flex-end;
}

.nav-item {
  margin-left: 1rem;
  text-decoration: none;
  color: $color-quaternary;
  transition: color 0.3s;
}

.nav-item:hover {
  color: $color-tertiary;
}
</style>
