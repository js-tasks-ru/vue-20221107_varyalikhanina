import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: 'App',
  data() {
    return {
      currentMeetupId: 0,
      meetupTitle: '',
    };
  },

  watch: {
    currentMeetupId(newValue, _) {
      fetchMeetupById(newValue).then((res) => (this.meetupTitle = res.title));
    },
  },
});

const app = createApp(App);
app.mount('#app');
