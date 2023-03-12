<template>
    <div class="models">
        <div class="box-container">
            <ModelCard :model="models[0]" />
            <ModelCard :model="models[1]" />
            <ModelCard :model="models[2]" />
            <ModelCard :model="models[3]" />
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
                    id: "anaoas",
                    name: "ANAoAS",
                    time: "2 minúty",
                },
                {
                    id: "msg-net-istucnn",
                    name: "MSG-Net-ISTUCNN",
                    time: "2 minúty"
                },
                {
                    id: "istucnn-2",
                    name: "ISTUCNN 2",
                    time: "2 minúty"
                },
                {
                    id: "nnst",
                    name: "NNST",
                    time: "2 minúty"
                }
            ]
        }
    }
};
</script>
  
<style lang="scss" scoped>
$color-primary: #2E3532;
$color-secondary: #7E9181;
$color-tertiary: #C7CEDB;
$color-quaternary: #A0AAB2;

.models {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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
  