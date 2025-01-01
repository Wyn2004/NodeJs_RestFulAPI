export const generateCode = (string) => {
  let result = "";
  string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .forEach((word) => {
      result += word.charAt(1) + word.charAt(0);
    });

  return result.toLocaleUpperCase() + string.length;
};
