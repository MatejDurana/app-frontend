<template>
  <div>
    <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />

    <div class="top">
      <h2>Obrázky:</h2>
      <div class="imagesSelect">
        <div class="imageDiv" v-for="(image, index) in this.selectedImages" :key="index">
          <img :src="`../images/${image.src}`" @click="setClickedImage('../images/' + image.src)" />
        </div>
        alebo
        <a href="#" role="button" @click.prevent="showFileChooser">
          Nahrať vlastný
        </a>
      </div>
    </div>

    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper ref="cropper" :aspect-ratio="16 / 9" :src="defaultImage" preview=".preview" :guides="false"
            :center="false" :viewMode="2" :background="false" :autoCropArea="1" />
        </div>
        <div class="actions">
          <a href="#" role="button" @click.prevent="setCrop()">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/select.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>
          <a href="#" role="button" @click.prevent="setMove()">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/move.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>
          <a href="#" role="button" @click.prevent="zoom(0.2)">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/zoom_in.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/zoom_out.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>
          <a href="#" role="button" @click.prevent="rotate(-90)">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/rotate_left.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>
          <a href="#" role="button" @click.prevent="rotate(90)">
            <svg :width="iconSize" :height="iconSize">
              <image :xlink:href="`../icons/rotate_right.svg`" :width="iconSize" :height="iconSize" />
            </svg>
          </a>

          <a href="#" role="button" @click.prevent="reset"> Resetovať </a>
        </div>
      </section>
      <section class="preview-area">
        <p>Ukážka</p>
        <div class="preview" />
        <a href="#" role="button" @click.prevent="sendImage"> Potvrdiť </a>
      </section>
    </div>
  </div>
</template>
  
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: {
    VueCropper,
  },
  props: {
    imageData: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  computed: {
    selectedImages() {
      return this.type === "content" ? this.contentImages : this.styleImages;
    },
  },
  data() {
    return {
      iconSize: 20,
      contentImages: [
        { src: "dog.jpg" },
        { src: "einstein.jpeg" },
        { src: "town.jpeg" },
        { src: "nature.jpg" },
      ],
      styleImages: [
        { src: "night.jpg" },
        { src: "S1.jpg" },
        { src: "S2.jpg" },
        { src: "S3.jpg" },
      ],

      croppData: {
        fullImage: null,
        image: null,
        cropBoxData: null,
        imageData: null,
      },
      cropImg: "",
      fullImage: "",
      cropImageData: null,
      cropBoxData: null,
      width: 1920 / 4,
      height: 1080 / 4,
      defaultImage: "/images/dog.jpg",
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
    } else {
      let imgSrc = "/images/";
      if (this.type === "content") imgSrc += this.contentImages[0].src;
      else imgSrc += this.styleImages[0].src;

      this.fullImage = this.setClickedImage(imgSrc);
    }

    this.croppData = this.imageData;
  },
  methods: {
    sendImage() {
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas({
          width: this.width,
          height: this.height,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        })
        .toDataURL();

      this.getData();
      this.getCropBoxData();

      this.croppData.image = this.cropImg;
      this.croppData.fullImage = this.fullImage;
      this.croppData.cropBoxData = this.cropBoxData;
      this.croppData.cropImageData = this.cropImageData;

      this.$emit("handleImageData", this.croppData);
    },

    async setClickedImage(src) {
      const response = await fetch(src);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        this.fullImage = reader.result;
        this.$refs.cropper.replace(this.fullImage);
      };
    },

    getCropBoxData() {
      this.cropBoxData = JSON.stringify(
        this.$refs.cropper.getCropBoxData(),
        null,
        4
      );
    },
    getData() {
      this.cropImageData = JSON.stringify(
        this.$refs.cropper.getData(),
        null,
        4
      );
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
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf("image/") === -1) {
        alert("Prosím zvoľte súbor s obrázkom");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.fullImage = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Prepáčte, FileReader API toto nepodporuje");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    setCrop() {
      this.$refs.cropper.setDragMode("crop");
    },
    setMove() {
      this.$refs.cropper.setDragMode("move");
    },
  },
};
</script>
  
<style lang="scss">
$color1: #f5f5f5;
$color2: #00a499;
$color3: #222020;
$color4: #e5e5e2;
$color5: #1e2838;

input[type="file"] {
  display: none;
}

.top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-inline: 2rem;
  margin-bottom: 2rem;
  gap: 2rem;

  .imagesSelect {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    .imageDiv {
      cursor: pointer;
      width: 100px;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }
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

.actions a,
.top .imagesSelect a,
.preview-area a {
  display: inline-block;
  padding: 5px 25px;
  text-decoration: none;

  color: $color1;
  background-color: $color2;
  font-size: 1.1vw;
  border-radius: 0.8rem;
  transition: 0.2s all ease;

  &:hover {
    transition: 0.2s all ease;
    background-color: $color5;
    color: $color1;
  }
}

.actions {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7vw;
  margin-bottom: 1rem;

  a {
    padding: 0.5rem;
    display: inline-flex;

    svg {
      display: block;
    }
  }
}

.top .imagesSelect a {
  font-size: 1rem;
}

.preview-area {
  display: flex;
  flex-direction: column;
  width: 30%;

  a {
    margin-top: 1rem;
    text-align: center;
  }
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
</style>