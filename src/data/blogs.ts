import data from "./blogs.json";
export const blogs = data;
export const findBlog = (slug: string) => blogs.find(blog => blog.slug === slug);
