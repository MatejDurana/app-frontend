<template>
    <div class="modelPage">
        <form @submit.prevent="sendData" style="display:none">
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
                <img src="../assets/images/einstein.jpeg" alt="">
                <img src="../assets/images/picasso.jpg" alt="">
            </div>
            <div class="right">
                <img src="../assets/logo.png" alt="">
            </div>
        </div>

        <div class="btn">
            <button>Generovať</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "ModelPage",
    data() {
        return {
            id: this.$route.params.id,
            content_image: null,
            style_image: null,
            response: null
        }
    },
    created() {
        console.log(this.id)
    },
    methods: {
        encodeImage(event, type) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (type == "content")
                    this.content_image = reader.result;
                if (type == "style")
                    this.style_image = reader.result;
            };
        },
        async sendData() {
            try {
                const response = await axios.post('api/model1', {
                    id: this.id,
                    content_image: this.content_image,
                    style_image: this.style_image,
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

            img {
                border: 1px solid red;
                min-width: 500px;
                max-height: 350px;
                width: auto;
                &:first-child{
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
            img {
                border: 1px solid red;
                width: 70%;
                height: auto;
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
}</style>