<template>
    <div class="modelPage">
        <form @submit.prevent="sendData" style="display: none;">
            <div>
                <label for="id">ID:</label>
                <input type="number" id="id" v-model="id" required>
            </div>
            <div>
                <label for="content_image">Content image:</label>
                <input type="file" id="content_image" @change="encodeImage($event, 'content')" required>
            </div>
            <div>
                <label for="style_image">Style image:</label>
                <input type="file" id="style_image" @change="encodeImage($event, 'style')" required>
            </div>
            <button type="submit">Submit</button>
        </form>
        <div v-if="response">
            <h2>{{ response.id }}</h2>
            <img :src="response.output_image" alt="Image">
        </div>

        <div class="params"></div>
        <div class="images">
            <div class="left">
                <div class="content_image">
                    <button @click="openModal('content')">
                        <img v-if="contentImage" :src="contentImage" alt="Obrázok obsahu">
                        <div v-else class="no_image">
                            Vybrať obrázok obsahu
                        </div>
                    </button>
                </div>
                <div class="style_image">
                    <button @click="openModal('style')">
                        <img v-if="styleImage" :src="styleImage" alt="Obrázok štýlu">
                        <div v-else class="no_image">
                            Vybrať obrázok štýlu
                        </div>
                    </button>
                </div>
            </div>
            <div class="right">
                <div class="final_image">
                    <img src="../assets/logo.png" alt="">
                </div>
            </div>
        </div>

        <div class="btn">
            <button>Generovať</button>
        </div>
        <div class="modal" v-if="showModal" @click.self="showModal = false">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close-button" @click="showModal = false">&times;</span>
                    <h2>Orezanie obrázka</h2>
                </div>
                <div class="modal-body">
                    <CropModal :imageData="currImageData" @handleImageData="handleImageData" />
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
            contentImage: null,
            styleImage: null,
            response: null,
            type: null,
            currImageData: {
                image: this.contentImage,
                cropBoxData: null,
            }
        }
    },
    created() {
        console.log(this.id)
    },
    methods: {
        handleImageData(croppedData) {
            console.log("returned data");
            console.log(croppedData);
            console.log("returned data");
            if (this.type == "content") {
                this.contentImage = croppedData.image;
            }
            if (this.type == "style") {
                this.styleImage = croppedData.image;
            }
            this.showModal = false;

        },
        openModal(type) {
            this.type = type;
            this.showModal = true;
        },
        closeModal(event) {
            if (this.showModal && !event.target.closest('.modal-content')) {
                this.showModal = false
            }
        },



        encodeImage(event, type) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (type == "content")
                    this.contentImage = reader.result;
                if (type == "style")
                    this.styleImage = reader.result;

                console.log(reader.result)
            };
        },
        async sendData() {
            try {
                const response = await axios.post('api/model1', {
                    id: this.id,
                    contentImage: this.contentImage,
                    styleImage: this.styleImage,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.response = response.data;
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
        border: 2px white solid;

        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30%;
            border: 2px purple solid;

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
                    }

                    img {
                        min-height: 100%;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        border: 1px solid red;
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
            border: 2px yellow solid;

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
                    border: 1px solid red;
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
        max-height: 800px;
        overflow-y: auto;

        /* Modal content */
        .modal-content {
            background-color: $color-tertiary;
            padding: 1.5rem;
            border-radius: 5px;

            width: 65%;
            height: 80%;
            padding: 10px;
            box-sizing: border-box;
        }

        /* Modal header */
        .modal-header {
            display: flex;
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