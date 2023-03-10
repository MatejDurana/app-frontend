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

$color-primary: #2E3532;
$color-secondary: #7E9181;
$color-tertiary: #C7CEDB;
$color-quaternary: #A0AAB2;

html {
  font-size: 16px;
  font-family: Palatino, sans-serif;
  height: 100%;
  overflow: hidden;
}
.main{
  background-color: $color-primary;
}
.header{
  height: 10vh;
}
.view{
  height: 90vh;
  width: 100%;
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
a{
  text-decoration: none;

}

</style>
