<template>
  <UiToastList :toasts="toasts" @hide-toast="hideToast" />
</template>

<script>
import UiToastList from './UiToastList.vue';

const visibleFor = 5000;

export default {
  name: 'TheToaster',
  components: { UiToastList },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    error(message) {
      const item = {
        message,
        type: 'error',
        visibleFor: visibleFor,
        id: Date.now(),
      };
      this.addItem(item);
    },
    success(message) {
      const item = {
        message,
        type: 'success',
        visibleFor: visibleFor,
        id: Date.now(),
      };
      this.addItem(item);
    },
    addItem(item) {
      this.toasts.push(item);
      setTimeout(() => {
        this.hideToast(item.id);
      }, visibleFor);
    },
    hideToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
};
</script>
