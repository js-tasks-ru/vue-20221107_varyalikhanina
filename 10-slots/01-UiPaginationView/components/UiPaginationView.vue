<template>
  <div class="pagination-container">
    <slot v-for="item in currentPageContent" :item="item">></slot>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    currentPageContent() {
      const prevRange = (this.page - 1) * this.perPage;
      const currRange = this.page * this.perPage;
      return this.items.slice(prevRange, currRange);
    },
  },
};
</script>

<style></style>
