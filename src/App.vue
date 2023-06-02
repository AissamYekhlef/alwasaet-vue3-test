<script>
import { RouterView } from 'vue-router'
import TheSidebar from '@/components/TheSidebar.vue'
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";


export default {

  components: {
    RouterView,
    TheSidebar
  },
  computed: {
    ...mapState('emails', ['emails', 'selectedEmail']),
    ...mapGetters('emails', ['getArchivedEmails', 'getNonArchivedEmails', 'getSelectedEmailsCount', 'isSelectedEmail', 'isAllSelectedEmails', 'isReadEmail']),
    rightSidebarOpened() {
      return !!this.selectedEmail
    },

    bodyStyle() {
      return {
        // 'background-color': this.rightSidebarOpened ? 'blue' : 'white' 
        // 'opacity': '2',
        
    'transition': 'opacity 0.3s',
        
        'background': 'rgba(0,0,0,0.6)',
        'filter': 'brightness(50%)'
      }
    }

  },

  watch: {
    rightSidebarOpened(opened) {
      if(opened) {
        setTimeout(() => {
          window.addEventListener('click', this.clickOutsideHandler);
        }, 50);
      }else {
          window.removeEventListener('click', this.clickOutsideHandler);

      }
    }
  },
  methods: {
    ...mapMutations('emails', ['setSelectedEmail']),
    ...mapActions('emails', ['markSelectedAsRead', 'markSelectedAsUnread', 'archiveSelectedEmails']),
    closeRightSidebar() {
      this.setSelectedEmail(null)
    },
    clickOutsideHandler(e) {
      const _self = this
      if (document.getElementById('right-sidebar')?.contains(e.target)){
        // Clicked in box
      } else{
        // Clicked outside the box
        _self.closeRightSidebar()
      }
    }
  },
  mounted() {

  }
  }
</script>

<template>
    <div class="container">
      <div class="left-sidebar" :style="rightSidebarOpened && bodyStyle">
        <TheSidebar></TheSidebar>
      </div>

      <div class="wrapper" :style="rightSidebarOpened && bodyStyle">
        <RouterView />
      </div>

      <div class="right-sidebar" >
        <Transition name="slide-fade">
          <div v-if="rightSidebarOpened" id="right-sidebar" style="height: 100vh; width: 100%;">

            <button @click="closeRightSidebar">Close (Esc)</button>

            <div class="selection-part">
              <button type="button" @click="markSelectedAsRead"> Mark as read (r)</button>
              <button type="button" @click="archiveSelectedEmails"> Archive (a)</button>

          </div>
            
            <h2> {{ selectedEmail.title }}</h2>
            <h4> {{ selectedEmail.content }}</h4>
          </div>
        </Transition>
      </div>
    </div>
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.wrapper {
    /* padding: 20px; */
    display: flex;
    width: 80%;
    position: relative;

        /* margin: 20px; */
    /* place-items: flex-start;
    flex-wrap: wrap; */
  }
.left-sidebar {
  width: 20%;
}


.right-sidebar {
  padding: 50px;
  width: 40%;
  background-color: white;
  height: 100vh;

  position: absolute;
  z-index: 9;
  top: 0;
  right: 0;
}

/* .v-enter-active,
.v-leave-active {
  transition: opacity .4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
} */


.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
