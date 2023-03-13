<template>
    <div>

        <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />
        <img ref="einstein" src="../assets/images/einstein.jpeg" alt="Einstein">
        <div class="content">
            <section class="cropper-area">
                <div class="img-cropper">
                    <vue-cropper ref="cropper" :aspect-ratio="16 / 9" :src="require(`@/assets/images/einstein.jpeg`)"
                        preview=".preview" :guides=false :center=false :viewMode=2 :background=false />

                </div>
                <div class="actions">
                    <a href="#" role="button" @click.prevent="setCrop()">
                        +
                    </a>
                    <a href="#" role="button" @click.prevent="setMove()">
                        X
                    </a>
                    <a href="#" role="button" @click.prevent="zoom(0.2)">
                        Zoom In
                    </a>
                    <a href="#" role="button" @click.prevent="zoom(-0.2)">
                        Zoom Out
                    </a>
                    <a href="#" role="button" @click.prevent="move(-10, 0)">
                        Move Left
                    </a>
                    <a href="#" role="button" @click.prevent="move(10, 0)">
                        Move Right
                    </a>
                    <a href="#" role="button" @click.prevent="move(0, -10)">
                        Move Up
                    </a>
                    <a href="#" role="button" @click.prevent="move(0, 10)">
                        Move Down
                    </a>
                    <a href="#" role="button" @click.prevent="rotate(90)">
                        Rotate +90deg
                    </a>
                    <a href="#" role="button" @click.prevent="rotate(-90)">
                        Rotate -90deg
                    </a>
                    <a ref="flipX" href="#" role="button" @click.prevent="flipX">
                        Flip X
                    </a>
                    <a ref="flipY" href="#" role="button" @click.prevent="flipY">
                        Flip Y
                    </a>
                    <a href="#" role="button" @click.prevent="cropImage">
                        Orezať
                    </a>
                    <a href="#" role="button" @click.prevent="reset">
                        Resetovať
                    </a>
                    <a href="#" role="button" @click.prevent="showFileChooser">
                        Nahrať obrázok
                    </a>
                    <a href="#" role="button" @click.prevent="sendImage">
                        Potvrdiť
                    </a>
                </div>
            </section>
            <section class="preview-area">
                <p>Ukážka</p>
                <div class="preview" />
                <p>Vyrezaný obrázok</p>
                <div class="cropped-image">
                    <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
                    <div v-else class="crop-placeholder" />
                </div>
            </section>
        </div>
    </div>
</template>
  
<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    components: {
        VueCropper,
    },
    props: {
        imageData: {
            type: Object,
        },
    },
    data() {
        return {
            croppData: {
                fullImage: null,
                image: null,
                cropBoxData: null,
                imageData: null,
            },
            cropImg: '',
            fullImage: '',
            cropImageData: null,
            cropBoxData: null,
            width: 1920 / 4,
            height: 1080 / 4,
        };
    },
    mounted() {

        if (this.imageData.fullImage) {
            this.$refs.cropper.replace(this.imageData.fullImage);
            this.fullImage = this.imageData.fullImage;
            this.cropBoxData = this.imageData.cropBoxData;
            this.cropImageData = this.imageData.cropImageData;

            setTimeout(() => {
                this.setCropBoxData();
                this.setData();
            }, 200);

        }
        else {
            console.log("Vkladam default einstein");
            this.fullImage = this.convertImageToBase64()
        }

        this.croppData = this.imageData;

    },
    methods: {
        cropImage() {
            this.cropImg = this.$refs.cropper.getCroppedCanvas({
                width: this.width,
                height: this.height,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            }).toDataURL();


            this.getData();
            this.getCropBoxData();

        },
        sendImage() {
            if (this.cropImg == '') {
                alert("Vyrežte obrázok")
                return
            }

            this.croppData.image = this.cropImg;
            this.croppData.fullImage = this.fullImage;
            this.croppData.cropBoxData = this.cropBoxData;
            this.croppData.cropImageData = this.cropImageData;

            this.$emit('handleImageData', this.croppData)
        },

        convertImageToBase64() {
            const canvas = document.createElement('canvas')
            canvas.width = this.$refs.einstein.width
            canvas.height = this.$refs.einstein.height
            canvas.getContext('2d').drawImage(this.$refs.einstein, 0, 0)

            const base64 = canvas.toDataURL()
            return base64;
        },


        getCropBoxData() {
            this.cropBoxData = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
        },
        getData() {
            this.cropImageData = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        },
        setCropBoxData() {
            if (!this.cropBoxData) return;
            this.$refs.cropper.setCropBoxData(JSON.parse(this.cropBoxData));
        },
        setData() {
            if (!this.cropImageData) return;
            this.$refs.cropper.setData(JSON.parse(this.cropImageData));
        },


        move(offsetX, offsetY) {
            this.$refs.cropper.move(offsetX, offsetY);
        },
        reset() {
            this.$refs.cropper.reset();
        },
        flipX() {
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute('data-scale', scale);
        },
        flipY() {
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute('data-scale', scale);
        },
        rotate(deg) {
            this.$refs.cropper.rotate(deg);
        },

        setImage(e) {
            const file = e.target.files[0];

            if (file.type.indexOf('image/') === -1) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.fullImage = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        showFileChooser() {
            this.$refs.input.click();
        },
        zoom(percent) {
            this.$refs.cropper.relativeZoom(percent);
        },
        setCrop() {
            this.$refs.cropper.setDragMode('crop')
        },
        setMove() {
            this.$refs.cropper.setDragMode('move')
        }
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
input[type="file"] {
    display: none;
}

.content {
    display: flex;
    justify-content: space-around;
}

.cropper-area {
    width: 50%;
}


.img-cropper {
    height: 300px;
    overflow: hidden;

    &>div {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
}

.actions {
    margin-top: 1rem;
}

.actions a {
    display: inline-block;
    padding: 5px 15px;
    background: #0062CC;
    color: white;
    text-decoration: none;
    border-radius: 3px;
    margin-right: 1rem;
    margin-bottom: 1rem;
}

textarea {
    width: 100%;
    height: 100px;
}

.preview-area {
    width: 30%;
}

.preview-area p {
    font-size: 1.25rem;
    margin: 0;
    margin-bottom: 1rem;
}

.preview-area p:last-of-type {
    margin-top: 1rem;
}

.preview {
    width: 100%;
    height: calc(372px * (9 / 16));
    overflow: hidden;
}

.crop-placeholder {
    width: 100%;
    height: 200px;
    background: #ccc;
}

.cropped-image img {
    max-width: 100%;
}
</style>