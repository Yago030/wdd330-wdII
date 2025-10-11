import salitasData from '../../data/salitas.json';

export const dataLoader = {
  async loadSalitas() {
    return salitasData.salitas;
  }
};
