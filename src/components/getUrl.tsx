export const getUrl = (slug: string = "") => {
  return `${import.meta.env.BASE_URL}/${slug}`;
};
