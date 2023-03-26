<template>
    <div class="container">
        <div class="square" ref="square" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
            <img src="/icons/info.png" alt="">
            <transition name="fade">
                <div v-if="showTooltip" class="tooltip" ref="tooltip" @mouseover="showTooltip = true"
                    @mouseleave="showTooltip = false">
                    {{ this.message }}
                </div>
            </transition>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ToolTip",
    props: {
        message: String,
    },
    data() {
        return {
            showTooltip: false
        };
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        handleOutsideClick(event) {
            if (this.$refs.tooltip && !this.$refs.tooltip.contains(event.target) && !this.$refs.square.contains(event.target)) {
                this.showTooltip = false;
            }
        }
    },
    watch: {
        showTooltip(value) {
            this.$emit('tooltip-hovered', value);
        }
    },
};
</script>
  
<style lang="scss">
.container {
    z-index: 1;
    position: relative;
    width: 1.5rem;

}

.square {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    img {
        width: 100%;
        height: 100%;
    }
}

.tooltip {
    z-index: 2;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 1.5rem;
    padding: 5px 10px;
    background-color: #E5E5E2;
    color: #1A1A1A;
    max-width: 20rem;
    min-width: 10rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  