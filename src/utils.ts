export const isValidKey = <T extends object>(key: string | number | symbol, obj: T): key is keyof typeof obj => {
  return key in obj
}

export const generateQniqueKey = () => {
  return 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}