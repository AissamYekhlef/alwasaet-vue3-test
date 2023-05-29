<template>
    <div class="sidebar">
        <div>
            <ul>
                <!-- <li>
                    <RouterLink to="/index" exact>Index</RouterLink>
                </li> -->
                <li>        
                    <RouterLink to="/inbox" exact>Inbox</RouterLink>
                </li>
                <li>
                    <RouterLink to="/archive" exact>Archive</RouterLink>
                </li>
            </ul>
        </div>
        <div style="color: white;">
            Logout
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheSidebar',
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
    background-color: darkblue;
    padding-top: 20px;
    padding-bottom: 20px;
}

li{
    list-style-type: none;
    padding: 10px;
    color: rgb(252, 252, 252);
}

li > a { 
    text-decoration: none;
    padding: 10px;
    color: rgb(252, 252, 252);
}

.router-link-exact-active {
    color: rgb(176, 236, 10);
}

.item {


}

</style>