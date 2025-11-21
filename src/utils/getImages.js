export const getImages = () => {
  return import.meta.glob('/src/assets/brands/*.{png,jpg,jpeg,svg}', { eager: true });
};
