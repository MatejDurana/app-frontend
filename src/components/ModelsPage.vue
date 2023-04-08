<template>
    <div class="models">
        <span>Výber modelu</span>
        <div class="box-container">
            <ModelCard v-for="i in 4" :key="i" :model="models[i - 1]" />
        </div>
    </div>
</template>
  
<script>
import ModelCard from "./ModelCard.vue"
export default {
    name: "ModelsPage",
    components: {
        ModelCard,
    },
    data() {
        return {
            models: [
                {
                    id: "nnst",
                    name: "NNST",
                    fullname: "Neural Neighbor Style Transfer",
                    time: "45 sekúnd"
                },
                {
                    id: "anaoas",
                    name: "ANAoAS",
                    fullname: "A Neural Algorithm of Artistic Style",
                    time: "2 minúty",
                },
                {
                    id: "msg-net-istucnn",
                    name: "MSG-Net-ISTUCNN",
                    fullname: "Multi-style Generative Network - Image Style Transfer Using CNNs",
                    time: "5 sekúnd"
                },
                {
                    id: "istucnn-2",
                    name: "ISTUCNN 2",
                    fullname: "Image Style Transfer Using CNNs",
                    time: "3 minúty"
                }
            ]
        }
    }
};
</script>
  
<style lang="scss" scoped>
$color1: #F5F5F5;
$color2: #00A499;
$color3: #1A1A1A;
$color4: #E5E5E2;
$color5: #1E2838;

.models {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &>span {
        margin-top: 4vh;
        font-size: 3vh;
        margin-bottom: 3vh;
    }

    .box-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
    }
}
</style>
  