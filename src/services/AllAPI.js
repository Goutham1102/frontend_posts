import CommonAPI from "./CommonAPI";
import { serverURL } from "./serverURL";

// Add a new post
export const addPostAPI = async (postData) => {
    return await CommonAPI("POST", `${serverURL}/posts`, postData)
};

// Get all posts
export const getAllPostsAPI = async () => {
    return await CommonAPI("GET", `${serverURL}/posts`, '')
};

// Delete a post by ID
export const deletePostAPI = async (id) => {
    return await CommonAPI("DELETE", `${serverURL}/posts/${id}`, {})
};

// Update a post by ID
export const updatePostAPI = async (id, updatedData) => {
    return await CommonAPI("PUT", `${serverURL}/posts/${id}`, updatedData)
};