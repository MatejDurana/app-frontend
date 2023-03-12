<template>
  <router-link :to="`model/${model.id}`" class="box">
    <h3>{{ model.name }}</h3>
    <p>Priemerný čas vytvárania: {{ model.time }}</p>

    <div class="images">
      <img v-for="i in 4" :key="i" :src="require(`@/assets/model_showcase/${model.id}/${i}.jpg`)"
        alt="Ukážkový obrázok" />
    </div>
  </router-link>
</template> 
<script>
export default {
  name: "ModelCard",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
$color-primary: #2e3532;
$color-secondary: #7e9181;
$color-tertiary: #c7cedb;
$color-quaternary: #a0aab2;

.box {
  width: 45%;
  padding: 1rem;
  background-color: $color-secondary;

  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem $color-primary;
  text-align: center;
  transition: 0.1s all ease;
  cursor: pointer;

  h3 {
    margin: 1rem 0 0.5rem;
    font-size: 1.5rem;
    color: $color-primary;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: $color-tertiary;
  }

  .images {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 3%;

    img {
      width: 20%;
      height: auto;
    }
  }

  &:hover {
    background-color: $color-quaternary;
  }
}
</style>