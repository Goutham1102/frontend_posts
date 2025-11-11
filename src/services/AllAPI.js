import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";

// Add a new post
export const addPostAPI = async (postData) => {
    return await commonAPI("POST", `${serverURL}/posts`, postData)
};

// Get all posts
export const getAllPostsAPI = async () => {
    return await commonAPI("GET", `${serverURL}/posts`, '')
};

// Delete a post by ID
export const deletePostAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/posts/${id}`, {})
};

// Update a post by ID
export const updatePostAPI = async (id, updatedData) => {
    return await commonAPI("PUT", `${serverURL}/posts/${id}`, updatedData)
};