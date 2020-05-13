interface Query {
  color?: string;
  width?: number;
}

const mySearch = function name(config: Query) {
  if (config.color) {
    console.log(config.width, "hello");
  }
}