<template>
  <div class="image-uploader">
    <label
      :class="['image-uploader__preview', { 'image-uploader__preview-loading': state === 'loading' }]"
      :style="backgroundImage && `--bg-url: url('${backgroundImage}')`"
    >
      <span class="image-uploader__text">{{ inputTextVars[state] }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="inputHandler"
        @click="removeImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      state: this.preview ? 'ready' : 'empty',
      inputTextVars: { empty: 'Загрузить изображение', loading: 'Загрузка...', ready: 'Удалить изображение' },
      image: null,
    };
  },
  computed: {
    backgroundImage() {
      return this.preview || this.image;
    },
  },
  methods: {
    inputHandler(e) {
      let file = e.target.files[0];
      this.image = URL.createObjectURL(file);
      this.$emit('select', file);
      this.state = 'loading';
      if (this.uploader) {
        return this.uploader(file)
          .then((res) => {
            this.state = 'ready';
            this.$emit('upload', res);
          })
          .catch((err) => {
            this.state = 'empty';
            this.deleteImage();
            this.$emit('error', err);
          });
      } else {
        this.state = 'ready';
      }
    },
    removeImage(e) {
      if (this.state !== 'empty') {
        e.preventDefault();
        if (this.state === 'ready') {
          this.state = 'empty';
          this.deleteImage();
          this.$emit('remove');
        }
      }
    },
    deleteImage() {
      this.image = null;
      this.$refs['input'].value = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}
.image-uploader__input {
  opacity: 0;
  height: 0;
}
.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}
.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}
.image-uploader__preview:hover {
  border-color: var(--blue);
}
.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
