export default function findVariable(text) {
  const stack = [];
  const keys = [];
  for (let idx = 0; idx < text.length; idx++) {
    if (text[idx] == "{") {
      stack.push(idx);
    }
    if (text[idx] == "}") {
      if (stack.length == 0) {
        return keys;
      }
      let start = stack.pop();
      keys.push([start, idx]);
    }
  }
  return keys;
}

const text = "{url}/{path}";
console.log(findVariable(text));
