import { defineStore } from "pinia";
import { useUsersStore } from "../stores/users";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    post: "",
    posts: [],
    successMessage: "",
  }),
  actions: {
    getCurrentUserId() {
      const usersStore = useUsersStore();
      return usersStore.current_user ? usersStore.current_user.id : null;
    },
    async getPosts() {
      const userId = this.getCurrentUserId();
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts?user_id=${userId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    },

    async getPostById(id) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
      return this.posts;
    },
    async uploadPost(params) {
      const userId = this.getCurrentUserId();
      
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts?user_id=${userId}`,
          {
            method: "POST",
            body: params,
          }
        );

        if (response.status === 200) {
          this.successMessage = "Posts created successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error creating posts:", error);
        throw error;
      }
    },
    async downloadPosts() {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/download_csv`,
          {
            method: "GET",
          }
        );
        return response;
      } catch (error) {
        console.error("Error downloading post:", error);
        throw error;
      }
    },
    async createPost(params) {
      const userId = this.getCurrentUserId();
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts?user_id=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ post: params }),
          }
        );
        if (response.status === 200) {
          this.successMessage = "Post created successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
    setPost(post) {
      this.post = post;
    },
    async updatePost(params) {
      const postId = params["id"];
      const updatedPost = params["post"];

      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/${postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
          }
        );

        if (response.status === 200) {
          this.successMessage = "Post updated successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error updating post:", error);
        throw error;
      }
    },

    async deletePost(id) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post: { deleted_at: new Date().toISOString() },
            }),
          }
        );
        return response;
      } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
      }
    },
  },
});
