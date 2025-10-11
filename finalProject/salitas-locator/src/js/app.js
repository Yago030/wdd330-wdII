import { dataLoader } from './data/dataLoader.js';
import { map } from './map/map.js';
import { uiRenderer } from './ui/uiRenderer.js';

export const app = {
  init() {
    this.loadData();
  },

  async loadData() {
    const data = await dataLoader.loadSalitas();
    map.init(data);
    uiRenderer.init(data);
  }
};
