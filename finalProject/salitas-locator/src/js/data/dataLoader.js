import centrosData from '../../data/centros.json';

export const dataLoader = {
  async loadSalitas() {
    return centrosData.centros;
  }
};
