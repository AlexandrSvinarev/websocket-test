export class Calculator {
  constructor() {
    this.data = [];
  }
  calculator(items, type) {
    let summ = 0;
    let min = 1;
    let max = -1;
    items.forEach((number, i) => {
      summ += number;
      if (number > max) max = number;
      if (number < min) min = number;
    });

    if (type === "sum") return +summ.toFixed(4);
    if (type === "min") return min;
    if (type === "max") return max;
    if (type === "avg") return +(summ / items.length).toFixed(4);
    return 0;
  }

  addData(arr) {
    const items = Object.values(arr);

    items[0].forEach((item, i) => {
      for (let index = 0; index < items.length; index++) {
        if (!Array.isArray(this.data[i])) {
          this.data[i] = [];
        }
        this.data[i].push(items[index][i]);
      }
    });
  }

  getData(typeResult) {
    return this.data.map((item) => this.calculator(item, typeResult));
  }
}

export function getStyleCell(value) {
  const opacity = Math.abs(value);
  if (value < 0) return { backgroundColor: `rgba(255, 140, 0, ${opacity})` };
  if (value > 0) {
    const style = { backgroundColor: `rgba(0, 0, 0, ${Math.abs(value)})` };
    if (opacity > 0.7) style["color"] = "#fff";
    return style;
  }
  return { backgroundColor: "rgb(255, 255, 255)" };
}

export const initialState = {
  payload: {},
  result: [],
  typeResult: "sum",
  isLoading: false,
};

for (let index = 1; index <= 20; index++) {
  initialState.payload[`Entity ${index}`] = [];
}

export function reducer(state, { type, payload }) {
  let result = new Calculator();
  switch (type) {
    case "showData":
      const copy = { ...state };

      payload.forEach(({ name, data }) => {
        copy.payload[name] = data;
      });

      result.addData(copy.payload);

      copy.result = result.getData(state.typeResult);

      return copy;

    case "setTypeResult":
      result.addData(state.payload);

      return {
        ...state,
        result: result.getData(payload),
        typeResult: payload,
      };
    default:
      throw new Error();
  }
}
