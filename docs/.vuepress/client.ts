import {defineClientConfig} from 'vuepress/client';
import GameStatus from './components/GameStatus.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "element-plus/theme-chalk/dark/css-vars.css";

export default defineClientConfig({
  enhance({app}) {
    app.use(ElementPlus);
    app.component('GameStatus', GameStatus);

    // 动态添加引用黑夜模式 CSS 的 <link> 标签
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/element-plus/theme-chalk/dark/css-vars.css';
    link.id = 'dark-theme-css';

    // 监听 html 元素的 data-theme 属性变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      });
    });

    observer.observe(document.documentElement, {attributes: true});
  },
})