import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  methods: {
    updateCount(e) {
      this.$emit('update:count', +e.target.value + 1);
    },
  },

  // Компонент должен иметь входной параметр и порождать событие

  template: `<button type="button" @click="updateCount" :value="count">{{ count }}</button>`,
});
