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
$color1: #F5F5F5;
$color2: #00A499;
$color3: #222020;
$color4: #E5E5E2;
$color5: #1E2838;

.landing-page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: $color3;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  button {
    cursor: pointer;
    color: $color4;
    background-color: $color2;
    font-size: 1.8rem;
    border-radius: 0.8rem;
    width: 18rem;
    height: 5rem;
    transition: 0.2s all ease;

    &:hover {
      transition: 0.2s all ease;
      font-size: 1.85rem;
      background-color: $color5;
      color: $color1;
    }
  }
}
</style>
  