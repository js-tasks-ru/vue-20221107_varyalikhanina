import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },

  computed: {
    hasImageStyle(props) {
      if (!props.image) return;
      return { '--bg-url': 'url(' + props.image + ')' };
    },
  },

  template: `
    <div class="meetup-cover" :style="hasImageStyle">
        <!-- Ссылка выше - пример верстки при наличии изображения, а не изображение по умолчанию. -->
        <!-- Изображение по умолчанию уже есть в стилях. Для его вывода достаточно не добавлять никаких стилей. -->
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
