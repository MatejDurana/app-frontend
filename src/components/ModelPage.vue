<template>
    <div class="modelPage" v-if="isModel">
        <div :class="['params', this.id, isParamsShown ? 'shown' : '']" ref="params" v-if="this.id != 'msg-net-istucnn'">
            <div class="content">
                <div class="inner">
                    <paramsNnst v-if="this.id == 'nnst'" @paramsData="handleparamsData" />
                    <paramsIstucnn v-if="this.id == 'istucnn-2'" @paramsData="handleparamsData" />
                    <paramsAnaoas v-if="this.id == 'anaoas'" @paramsData="handleparamsData" />
                </div>
                <span class="warn">Zmena parametrov môže ovplyvniť čas generovania výsledného obrázku</span>
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
                <div class="final_image" @mouseenter="this.notHovering = false" @mouseleave="this.notHovering = true">
                    <Loading :active="this.isRunning && this.notHovering" loader="bars" color="#00A499" :can-cancel="false"
                        :is-full-page="false" :width=200 :height=200 :z-index=25>
                    </Loading>
                    <div v-if="response_image">
                        <a v-if="!this.isRunning" :href="response_image" download="vysledny_obrazok.png">
                            <img :src="response_image" alt="Výsledný obrázok">
                        </a>
                        <img v-else :src="response_image" alt="Výsledný obrázok">
                    </div>
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
                    <h2>Výber obrázka:</h2>
                    <span class="close-button" @click="showModal = false">&times;</span>
                </div>
                <div class="modal-body">
                    <CropModal :imageData="currImageData" :type="this.type" @handleImageData="handleImageData" />
                </div>
            </div>
        </div>
    </div>
    <div class="notModel" v-else>
        Tento model neexistuje, skontrolujte adresu URL
    </div>
</template>
  
<script>
import axios from 'axios';
import CropModal from './CropModal.vue';

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import paramsNnst from './params/Nnst.vue';
import paramsIstucnn from './params/Istucnn.vue';
import paramsAnaoas from './params/Anaoas.vue';


export default {
    name: "ModelPage",
    components: {
        CropModal,
        Loading,

        paramsNnst,
        paramsIstucnn,
        paramsAnaoas,
    },
    data() {
        return {
            isModel: false,

            paramsData: {},

            id: this.$route.params.id,
            showModal: false,
            disableGenBtn: false,
            disableCloseBtn: true,
            isRunning: false,
            notHovering: true,

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
            params: '',

            host: "http://158.196.145.23",
            port: "10100"
        }
    },
    created() {
        if (this.id == "nnst" || this.id == "istucnn-2" || this.id == "anaoas" || this.id == "msg-net-istucnn")
            this.isModel = true;
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
        this.closeProcess()
    },
    methods: {
        handleparamsData(paramsData) {
            this.paramsData = paramsData;
        },


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

            this.params = Object.values(this.paramsData).join(' ');
            await this.$nextTick();
            try {

                this.disableCloseBtn = false;
                this.disableGenBtn = true;
                this.response_image = null;

                await axios.post(this.host + ':' + this.port + '/startProcess', {
                    id: this.id,
                    contentData: this.contentData.image,
                    styleData: this.styleData.image,
                    params: this.params
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                this.isRunning = true;
                this.checkProcess(1000);

            } catch (error) {
                this.$toast('Server nie je dostupný', {
                    duration: 2000,
                    class: 'toast',
                    type: 'error'
                });
                this.disableCloseBtn = true;
                this.disableGenBtn = false;
                this.isRunning = false;
            }
        },
        async checkProcess(intervalTime) {
            let intervalId = setInterval(async () => {
                try {
                    const response = await axios.post(this.host + ':' + this.port + '/checkProcess', {}, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    let res = response.data

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
                        clearInterval(intervalId);
                    }


                } catch (error) {
                    this.$toast('Nastala chyba na strane servera, proces bol ukončený', {
                        duration: 4000,
                        class: 'toast',
                        type: 'error'
                    });
                    this.disableCloseBtn = true;
                    this.disableGenBtn = false;
                    this.isRunning = false;
                    clearInterval(intervalId);
                }
            }, intervalTime);

        },
        async closeProcess() {
            this.disableCloseBtn = true;
            try {
                await axios.post(this.host + ':' + this.port + '/closeProcess', {}, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            } catch (error) {
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

.notModel {
    font-size: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

        &.nnst {
            height: 12rem;
            top: -12rem;
        }

        &.anaoas,
        &.istucnn-2 {
            height: 18rem;
            top: -18rem;
        }

        &.shown {
            transition: all 0.5s ease-in-out;
            top: .5rem;
        }

        .content {
            position: relative;
            width: 100%;
            height: 100%;

            .inner {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 2rem;
            }

            .warn {
                display: block;
                position: absolute;
                bottom: 1.5rem;
                left: 50%;
                transform: translateX(-50%);
                color: $color3;
            }

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