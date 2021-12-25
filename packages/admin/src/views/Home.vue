<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <!-- <v-tags></v-tags> -->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useTagsStore } from '@/store/tags'
import { useCollapseStore } from '@/store/collapse'
import vHeader from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'
// import vTags from "../components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar
    // vTags,
  },
  setup() {
    const tagsStore = useTagsStore()
    const collapseStore = useCollapseStore()

    const tagsList = computed(() => tagsStore.tagsList.map((item) => item.name))
    const collapse = computed(() => collapseStore.collapse)
    return {
      tagsList,
      collapse
    }
  }
}
</script>
