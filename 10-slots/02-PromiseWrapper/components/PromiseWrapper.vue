<template>
  <slot v-if="result" name="fulfilled" :result="result"></slot>
  <slot v-else-if="error" name="rejected" :error="error"></slot>
  <slot v-else name="pending"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },
  watch: {
    promise: {
      immediate: true,
      async handler() {
        this.result = null;
        this.error = null;
        await this.getPromiseRes();
      },
    },
  },
  methods: {
    async getPromiseRes() {
      try {
        this.result = await this.promise;
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
