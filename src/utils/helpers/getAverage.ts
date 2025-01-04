export const getAverage = (array: any) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].sessionLength;
  }
  return sum / array.length;
};
