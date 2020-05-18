class Storage {
  constructor(params) {
    this.data = {};
  }

  getAll() {
    return Object.values(this.data);
  }

  updateData(chunk) {
    chunk.forEach((entity) => {
      this.data[entity.name] = entity;
    });
  }
}

module.exports = new Storage();
