export const markers = {
  init(data) {
    this.data = data;
    this.createMarkers();
  },

  createMarkers() {
    this.data.forEach(item => {
      this.addMarker(item);
    });
  },

  addMarker(item) {
    // console.log('Adding marker for:', item);
  }
};
