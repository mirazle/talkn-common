export const isNodeServer = () => typeof window === "undefined";

export const isValidKey = <T extends object>(
  key: string | number | symbol,
  obj: T
): key is keyof typeof obj => {
  return key in obj;
};

export const generateQniqueKey = (label = "id") => {
  return (
    label +
    "_" +
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 5)
  );
};
