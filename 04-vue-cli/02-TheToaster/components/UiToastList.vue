<template>
  <div v-if="toasts.length" class="toasts">
    <UiToast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
      @click="$emit('hide-toast', toast.id)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'UiToastList',
  components: { UiToast },
  props: {
    toasts: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: ['hide-toast'],
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
