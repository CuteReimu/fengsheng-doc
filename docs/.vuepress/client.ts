import {defineClientConfig} from 'vuepress/client';
import GameStatus from './components/GameStatus.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "element-plus/theme-chalk/dark/css-vars.css";

export default defineClientConfig({
  enhance({app}) {
    app.use(ElementPlus)
    app.component('GameStatus', GameStatus)
  },
})