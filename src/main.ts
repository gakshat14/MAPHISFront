// this is the entry point of the application
// this is the first file read by the browser
// import all the important packages
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// creating or registering our vue app
// this is vue specific
const app = createApp(App);

// here we are adding middleware to the app
// like creating a Pinia store
// this allow us to have a centralized storage
app.use(createPinia());

// this is mainly used for routing
// like changing the page and rendering page
app.use(router);

// mounting the app
app.mount('#app');
