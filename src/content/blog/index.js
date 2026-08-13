import { posts } from "./posts.js";


export function getPost(slug) {
    return posts[slug] ?? null;
}


export function getPostList() {
    return Object.entries(posts).map(([slug, post]) => ({
        slug,
        title: post.title,
        date: post.date
    }));
}