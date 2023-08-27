import './assets/main.css'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {faArrowRotateLeft, faPen} from '@fortawesome/free-solid-svg-icons'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

library.add(faPenToSquare)
library.add(faTrashCan)
library.add(faArrowRotateLeft)
library.add(faPen)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
