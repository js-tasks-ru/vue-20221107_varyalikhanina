import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView';
import { fetchMeetupById } from '../meetupService';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isError: false,
      isLoading: false,
      errMessage: '',
    };
  },

  watch: {
    meetupId(newVal, _) {
      this.getMeetup(newVal);
    },
  },

  mounted() {
    this.getMeetup(this.meetupId);
  },

  methods: {
    getMeetup() {
      this.isLoading = true;
      this.meetup = null;
      fetchMeetupById(this.meetupId)
        .then((res) => {
          this.meetup = res;
          this.isError = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.meetup = null;
          this.isError = true;
          this.errMessage = err.message;
          this.isLoading = false;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="!isError">
        <UiAlert v-if="isLoading">Загрузка...</UiAlert>
        <MeetupView v-if="meetup !== null" :meetup="meetup" />
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="isError">{{ errMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
