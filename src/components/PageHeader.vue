<template>
  <header class="header">
    <router-link :to="{ name: 'LandingPage' }" class="logo">Style Transfer</router-link>
    <nav class="nav">
      <router-link :to="{ name: 'LandingPage' }" class="nav-item">Domov</router-link>
      <router-link :to="{ name: 'ModelsPage' }" class="nav-item">Modely</router-link>
    </nav>
  </header>
</template>

<style lang="scss">
$color1: #F5F5F5;
$color2: #00A499;
$color3: #1A1A1A;
$color4: #E5E5E2;
$color5: #1E2838;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(245, 245, 245, 1);
  //background: linear-gradient(0deg, rgba(229, 229, 226, 1) 0%, rgba(245, 245, 245, 1) 15%);

  padding: 1rem;
  color: $color3;
  font-size: 2rem;
  padding-inline: 4rem;
}

.logo {
  font-weight: bold;
  text-decoration: none;
}


.nav {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.nav-item {
  margin-left: 1rem;
  text-decoration: none;
}

.nav-item,
.logo {
  transition: color 0.3s;

  color: $color5;

  &:hover {
    color: $color2;
  }
}
</style>
