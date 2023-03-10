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
$color-primary: #2E3532;
$color-secondary: #7E9181;
$color-tertiary: #C7CEDB;
$color-quaternary: #A0AAB2;

.landing-page {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        color: $color-tertiary;
        font-size: 4rem;
        text-align: center;
        margin-bottom: 3rem;
    }
    button{
        cursor: pointer;
        color: $color-tertiary;
        background-color: $color-secondary;
        font-size: 2rem;
        border-radius: .8rem;
        width: 20rem;
        height: 5rem;
        transition: 0.2s all ease;
        outline: 0rem solid $color-tertiary;
        &:hover{
            transition: 0.2s all ease;
            outline: .2rem solid $color-tertiary;
        }
    }
}
</style>
  