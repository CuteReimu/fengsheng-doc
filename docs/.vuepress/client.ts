import {defineClientConfig} from 'vuepress/client';
import 'element-plus/dist/index.css'
import MaskIcon from './components/MaskIcon.vue';

export default defineClientConfig({
  enhance({app}) {
    app.component('MaskIcon', MaskIcon);
  },
})