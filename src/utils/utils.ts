export const generateStr = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  Array.from({ length }).forEach(() => {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  });

  return result;
};
