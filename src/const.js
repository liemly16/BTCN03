export const SIZE = 20;
export const BOARD = Array(SIZE)
  .fill(null)
  .map(() => {
    return Array(SIZE).fill(null);
  });
export const OBJ = {
  X: 'O',
  O: 'X'
};
