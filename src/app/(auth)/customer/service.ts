import axios from "@/lib/axios";
import {Post, PostSchema} from "./model";


export const fetchPosts = async (filter?: String) => {
    try {
        const queryParams = filter ? `?filter=${encodeURIComponent(filter)}` : '';
        const response = await axios.get(`/posts${queryParams}`);
        // const response = await axios.get('/posts?filter');
        return response.data.map((post: Post) => PostSchema.parse(post));
    } catch (error) {
        console.error('Error fetching posts:fdsfdfdsfd', error);
        // throw new Error('Failed to fetch posts');
    }
};
