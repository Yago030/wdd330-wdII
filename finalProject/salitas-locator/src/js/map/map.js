import { markers } from './markers.js';

export const map = {
  init(data) {
    this.data = data;
    this.createMap();
  },

  createMap() {
    markers.init(this.data);
  }
};
