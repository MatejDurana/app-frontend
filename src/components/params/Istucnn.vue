<template>
    <form class="form-wrapper" @submit.prevent>
        <div class="col">
            <div :class="[hovered2 ? 'hovered' : '', 'inpt range']">
                <label for="cw-input" class="form-label">
                    <div>
                        Content weight:
                        <span>{{ form.cw }}</span>
                        <toolTip message="Váha vlastností obrázka obsahu (10^x, kde x je zvolené číslo)"
                            @tooltip-hovered="tooltipHoveredHandler2" />
                    </div>
                    <div>
                        <input type="range" id="cw-input" min="2" max="5" step="1" v-model="form.cw" class="form-input" />
                    </div>
                </label>

            </div>

            <div :class="[hovered1 ? 'hovered' : '', 'inpt range']">
                <label for="sw-input" class="form-label">
                    <div>
                        Style weight:
                        <span>{{ form.sw }}</span>
                        <toolTip message="Váha vlastností obrázka štýlu (10^x, kde x je zvolené číslo)"
                            @tooltip-hovered="tooltipHoveredHandler1" />
                    </div>
                    <div>
                        <input type="range" id="sw-input" min="1" max="5" step="1" v-model="form.sw" class="form-input" />
                    </div>
                </label>

            </div>

            <div :class="[hovered3 ? 'hovered' : '', 'inpt range']">
                <label for="tw-input" class="form-label">
                    <div>
                        Total weight:
                        <span>{{ form.tw }}</span>
                        <toolTip message="Sila hladkosti (smoothness) (10^x, kde x je zvolené číslo)"
                            @tooltip-hovered="tooltipHoveredHandler3" />
                    </div>
                    <div>
                        <input type="range" id="tw-input" min="-1" max="6" step="1" v-model="form.tw" class="form-input" />
                    </div>
                </label>

            </div>
        </div>
        <div class="col">
            <div :class="[hovered4 ? 'hovered' : '', 'inpt rdio']">
                <div class="title">
                    Init:
                    <toolTip message="Počiatočný obrázok, z ktorého sa začne generovanie"
                        @tooltip-hovered="tooltipHoveredHandler4" />
                </div>
                <label class="b-contain">
                    <span>Obrázok obsahu</span>
                    <input type="radio" value="content" v-model="form.initValue">
                    <div class="b-input"></div>
                </label>

                <label class="b-contain">
                    <span>Obrázok štýlu</span>
                    <input type="radio" value="style" v-model="form.initValue">
                    <div class="b-input"></div>
                </label>

                <label class="b-contain">
                    <span>Uniformný obrázok</span>
                    <input type="radio" value="random" v-model="form.initValue">
                    <div class="b-input"></div>
                </label>
            </div>
        </div>
        <div class="col">
            <div class="inpt rdio">
                <div class="title">
                    Sieť:
                </div>
                <label class="b-contain">
                    <span>VGG-19</span>
                    <input type="radio" value="vgg19" v-model="form.model">
                    <div class="b-input"></div>
                </label>

                <label class="b-contain">
                    <span>VGG-16</span>
                    <input type="radio" value="vgg16" v-model="form.model">
                    <div class="b-input"></div>
                </label>

            </div>
        </div>
        <div class="col">
            <div class="inpt rdio">
                <div class="title">
                    Optimalizátor:
                </div>
                <label class="b-contain">
                    <span>LBFGS</span>
                    <input type="radio" value="lbfgs" v-model="form.opt">
                    <div class="b-input"></div>
                </label>

                <div class="adam">
                    <label class="b-contain">
                        <span>ADAM</span>
                        <input type="radio" value="adam" v-model="form.opt">
                        <div class="b-input"></div>
                    </label>
                    <toolTip message="Ideálne použiť v kombinácií s Total weight: -1" />
                </div>

            </div>
        </div>


    </form>
</template>
  
<script>
import toolTip from './ToolTip.vue';

export default {
    name: "paramsGordic",
    components: {
        toolTip,
    },
    data() {
        return {
            form: {
                cw: 5,
                sw: 4,
                tw: 0,
                initValue: 'content',
                model: 'vgg19',
                opt: 'lbfgs'
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
                this.paramsData.iters = `--content_weight 1e${this.form.cw}`;
                this.paramsData.cw = `--style_weight 1e${this.form.sw}`;
                this.paramsData.tw = `--tv_weight 1e${this.form.tw}`;
                this.paramsData.initValue = `--init_method ${this.form.initValue}`;
                this.paramsData.pooling = `--model ${this.form.model}`;
                this.paramsData.optimizer = `--optimizer ${this.form.opt}`;

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
    gap: 6rem;
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

.rdio {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    .title {
        display: flex;
        gap: 1rem;
        line-height: 1.5rem;
        margin-bottom: 0.5rem;
    }
}

.adam {
    line-height: 1.5rem;
    gap: .6rem;
    display: flex;

    .container {
        margin-top: -0.08rem;
    }
}

.range {
    margin-bottom: 1rem;

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


input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 30rem;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    background-color: #1e2838;
    border-radius: 0.5rem;
    height: 0.1rem;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -6.4px;
    background-color: #00a499;
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
    outline: 3px solid #00a499;
    outline-offset: 0.125rem;
}

input[type="range"]::-moz-range-track {
    background-color: #1e2838;
    border-radius: 0.5rem;
    height: 0.2rem;
}

input[type="range"]::-moz-range-thumb {
    background-color: #00a499;
    border: none;
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