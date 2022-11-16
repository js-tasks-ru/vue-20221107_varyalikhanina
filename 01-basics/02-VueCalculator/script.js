import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      currentOperator: '',
      leftOperand: '',
      rightOperand: '',
    };
  },

  computed: {
    result() {
      switch (this.currentOperator) {
        case 'sum':
          return this.leftOperand + this.rightOperand;

        case 'subtract':
          return this.leftOperand - this.rightOperand;

        case 'multiply':
          return this.leftOperand * this.rightOperand;

        case 'divide':
          return this.leftOperand / this.rightOperand;

        default:
          return 0;
      }
    },
  },
});

const app = createApp(App);
app.mount('#app');
