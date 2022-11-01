/** Mock asset path builder */
export const getAssetPath = (path: string) => {
  const sanitized = path.replace(/^\//g, ''); // remove first slash (if present)

  return sanitized;
};
