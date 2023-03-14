<template>
    <div class="modelPage">


        <div class="params"></div>
        <div class="images">
            <div class="left">
                <div class="content_image">
                    <button @click="openModal('content')">
                        <img v-if="contentData.image" :src="contentData.image" alt="Obrázok obsahu">
                        <div v-else class="no_image">
                            Vybrať obrázok obsahu
                        </div>
                    </button>
                </div>
                <div class="style_image">
                    <button @click="openModal('style')">
                        <img v-if="styleData.image" :src="styleData.image" alt="Obrázok štýlu">
                        <div v-else class="no_image">
                            Vybrať obrázok štýlu
                        </div>
                    </button>
                </div>
            </div>
            <div class="right">
                <div class="final_image">
                    <img v-if="response" :src="response.output_image" alt="Image">
                    <div v-else class="no_response">
                        <h2>Výsledok nie je vygenerovaný</h2>
                    </div>
                </div>
            </div>
        </div>

        <form @submit.prevent="sendData">
            <div class="btn">
                <button type="submit" :disabled="disableBtn">Generovať</button>
            </div>

        </form>

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

export default {
    name: "ModelPage",
    components: {
        CropModal
    },
    data() {
        return {
            id: this.$route.params.id,
            showModal: false,
            disableBtn: false,

            response: null,
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
            currImageData: {}
        }
    },
    created() {
        console.log(this.id)
    },
    methods: {

        openModal(type) {
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
            try {
                this.disableBtn = true;
                const response = await axios.post('../api/model1', {
                    id: this.id,
                    contentData: this.contentData.image,
                    styleData: this.styleData.image,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 1200000000
                });

                this.response = response.data;
                this.disableBtn = false;
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
  
<style lang="scss">
$color-primary: #2E3532;
$color-secondary: #7E9181;
$color-tertiary: #C7CEDB;
$color-quaternary: #A0AAB2;

.modelPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .params {
        display: none;
        width: 70%;
        height: 14rem;
        background: $color-secondary;
        margin-bottom: 2rem;
    }

    .images {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: nowrap;
        margin-bottom: 2rem;

        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30%;

            &>div {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 30vh;
                overflow: hidden;



                button {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    outline: none;
                    border: none;

                    .no_image {
                        width: 100%;
                        height: 100%;
                        background-color: $color-quaternary;
                        border-radius: 20px;
                        font-size: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    img {
                        min-height: 100%;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                    }
                }

                &:first-child {
                    margin-bottom: 1rem;
                }


            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;

            &>div {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 60vh;
                overflow: hidden;

                img {
                    min-height: 100%;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .no_response {
                    width: 100%;
                    border: 1px solid $color-quaternary;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: $color-quaternary;
                    font-size: 2rem;
                }
            }
        }

    }

    .btn {
        button {
            cursor: pointer;
            color: $color-tertiary;
            background-color: $color-secondary;
            font-size: 2rem;
            border-radius: .8rem;
            width: 20rem;
            height: 5rem;
            transition: 0.2s all ease;
            outline: 0rem solid $color-tertiary;

            &:hover {
                transition: 0.2s all ease;
                outline: .2rem solid $color-tertiary;
            }
        }
    }



    //MODAL 

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);

        /* Modal content */
        .modal-content {
            background-color: $color-tertiary;
            padding: 1.5rem;
            border-radius: 5px;

            max-height: 800px;
            width: 65%;
            height: 85%;
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