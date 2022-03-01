import {defineStore} from 'pinia';
// import {responseBlogData} from '@/types/responseData';

export const useBlogStore = defineStore('blogStore', {
  state: () => {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false
    };
  },
  getters: {
    getTitle: (state) => (state.title),
    getDescription: (state) => (state.description),
    getContent: (state) => (state.content),
    getAtIndex: (state) => (state.atIndex),
    getBlogFullInfo: (state) => ({
      title: state.title,
      description: state.description,
      content: state.content,
      atIndex: state.atIndex,
    }),
  },
  actions: {
    setTitle(payload: any) {
      this.title = payload.title;
    },
    setDescription(payload: any) {
      this.description = payload.description;
    },
    setContent(payload: any) {
      this.content = payload.content;
    },
    setAtIndex(payload: any) {
      this.atIndex = payload.atIndex;
    },
    setBlogFullInfo(payload: any) {
      this.title = payload.title;
      this.description = payload.description;
      this.content = payload.content;
      this.atIndex = payload.atIndex;
    },

    // async Promise
  },
});
