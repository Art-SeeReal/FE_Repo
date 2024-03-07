export const generateStr = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  Array.from({ length }).forEach(() => {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  });

  return result;
};

export const isEmptyObject = <T>(obj: T) => {
  if (obj === null || obj === undefined) {
    throw new Error('isEmptyObject의 매개변수로 null이나 undefined가 올 수 없습니다.');
  }

  return Object.keys(obj).length === 0;
};
