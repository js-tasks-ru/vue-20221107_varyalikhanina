<template>
  <ui-input v-bind="$attrs" :modelValue="modelValueProxy" :type="type" @change="inputChange">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

const possibleInputTypes = ['date', 'time', 'datetime-local'];

export default {
  name: 'UiInputDate',

  components: { UiInput },
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return possibleInputTypes.includes(val);
      },
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    modelValueProxy() {
      if (!this.modelValue) return '';
      const date = new Date(this.modelValue).toISOString();
      switch (this.type) {
        case 'time':
          return date.substring(11, 16);
        case 'datetime-local':
          return date.substring(0, 16);
        case 'date':
          return date.substring(0, 10);
        default:
          return '';
      }
    },
  },
  methods: {
    inputChange(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber);
    },
  },
};
</script>
