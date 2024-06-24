import { HYEventStore } from "hy-event-store"

export const playListStore = new HYEventStore({
  state: {
    playSongList: [],
    playSongIndex: 0,
    favorSongList: [],
    recSongList: []
  },
  actions: {

  }
})

