<script>
import { ref } from "vue";
import { mapGetters, mapState } from "vuex";
export default {
  setup() {
    const email = ref()

    return {

    }
  },
  computed: {
    ...mapState('emails', ['emails', 'selectedEmailsIds']),
    ...mapGetters('emails', ['getArchivedEmails', 'getNonArchivedEmails', 'getSelectedEmailsCount']),
  },
}
</script>

<template>
  <div>
    <div class="page-title">
        Inbox
    </div>
    
    <div class="page-sub-title">
        Emails selected {{ getSelectedEmailsCount }}
    </div>

    <div class="container--">
        <div class="selection">
            <input type="checkbox" name="selectAll" id="">
            <button type="button"> Mark as read (r)</button>
            <button type="button"> Archive (a)</button>

        </div>

        <div class="list">
            <!-- TODO list item component here -->
            archived
            <ul>
                <li v-for="email in getNonArchivedEmails">
                    {{email.email}}
                </li>
            </ul>

            Non archived
            <ul>
                <li v-for="email in getArchivedEmails">
                    {{email.email}}
                </li>
            </ul>
        </div>

    </div>



    <!-- <h1>This is an  All Emails {{ emails.map(({email}) => email).join(', ') }}</h1>
    <h1>This is an  Archived {{ getArchivedEmails.map(({email}) => email).join(', ') }}</h1> -->
  </div>
</template>

<style scoped>

</style>
