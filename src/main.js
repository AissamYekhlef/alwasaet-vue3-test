import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import emailsStore from './store/index'

import { createStore } from 'vuex'


const app = createApp(App)
const store = createStore({
    modules: {
        emails: emailsStore
    }
})

app.use(router)
app.use(store)

app.mount('#app')
