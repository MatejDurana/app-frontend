<template>
  <router-link :to="{ name: 'ModelPage', params: { id: model.id } }" class="box">
    <div class="text">
      <h3>{{ model.name }}</h3>
      <h5>{{ model.fullname }}</h5>
      <p>Priemerný čas vytvárania: {{ model.time }}</p>
    </div>
    <div class="images">
      <img v-for="i in 4" :key="i" :src="`images/model_showcase/${model.id}/${i}.jpg`" alt="Ukážkový obrázok" />
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
$color1: #F5F5F5;
$color2: #00A499;
$color3: #1A1A1A;
$color4: #E5E5E2;
$color5: #1E2838;

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 45%;
  height: 30vh;
  padding: 1rem;
  background-color: $color2;

  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem $color1;
  text-align: center;
  transition: 0.2s all ease;
  cursor: pointer;

  .text {
    display: flex;
    flex-direction: column;

    h3 {
      margin: 1rem 0 0.5rem;
      font-size: 1.5rem;
      color: $color1;
    }

    h5 {
      color: $color1;

    }

    p {
      margin: 0.5rem 0;
      font-size: 1rem;
      color: $color3;
    }
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
    background-color: $color5;

    .text {
      p {
        color: $color4;
      }
    }
  }
}
</style>