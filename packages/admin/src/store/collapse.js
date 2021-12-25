import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCollapseStore = defineStore('dmm', {
  // convert to a function
  state: () => ({
    collapse: false
  }),
  getters: {},
  actions: {
    handleCollapse(data) {
      this.collapse = data
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCollapseStore, import.meta.hot))
}
