<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters('emails', ['getArchivedEmails']),
  },
}
</script>

<template>
  <div>
    <h1>This is an  Archived {{ getArchivedEmails.map(({email}) => email).join(', ') }}</h1>
  </div>
</template>

<style scoped>

</style>
