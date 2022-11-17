import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image" />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />

            <h3>Программа</h3>
            <div>
              <MeetupAgenda v-if="meetup.agenda && meetup.agenda?.length" :agenda="meetup.agenda" />
              <ui-alert v-else-if="!meetup.agenda?.length">Программа пока пуста...</ui-alert>
            </div>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
