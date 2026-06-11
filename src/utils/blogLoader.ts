import { blogPosts, getBlogPostBySlug as findBlogPostBySlug } from '../data/blogPosts';

export const getBlogPosts = () => blogPosts;
export const getBlogPostBySlug = (slug: string) => findBlogPostBySlug(slug);
export type { BlogPost } from '../data/blogPosts';
