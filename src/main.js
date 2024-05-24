import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBank, faBuilding, faPencil, faPhone, faPlus, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faPhone, faBuilding, faPencil, faPhone, faPlus, faTag, faTrash, faUser, faBank);

createApp(App).use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')
