<script>
import { ref } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  setup() {
    // window.addEventListener()

    return {

    }
  },
  computed: {
    ...mapState('emails', ['emails', 'selectedEmailsIds']),
    ...mapGetters('emails', ['getArchivedEmails', 'getNonArchivedEmails', 'getSelectedEmailsCount', 'isSelectedEmail', 'isAllSelectedEmails', 'isReadEmail']),

    emailStyle() {
      return {
        'opacity': '0.5'
      }
    }
  },
  methods: {
    ...mapMutations('emails', ['toggleSelectEmail']),
    ...mapActions('emails', ['toggleAllSelectedEmails', 'markSelectedAsRead']),
  },
}
</script>

<template>
  <div>
    <h1 class="page-title">
        Archive
    </h1>
    
    <div class="page-sub-title">
        Emails selected ({{ getSelectedEmailsCount }})
    </div>

    <div class="container--">
        <div class="selection-part">
            <input type="checkbox" name="selectAll" id="" @input="toggleAllSelectedEmails('archive')" :checked="isAllSelectedEmails">
            <button type="button" @click="markSelectedAsRead"> Mark as read (r)</button>
            <button type="button"> Archive (a)</button>

        </div>

        <div class="list">
            <!-- TODO list item component here -->
            archived
            <ul>
                <li v-for="({title, id}) in getArchivedEmails" :key="id" class="item">
                  <input type="checkbox" :value="id" @input="toggleSelectEmail(id)" :checked="isSelectedEmail(id)" />
                  <span :style="isReadEmail(id) && emailStyle">{{title}} </span>
                </li>
            </ul>

            <!-- TODO change to archive page -->
            <!-- Non archived
            <ul>
                <li v-for="email in getArchivedEmails">
                    {{email.email}}
                </li>
            </ul> -->
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
  border: 2px solid;
}

</style>
