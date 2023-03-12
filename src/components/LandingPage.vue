<template>
  <div class="landing-page">
    <h1>Vitajte v Style Transfer</h1>
    <router-link to="/modely">
      <button>Začať štýlovať</button>
    </router-link>
  </div>
</template>
  
<script>
export default {
  name: "LandingPage",
};
</script>
  
<style lang="scss" scoped>
$color-primary: #2e3532;
$color-secondary: #7e9181;
$color-tertiary: #c7cedb;
$color-quaternary: #a0aab2;

.landing-page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: $color-tertiary;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  button {
    cursor: pointer;
    color: $color-tertiary;
    background-color: $color-secondary;
    font-size: 1.8rem;
    border-radius: 0.8rem;
    width: 18rem;
    height: 5rem;
    transition: 0.2s all ease;
    outline: 0rem solid $color-tertiary;

    &:hover {
      transition: 0.2s all ease;
      outline: 0.2rem solid $color-tertiary;
      font-size: 1.9rem;
    }
  }
}
</style>
  