export const useErrors = () => {
  const alreadyExists = (item: string, itemName: string) => {
    throw new Error(`The ${item} with name '${itemName}' already exists`);
  };

  const notExists = (item: string, itemName: string) => {
    throw new Error(`The ${item} with name '${itemName}' does not exist`);
  };

  return { alreadyExists, notExists };
};
