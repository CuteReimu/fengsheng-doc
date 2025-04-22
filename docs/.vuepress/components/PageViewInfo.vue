<template>
  <span
      class="page-pageview-info"
      :aria-label='`${metaLocale.views}${isPure ? "" : "🔢"}`'
      data-balloon-pos="up"
  >
    <FireIcon v-if="isHot"/>
    <EyeIcon v-else/>
    <span id="ArtalkPV" class="vp-pageview">{{ pageViews }}</span>
  </span>
</template>

<script setup>
import {isString} from "@vuepress/helper/client";
import {onMounted, ref} from "vue";
import {usePure} from "@theme-hope/composables/index";
import {EyeIcon, FireIcon} from "@theme-hope/modules/info/components/icons";
import {useMetaLocale} from "@theme-hope/modules/info/composables/index";
import Axios from "axios";
import {useRoutePath} from "vuepress/client";

const routePath = useRoutePath();
const metaLocale = useMetaLocale();
const isPure = usePure();
const pageViews = ref("...");
const isHot = ref(false);
const props = defineProps(['pageview']);

onMounted(() => {
  Axios.get(import.meta.env.VITE_REQUEST_PAGE_VIEW, {
    params: {
      "path": isString(props.pageview) ? props.pageview : routePath.value,
    }
  }).then((response) => {
    pageViews.value = response.data.pageViews;
    isHot.value = response.data.isHot;
  }).catch((error) => {
    console.error("获取访问量失败", error);
  });
});
</script>

<style scoped>
</style>
