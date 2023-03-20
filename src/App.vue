<template>
  <div class="main">
    <PageHeader class="header" />
    <router-view class="view" />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style lang="scss">
$color1: #F5F5F5;
$color2: #00A499;
$color3: #1A1A1A;
$color4: #E5E5E2;
$color5: #1E2838;

@font-face {
  font-family: "Drive";
  src: url("../public/fonts/Drive/Drive-Regular.otf");
  font-weight: normal;
  font-style: normal;
}

html {
  font-size: 16px;
  font-family: "Drive", sans-serif;
  height: 100%;
}

.main {
  background-color: $color4;
}

.header {
  height: 10vh;
}

.view {
  padding-top: 1rem;
  height: 90vh;
  width: 100%;
  overflow: auto;
}

body {
  position: relative;
  width: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button,
input,
select,
textarea {
  font-size: 100%;
  font-family: inherit;
  line-height: 1.15;
  margin: 0;
  outline: none;
  border: none;

  &:focus {
    outline: none;
  }
}

a {
  text-decoration: none;

}

@media only screen and (max-width: 1440px) {
  html {
    font-size: 14px;
  }
}
</style>
