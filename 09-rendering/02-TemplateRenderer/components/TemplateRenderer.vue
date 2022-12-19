<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    templateComponent() {
      return defineComponent({
        components: this.components,
        props: ['bindings'],
        render: compile(this.template),
      });
    },
  },

  render() {
    return h(this.templateComponent, { bindings: this.bindings });
  },
};
</script>
