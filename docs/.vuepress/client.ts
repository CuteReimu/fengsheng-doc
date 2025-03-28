import {defineClientConfig} from 'vuepress/client';
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css";
import MaskIcon from './components/MaskIcon.vue';

export default defineClientConfig({
  enhance({app}) {
    app.component('MaskIcon', MaskIcon);

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
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
    }
  },
})