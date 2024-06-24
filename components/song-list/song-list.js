// import { methods } from "underscore";

// components/song-list/song-list.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    printData() {
      console.log(this.properties.itemData);
    }
  },
  lifetimes: {
    created() {
      // this.printData()
    }
  }
})