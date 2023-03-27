<template>
    <form class="form-wrapper" @submit.prevent>
        <div class="col">
            <div :class="[hovered4 ? 'hovered' : '', 'inpt alpha']">
                <label for="alpha-input" class="form-label">
                    <div>
                        Alpha:
                        <span>{{ form.alpha }}</span>
                        <toolTip
                            message="Alpha=1.0 zodpovedá maximálnemu zachovaniu obsahu, Alpha=0.0 je maximálna štylizácia"
                            @tooltip-hovered="tooltipHoveredHandler4" />
                    </div>
                    <div>
                        <input type="range" id="alpha-input" min="0" max="1" step="0.01" v-model="form.alpha"
                            class="form-input" />
                    </div>
                </label>

            </div>
        </div>
        <div class="col">
            <div :class="[hovered1 ? 'hovered' : '', 'inpt']">
                <label class="b-contain">
                    <span>No flip</span>
                    <input type="checkbox" v-model="form.flip" />
                    <div class="b-input"></div>
                </label>
                <toolTip
                    message="Zakliknuté použije aj rotácie štýlu, čo zlepší viditeľnosť obsahu, ale môže zhoršiť prenesenie štýlu"
                    @tooltip-hovered="tooltipHoveredHandler1" />
            </div>
            <div :class="[hovered2 ? 'hovered' : '', 'inpt']">
                <label class="b-contain">
                    <span>Dont colorize</span>
                    <input type="checkbox" v-model="form.dont_colorize" />
                    <div class="b-input"></div>
                </label>
                <toolTip message="Zakliknuté použije iba farby zo štýlu" @tooltip-hovered="tooltipHoveredHandler2" />
            </div>
            <div :class="[hovered3 ? 'hovered' : '', 'inpt']">
                <label class="b-contain">
                    <span>Content loss</span>
                    <input type="checkbox" v-model="form.content_loss" />
                    <div class="b-input"></div>
                </label>
                <toolTip
                    message="Zakliknuté môže opraviť nesprávne posunutie farieb, ale má svoje nevýhody, preto je defaultne nezakliknutý"
                    @tooltip-hovered="tooltipHoveredHandler3" />
            </div>
        </div>


    </form>
</template>
  
<script>
import toolTip from './ToolTip.vue';
export default {
    name: "paramsNkolkin",
    components: {
        toolTip,
    },
    data() {
        return {
            form: {
                alpha: 0.75,
                dont_colorize: true,
            },
            paramsData: {},
            hovered1: false,
            hovered2: false,
            hovered3: false,
            hovered4: false,
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('paramsData', this.paramsData);
        },
        tooltipHoveredHandler1(value) {
            this.hovered1 = value;
        },
        tooltipHoveredHandler2(value) {
            this.hovered2 = value;
        },
        tooltipHoveredHandler3(value) {
            this.hovered3 = value;
        },
        tooltipHoveredHandler4(value) {
            this.hovered4 = value;
        },
    },
    watch: {
        form: {
            immediate: true,
            handler() {
                this.paramsData.alpha = `--alpha ${this.form.alpha}`;
                this.paramsData.dont_colorize = this.form.dont_colorize ? "--dont_colorize" : "";
                this.paramsData.flip = this.form.flip ? "--no_flip" : "";
                this.paramsData.content_loss = this.form.content_loss ? "--content_loss" : "";
                this.handleSubmit();
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.form-wrapper {
    display: flex;
    gap: 10rem;
}

.inpt {
    display: flex;
    gap: 1rem;
    position: relative;
    z-index: 10;

    &.hovered {
        z-index: 50;
    }
}

.alpha {
    label {
        display: flex;
        flex-direction: column;

        div:first-child {
            display: flex;
            gap: 1rem;
            line-height: 1.5rem;

            span {
                background-color: #E5E5E2;
                padding: 2px;
                border-radius: 5px;
            }
        }
    }
}


/*********** Baseline, reset styles ***********/
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 30rem;
}

/* Removes default focus */
input[type="range"]:focus {
    outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
    background-color: #1e2838;
    border-radius: 0.5rem;
    height: 0.1rem;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    margin-top: -6.4px;
    /* Centers thumb on the track */
    background-color: #00a499;
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
    outline: 3px solid #00a499;
    outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
    background-color: #1e2838;
    border-radius: 0.5rem;
    height: 0.2rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
    background-color: #00a499;
    border: none;
    /*Removes extra border that FF applies*/
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
}

input[type="range"]:focus::-moz-range-thumb {
    outline: 3px solid #00a499;
    outline-offset: 0.125rem;
}

//RADIO
.b-contain *,
.b-contain *::before,
.b-contain *::after {
    box-sizing: content-box !important;
}

.b-contain input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.b-contain span {
    line-height: 1.5;
    font-size: 1rem;
    font-family: inherit;
}

.b-contain {
    display: table;
    position: relative;
    padding-left: 2rem;
    cursor: pointer;
    margin-bottom: 0.4rem;
}

.b-contain input[type="checkbox"]~.b-input {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.25rem;
    width: 1.25rem;
    background: #E5E5E2;
    transition: background 250ms;
    border: 1px solid #F5F5F5;
    border-radius: 0.2rem;
}

.b-contain input[type="radio"]~.b-input {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.25rem;
    width: 1.25rem;
    background: #E5E5E2;
    transition: background 250ms;
    border: 1px solid #F5F5F5;
    border-radius: 3rem;
}

.b-contain input[type="checkbox"]~.b-input::after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 0.3rem;
    height: 0.6rem;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transition: background 250ms;
    transform: rotate(45deg);
}

.b-contain input[type="radio"]~.b-input::after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 4px;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 3rem;
    background: #ffffff;
    transition: background 250ms;
}

.b-contain input[type="checkbox"]:disabled~.b-input::after {
    border-color: #ffffff;
}

.b-contain input:checked~.b-input::after {
    display: block;
}

.b-contain:hover input[type="checkbox"]:not([disabled])~.b-input {
    background: #E5E5E2;
    border-color: transparent;
}

.b-contain input[type="checkbox"]:focus~.b-input {
    background: #E5E5E2;
    border-color: transparent;
}

.b-contain:hover input[type="radio"]:not([disabled])~.b-input,
.b-contain input[type="radio"]:focus~.b-input {
    background: #E5E5E2;
    border-color: transparent;
}

.b-contain input:focus~.b-input {
    box-shadow: 0 0 0 2px #00A499;
}

.b-contain input[type="checkbox"]:checked~.b-input {
    background: #00A499;
    border-color: transparent;
}

.b-contain input[type="radio"]:checked~.b-input {
    background: #00A499;
    border-color: transparent;
}

.b-contain input[type="checkbox"]:disabled~.b-input,
.b-contain input[type="radio"]:disabled~.b-input {
    opacity: 0.5;
    cursor: not-allowed;
}

.b-contain input[type="radio"]:disabled~.b-input::after {
    background: #ffffff;
}

.b-contain:hover input[type="checkbox"]:not([disabled]):checked~.b-input,
.b-contain input[type="checkbox"]:checked:focus~.b-input {
    background: #00A499;
    border-color: transparent;
}

.b-contain:hover input[type="radio"]:not([disabled]):checked~.b-input,
.b-contain input[type="radio"]:checked:focus~.b-input {
    background: #00A499;
    border-color: transparent;
}
</style>