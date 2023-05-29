<script>
import { ref } from "vue";
import { mapGetters, mapState } from "vuex";
import TheSidebar from "@/components/TheSidebar.vue";

export default {
  setup() {
    const email = ref()

    return {

    }
  },
  components: {
    TheSidebar
  },
  computed: {
    ...mapState('emails', ['emails']),
    ...mapGetters('emails', ['getArchivedEmails']),
  },
}
</script>

<template>
  <div >
    <h1>This is an  All Emails {{ emails.map(({email}) => email).join(', ') }}</h1>
    <h1>This is an  Archived {{ getArchivedEmails.map(({email}) => email).join(', ') }}</h1>
  </div>
</template>

<style scoped>

</style>
