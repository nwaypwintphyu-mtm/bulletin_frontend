import { defineStore } from "pinia";
import { useUsersStore } from "../stores/users";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    post: "",
    posts: [],
    successMessage: "",
  }),
  actions: {
    //get currernt user
    getCurrentUserId() {
      const usersStore = useUsersStore();
      return usersStore.current_user ? usersStore.current_user.id : null;
    },

    //get all posts
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
          return {
            status: response.status,
            data: null,
          };
        }
        const data = await response.json();
        this.posts = data;
        return {
          status: response.status,
          data: data,
        };
      } catch (error) {
        return;
      }
    },

    //get one post with id for edit page
    async getPostById(id) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/${id}`
        );
        if (!response.ok) {
          return {
            status: response.status,
            data: null,
          };
        }
        const data = await response.json();
        this.posts = data;

        return {
          status: response.status,
          data: data,
        };
      } catch (error) {
        this.successMessage = "Failed";
      }
    },

    //csv post upload
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
        if (!response.status) {
          return {
            status: response.status,
          };
        }
        this.successMessage = "Posts created successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //download posts
    async downloadPosts() {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/posts/download_csv`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          return {
            status: response.status,
            data: null,
          };
        }
        return {
          status: response.status,
          data: response.blob(),
        };
      } catch (error) {
        return;
      }
    },

    //create post
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
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        this.successMessage = "Post created successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //set post in store for confirm pages
    setPost(post) {
      this.post = post;
    },

    //update posts
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
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        this.successMessage = "Post updated successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //delete post
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
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        return {
          status: response.status,
          message: "Post deleted successfully.",
        };
      } catch (error) {
        return;
      }
    },
  },
});
