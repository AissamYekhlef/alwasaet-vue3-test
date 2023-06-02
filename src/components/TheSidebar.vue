<template>
    <div class="sidebar">
        <ul class="group-items">
            <li class="sidebar-item">        
                <RouterLink to="/inbox" exact>Inbox ( {{ getNonArchivedEmails.length }}) </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/archive" exact>Archive ( {{ getArchivedEmails.length }})</RouterLink>
            </li>
        </ul>

        <ul class="group-items">
            <li class="sidebar-item">  
                Logout
            </li>
        </ul>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
    name: 'TheSidebar',
    computed: {
        ...mapGetters('emails', ['getArchivedEmails', 'getNonArchivedEmails', 'getSelectedEmailsCount']),
    },

}
</script>
 
<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 200px;
    justify-content: space-between;
    background-color: #373636;
    padding-top: 20px;
    padding-bottom: 20px;
}

li{
    list-style-type: none;
    /* padding: 10px; */
    color: rgb(252, 252, 252);
}

li > a { 
    text-decoration: none;
    /* padding: 10px; */
    /* color: rgb(252, 252, 252); */
}

.router-link-exact-active {
    color: rgb(88, 202, 11);
}

.sidebar-item {
    padding: 5px 20px 5px 20px;
    margin-bottom: 5px;
    width: 100%;
    background-color: white;
    color: black;
    border-radius: 5px;
    margin-right: auto;

}

.group-items {
    width: 90%;
    margin-left: -30px;
}

</style>