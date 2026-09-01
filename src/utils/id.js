let nextId = 0;

export const createId = () => {
  nextId += 1;
  return `${Date.now()}-${nextId}`;
};
