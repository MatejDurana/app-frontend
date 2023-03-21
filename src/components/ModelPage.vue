<template>
    <div class="modelPage">
        <div :class="['params', isParamsShown ? 'shown' : '']" ref="params">
            <div class="content">
                <div class="btn" @click="this.isParamsShown = !this.isParamsShown">
                    <span>Parametre</span>
                </div>
            </div>
        </div>
        <div class="images">
            <div class="left">
                <div class="content_image">
                    <span>Obrázok obsahu</span>
                    <button @click="openModal('content')">
                        <img v-if="contentData.image" :src="contentData.image" alt="Obrázok obsahu">
                        <div v-else class="no_image">
                            Vybrať obrázok obsahu
                        </div>
                    </button>
                </div>
                <div class="style_image">
                    <span>Obrázok štýlu</span>
                    <button @click="openModal('style')">
                        <img v-if="styleData.image" :src="styleData.image" alt="Obrázok štýlu">
                        <div v-else class="no_image">
                            Vybrať obrázok štýlu
                        </div>
                    </button>
                </div>
            </div>
            <div class="right">
                <span>Výsledný obrázok</span>
                <div class="final_image">
                    <Loading :active="this.isRunning" loader="bars" color="#00A499" :can-cancel="false"
                        :is-full-page="false" :width=200 :height=200>
                    </Loading>
                    <img v-if="response_image" :src="response_image" alt="Image">
                    <div v-else class="no_response">
                        <h2>Výsledok nie je vygenerovaný</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons">
            <form @submit.prevent="sendData">
                <div class="btn">
                    <button type="submit" :disabled="disableGenBtn"
                        :class="[isRunning ? 'hidden' : '', ' generateBtn']">Generovať</button>
                </div>
            </form>
            <form @submit.prevent="closeProcess">
                <div class="btn">
                    <button type="submit" :disabled="disableCloseBtn" :class="[isRunning ? '' : 'hidden', ' closeBtn']">{{
                        disableCloseBtn ? 'Ukončujem..' : 'Ukončiť' }}</button>
                </div>
            </form>
        </div>

        <div class="modal" v-if="showModal" @click.self="showModal = false">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Orezanie obrázka:</h2>
                    <span class="close-button" @click="showModal = false">&times;</span>
                </div>
                <div class="modal-body">
                    <CropModal :imageData="currImageData" :type="this.type" @handleImageData="handleImageData" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import CropModal from './CropModal.vue';

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';


export default {
    name: "ModelPage",
    components: {
        CropModal,
        Loading
    },
    data() {
        return {
            id: this.$route.params.id,
            showModal: false,
            disableGenBtn: false,
            disableCloseBtn: true,
            isRunning: false,

            response_image: null,
            type: null,
            contentData: {
                fullImage: null,
                image: null,
                cropBoxData: null,
                imageData: null,
            },
            styleData: {
                fullImage: null,
                image: null,
                cropBoxData: null,
                imageData: null,
            },
            currImageData: {},

            isParamsShown: false,
            params: ''
        }
    },
    created() {
        //console.log(this.id)

        //asanoa
        // p.add_argument('--init', **arg_info('init'),
        //            choices=['content', 'gray', 'uniform', 'style_mean'],
        // p.add_argument('--pooling', type=str, default='max', choices=['max', 'average', 'l2'],
        // help='the model\'s pooling mode')
        // p.add_argument('--step-size', '-ss', **arg_info('step_size'),
        //            help='the step size (learning rate)')
        // p.add_argument('--initial-iterations', '-ii', **arg_info('initial_iterations'),
        // help='the number of iterations on the first scale')
        // p.add_argument('--random-seed', '-r', type=int, default=0,
        //            help='the random seed')
        // p.add_argument('--content-weight', '-cw', **arg_info('content_weight'),
        //             help='the content weight')
        // p.add_argument('--tv-weight', '-tw', **arg_info('tv_weight'),
        //            help='the smoothing weight')
        // p.add_argument('--style-weights', '-sw', type=float, nargs='+', default=None,
        // metavar='STYLE_WEIGHT', help='the relative weights for each style image')


        //gordic
        // parser.add_argument("--content_weight", type=float,
        //                 help="weight factor for content loss", default=1e5)
        // parser.add_argument("--style_weight", type=float,
        //                     help="weight factor for style loss", default=3e4)
        // parser.add_argument("--tv_weight", type=float,
        //                     help="weight factor for total variation loss", default=1e0)

        // parser.add_argument("--optimizer", type=str,
        //                     choices=['lbfgs', 'adam'], default='lbfgs')
        // parser.add_argument("--model", type=str,
        //                     choices=['vgg16', 'vgg19'], default='vgg19')
        // parser.add_argument("--init_method", type=str,
        //                     choices=['random', 'content', 'style'], default='content')


        this.params = '--init_method random --content_weight 1000 --style_weight 30 --tv_weight 0.1'
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
        this.closeProcess()
    },
    methods: {

        handleClickOutside(event) {
            if (this.isParamsShown) {
                if (!this.$refs.params.contains(event.target)) {
                    this.isParamsShown = false
                }
            }
        },

        openModal(type) {
            if (this.isRunning)
                return;
            this.type = type;
            if (this.type == "content") {
                this.currImageData = this.contentData;
            }
            if (this.type == "style") {
                this.currImageData = this.styleData;
            }
            this.showModal = true;
        },
        closeModal(event) {
            if (this.showModal && !event.target.closest('.modal-content')) {
                this.showModal = false
            }
        },

        handleImageData(croppedData) {

            if (this.type == "content") {
                this.contentData = croppedData;
            }
            if (this.type == "style") {
                this.styleData = croppedData;
            }
            this.showModal = false;

        },


        encodeImage(event, type) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (type == "content")
                    this.contentData.image = reader.result;
                if (type == "style")
                    this.styleData.image = reader.result;

                console.log(reader.result)
            };
        },


        async sendData() {
            if (!this.contentData.image) {
                this.$toast('Zabudli ste vybrať obrátok obsahu', {
                    duration: 3000,
                    class: 'toast',
                    type: 'error',
                });
                return
            }
            if (!this.styleData.image) {
                this.$toast('Zabudli ste vybrať obrátok štýlu', {
                    duration: 3000,
                    class: 'toast',
                    type: 'error',
                });
                return
            }
            try {

                this.disableCloseBtn = false;
                this.disableGenBtn = true;
                this.response_image = null


                const response = await axios.post('../api/startProcess', {
                    id: this.id,
                    contentData: this.contentData.image,
                    styleData: this.styleData.image,
                    params: this.params
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                //this.response = response.data;
                console.log(response.data)

                this.isRunning = true;

                let intervalTime = 1000;

                // if (this.id == "anaoas")
                //     intervalTime = 1000;
                // else if (this.id == "msg-net-istucnn")
                //     intervalTime = 1000;
                // else if (this.id == "istucnn-2")
                //     intervalTime = 5000;
                // else if (this.id == "nnst")
                //     intervalTime = 1000;

                this.checkProcess(intervalTime);

            } catch (error) {
                console.error(error);
            }
        },
        async checkProcess(intervalTime) {
            let intervalId = setInterval(async () => {
                console.log("Checkujem")
                try {
                    const response = await axios.post('../api/checkProcess', {}, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    let res = response.data
                    console.log(res)

                    if (res.output_image)
                        this.response_image = res.output_image

                    if (!res.isRunning) {
                        this.isRunning = false
                        this.disableGenBtn = false;
                        this.$toast('Generovanie skončilo', {
                            duration: 3000,
                            styles: {
                                "background-color": "#00A499"
                            },
                            class: 'toast',
                            type: 'success'
                        });
                        console.log("Process skoncil, koncim check")
                        clearInterval(intervalId);
                    }


                } catch (error) {
                    console.error(error);
                }
            }, intervalTime);

        },
        async closeProcess() {
            this.disableCloseBtn = true;
            try {
                const response = await axios.post('../api/closeProcess', {}, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                console.log(response.data);

            } catch (error) {
                console.error(error);
                this.disableCloseBtn = false;
            }
        }
    }
}
</script>
  
<style lang="scss">
$color1: #F5F5F5;
$color2: #00A499;
$color3: #1A1A1A;
$color4: #E5E5E2;
$color5: #1E2838;

.toast {
    font-family: "Drive", sans-serif;
}

.modelPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;

    .params {
        position: absolute;
        width: 70%;
        height: 14rem;
        background: $color1;
        z-index: 50;

        transition: all 0.5s ease-in-out;
        top: -14rem;
        border-radius: 20px;

        &.shown {
            transition: all 0.5s ease-in-out;
            top: 1rem;
        }

        .content {
            position: relative;
            width: 100%;
            height: 100%;

            .btn {
                border-radius: 20px;
                cursor: pointer;
                position: absolute;
                bottom: -3rem;
                left: 50%;
                transform: translateX(-50%);

                width: 20%;
                height: 3.4rem;
                background-color: $color2;

                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    color: $color1;
                    font-size: 1.4rem;
                }
            }
        }
    }

    .images {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        margin-bottom: 3vh;

        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30%;
            margin-left: 10%;

            &>div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                overflow: hidden;

                span {
                    font-size: 3vh;
                    color: $color3;
                    margin-bottom: 1vh;
                }

                button {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    width: 25vw;
                    height: 14.0625vw;
                    background-color: transparent;
                    outline: none;
                    border: none;

                    .no_image {
                        width: 100%;
                        height: 100%;
                        background-color: $color2;
                        border-radius: 20px;
                        font-size: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: $color1;

                        transition: 0.2s all ease;

                        &:hover {
                            transition: 0.2s all ease;
                            font-size: 1.6rem;
                            background-color: $color5;
                        }

                    }

                    img {
                        min-height: 100%;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        border: 5px solid $color1;
                    }
                }

                &:first-child {
                    margin-bottom: 2vh;
                }


            }
        }

        .right {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 50%;

            span {
                font-size: 3vh;
                color: $color3;
                margin-bottom: 1vh;
            }

            .final_image {
                display: flex;
                justify-content: center;
                width: 40vw;
                height: 22.5vw;
                overflow: hidden;
                position: relative;

                svg {
                    position: relative;
                    left: 7% !important;
                }


                .spinner {
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    background-color: red;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    &.hidden {
                        //display: none;
                    }
                }

                img {
                    min-height: 100%;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border: 5px solid $color1;
                }

                .no_response {
                    width: 100%;
                    border: 5px solid $color1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: $color3;
                    font-size: 1.5rem;
                }
            }
        }

    }


    .buttons {
        display: flex;

        .btn {
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

                &.hidden {
                    display: none;
                }
            }
        }



        .generateBtn {}

        .closeBtn {}
    }

    //MODAL 

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);

        /* Modal content */
        .modal-content {
            background-color: $color1;
            padding: 1.5rem;
            border-radius: 5px;

            max-height: 90vh;
            width: 70vw;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
        }

        /* Modal header */
        .modal-header {
            display: flex;
            padding-inline: 2rem;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        /* Close button */
        .close-button {
            font-size: 25px;
            font-weight: bold;
            cursor: pointer;
        }

        /* Modal body */
        .modal-body {}
    }



}
</style>