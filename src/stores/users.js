import { defineStore } from "pinia";

export const useUsersStore = defineStore("user", {
  state: () => {
    const currentUserData = sessionStorage.getItem("current_user");
    return {
      current_user: currentUserData ? JSON.parse(currentUserData) : null,
      users: [],
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: 1,
      phone: "",
      dob: "",
      address: "",
      profile: null,
      confirm_profile: null,
      successMessage: "",
    };
  },
  actions: {
    // to pass to confirm page
    setUserData(data) {
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.confirm_password = data.confirm_password;
      this.phone = data.phone;
      this.dob = data.dob;
      this.address = data.address;
      this.role = data.role;
      this.profile = data.profile;
      this.confirm_profile = data.confirm_profile;
    },

    async userLogin(params) {
      try {
        const response = await fetch("http://localhost:3002/api/v1/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed");
        }

        const data = await response.json();
        this.current_user = data.user;
        sessionStorage.setItem(
          "current_user",
          JSON.stringify(this.current_user)
        ); // store user in sessionStorage
        return data;
      } catch (error) {
        console.error("Login failed:", error);
        return { error: error.message };
      }
    },

    async userLogout(userId) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/sessions/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          sessionStorage.removeItem("current_user"); // remove user from sessionStorage
          this.current_user = null; // set store state to null
        }
        return response;
      } catch (error) {
        console.error("Network error:", error);
      }
    },

    async getUsers() {
      const userId = this.current_user.id;
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users?user_id=${userId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },

    async setUsers(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users?user_id=${this.current_user.id}`,
          {
            method: "POST",
            body: params,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        if (response.status === 201) {
          this.successMessage = "User Registered Successfully";
        }

        return response;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },

    async deleteUser(id) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // this.successMessage = "User Deleted Successfully";
        }

        return response;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },

    async updateUser(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/${this.current_user.id}`,
          {
            method: "PUT",
            body: params,
          }
        );

        const data = await response.json();
        this.current_user = data.user;
        sessionStorage.setItem(
          "current_user",
          JSON.stringify(this.current_user)
        );
        if (response.status === 200) {
          this.successMessage = "User updated successfully!";
        }
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },

    async changePassword(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/change_password/?user_id=${this.current_user.id}`,
          {
            method: "POST",
            body: params,
          }
        );
        if (response.status === 200) {
          this.successMessage = "Password is successfully updated.";
        }
        return response;
      } catch (error) {
        console.error("Error updating password:", error);
        throw error;
      }
    },
  },
  getters: {
    getUserData: (state) => ({
      name: state.name,
      email: state.email,
      password: state.password,
      confirm_password: state.confirm_password,
      phone: state.phone,
      dob: state.dob,
      address: state.address,
      role: state.role,
      profile: state.profile,
    }),
  },
});
