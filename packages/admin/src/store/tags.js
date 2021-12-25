import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTagsStore = defineStore('tags', {
  // convert to a function
  state: () => ({
    tagsList: []
  }),
  getters: {},
  actions: {
    delTagsItem(data) {
      this.tagsList.splice(data.index, 1)
    },
    setTagsItem(data) {
      this.tagsList.push(data)
    },
    clearTags() {
      this.tagsList = []
    },
    closeTagsOther(data) {
      this.tagsList = data
    },
    closeCurrentTag(data) {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(this.tagsList[i + 1].path)
          } else if (i > 0) {
            data.$router.push(this.tagsList[i - 1].path)
          } else {
            data.$router.push('/')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(data) {
      this.collapse = data
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot))
  // import.meta.hot.accept(acceptHMRUpdate(useJokesSetup, import.meta.hot))
}
