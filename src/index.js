module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const configMap = new Map(bracketsConfig);
  const openBrackets = new Set(bracketsConfig.map(pair => pair[0]));
  const sameBrackets = new Set(bracketsConfig.filter(pair => pair[0] === pair[1]).map(pair => pair[0]));

  for (let char of str) {
    if (openBrackets.has(char)) {

      if (sameBrackets.has(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop(); // If it's already the last open bracket, we close it
        } else {
          stack.push(char); // Otherwise, treat it as opening
        }
      } else {
        stack.push(char); // For regular opening brackets
      }
    } else {

      const lastOpen = stack.pop();
      if (configMap.get(lastOpen) !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
