// plugins/element-plus.js
import { createApp } from 'vue';
import ElementPlus from 'element-plus';

export default defineNuxtPlugin((nuxtApp) => {
  const app = createApp(nuxtApp);
  app.use(ElementPlus);
  nuxtApp.app = app;
});
