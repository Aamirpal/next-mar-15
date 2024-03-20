// models/post.ts
import {z} from "zod";

export const PostSchema = z.object({
    createdAt: z.string(),
    name: z.string(),
    avatar: z.string().url(),
    color: z.string(),
    title: z.string(),
    body: z.string(),
    id: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
