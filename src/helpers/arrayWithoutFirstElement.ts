export const arrayWithoutFirstElement = (array: any[]) => {
  const newArray = [...array];
  newArray.shift();
  return newArray;
};
