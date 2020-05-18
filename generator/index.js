const axios = require("axios");

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return +(min + (max - min) * Math.random()).toFixed(4);
}

const list = [];
for (let i = 1; i <= 20; i++) {
  list.push(i);
}
const entityList = list.map((item) => `Entity ${item}`);

function generateEntity(id) {
  return {
    name: entityList[id],
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => randomFloat(-1, 1)),
  };
}

function generateTenEntity() {
  const entityes = [];

  while (entityes.length < 10) {
    const id = randomInteger(0, 19);
    if (!entityes.includes(id)) entityes.push(id);
  }

  return entityes.map((id) => {
    return generateEntity(id);
  });
}

setInterval(() => {
  console.log("Generator: send data...");
  axios.post("http://127.0.0.1:3005", generateTenEntity());
}, 1000);
