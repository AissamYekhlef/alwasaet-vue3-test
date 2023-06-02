<script>
import { ref } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState('emails', ['emails', 'selectedEmailsIds']),
    ...mapGetters('emails', ['getArchivedEmails', 'getNonArchivedEmails', 'getSelectedEmailsCount', 'isSelectedEmail', 'isAllSelectedEmails', 'isReadEmail']),

    emailStyle() {
      return {
        'opacity': '0.5'
      }
    },

    
    eventsHandlers() {
      return {
        'KeyR': {
          handler: () => this.markSelectedAsRead(),
        },
        'KeyU': {
          handler: () => this.markSelectedAsUnread(),
        },
        'KeyA': {
          handler: () => this.archiveSelectedEmails(),
        },
        'Escape': {
          handler: () => this.setSelectedEmail(null),
        },
      }
    }

  },
  watch: {
    '$route.name': {
      handler(v) {
        console.log('route name', v);
        this.resetSelectedEmails()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('emails', ['toggleSelectEmail', 'setSelectedEmail']),
    ...mapActions('emails', ['toggleAllSelectedEmails', 'markSelectedAsRead', 'markSelectedAsUnread', 'archiveSelectedEmails', 'resetSelectedEmails']),

    // TODO use it as composable
    KeydownHandler(event) {
      const { code } = event
      if(this.eventsHandlers[code] !== undefined && typeof this.eventsHandlers[code].handler === 'function') {
        this.eventsHandlers[code].handler()
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.KeydownHandler)
  },
  unmounted() {
    window.removeEventListener('keydown', this.KeydownHandler)
  }
}
</script>

<template>
  <div>
    <h1 class="page-title">
        Inbox
    </h1>
    
    <div class="page-sub-title">
        Emails selected ({{ getSelectedEmailsCount }})
    </div>

    <div class="container--">
        <div class="selection-part">
            <input type="checkbox" name="selectAll"  @input="toggleAllSelectedEmails('non_archive')" :checked="isAllSelectedEmails">
            <button type="button" @click="markSelectedAsRead"> Mark as read (r)</button>
            <button type="button" @click="archiveSelectedEmails"> Archive (a)</button>

        </div>

        <div class="list">
            <!-- TODO list item component here -->
            Non archived
            <ul>
                <li v-for="({title, id}) in getNonArchivedEmails" :key="id" class="item">
                  <label class="form-control">
                    <input type="checkbox" name="checkbox" style="margin-right: 10px;" :value="id" @input="toggleSelectEmail(id)" :checked="isSelectedEmail(id)" />
                  </label>
                    <span :style="isReadEmail(id) && emailStyle" @click="setSelectedEmail(id)" style="width: 100%;">{{title}} </span>     
                </li>
            </ul>

        </div>

    </div>



    <!-- <h1>This is an  All Emails {{ emails.map(({email}) => email).join(', ') }}</h1>
    <h1>This is an  Archived {{ getArchivedEmails.map(({email}) => email).join(', ') }}</h1> -->
  </div>
</template>

<style scoped>

.page-sub-title {
  font-weight: bold;
  font-size: xx-large;
}

.selection-part {
  /* width: 100%; */
}
.item {
  border-style: outset;
  padding: 5px;
  margin-top: 4px;

}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.1;
}

</style>
