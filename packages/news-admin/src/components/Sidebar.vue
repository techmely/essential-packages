<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :key="subItem.index" :index="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :key="subItem.index" :index="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCollapseStore } from '@/store/collapse';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const items = [
      {
        icon: 'el-icon-lx-home',
        index: '/dashboard',
        title: 'System Home',
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/table',
        title: 'Basic form',
      },
      {
        icon: 'el-icon-lx-copy',
        index: '/tabs',
        title: 'tab',
      },
      {
        icon: 'el-icon-lx-calendar',
        index: '3',
        title: 'Form related',
        subs: [
          {
            index: '/form',
            title: 'Basic form',
          },
          {
            index: '/upload',
            title: 'File Upload',
          },
        ],
      },
      {
        icon: 'el-icon-lx-emoji',
        index: '/icon',
        title: 'Custom icon',
      },
      {
        icon: 'el-icon-lx-warn',
        index: '7',
        title: 'Error handling',
        subs: [
          {
            index: '/permission',
            title: 'Permission test',
          },
          {
            index: '/404',
            title: '404 page',
          },
        ],
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const collapseStore = useCollapseStore();
    const collapse = computed(() => collapseStore.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
