import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    successMessage: "",
  }),
  actions: {
    async getPosts() {
      try {
        const response = await fetch("http://localhost:3002/api/v1/posts");
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
    async createPost(params) {
      try {
        const response = await fetch("http://localhost:3002/api/v1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: params }),
        });
        if (response.status === 200) {
          this.successMessage = "Post created successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
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
        if (response.status === 200) {
          this.successMessage = "Post deleted successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
      }
    },
  },
});
