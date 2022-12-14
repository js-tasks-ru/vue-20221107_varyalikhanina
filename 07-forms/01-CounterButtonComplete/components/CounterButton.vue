<template>
  <button @click="handler">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  data() {
    return {
      localCount: this.count,
    };
  },
  watch: {
    count(newVal) {
      this.localCount = newVal;
    },
  },
  methods: {
    handler() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
