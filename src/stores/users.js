import { defineStore } from "pinia";

export const useUsersStore = defineStore("user", {
  state: () => {
    const currentUserData = sessionStorage.getItem("current_user"); //initialize currentUserData
    return {
      current_user: currentUserData ? JSON.parse(currentUserData) : null, //set current user
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
    //set user for confirmpage
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

    //user login
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
          return {
            status: response.status,
            data: null,
          };
        }
        const data = await response.json();
        this.current_user = data.user;
        sessionStorage.setItem(
          "current_user",
          JSON.stringify(this.current_user)
        );
        return {
          status: response.status,
          data: data,
        };
      } catch (error) {
        return;
      }
    },

    //user logout
    async userLogout(userId) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/sessions/${userId}`,
          {
            method: "DELETE",
          }
        );
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //get all users
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
          return {
            status: response.status,
            data: null,
          };
        }
        const data = await response.json();
        this.users = data;
        return {
          status: response.status,
          data: data,
        };
      } catch (error) {
        return;
      }
    },

    //create user
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
          return {
            status: response.status,
          };
        }
        this.successMessage = "User Registered Successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //delete user
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
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        return {
          status: response.status,
          message: "User deleted Successfully!",
        };
      } catch (error) {
        return;
      }
    },

    //update user
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
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        this.successMessage = "User updated successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //change password
    async changePassword(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/change_password/?user_id=${this.current_user.id}`,
          {
            method: "POST",
            body: params,
          }
        );
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        this.successMessage = "Change password successfully.";
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //forgot password (to sent mail)
    async forgotPassword(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/forgot_password`,
          {
            method: "POST",
            body: params,
          }
        );
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        return {
          status: response.status,
        };
      } catch (error) {
        return;
      }
    },

    //reset password
    async resetPassword(params) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/users/reset_password`,
          {
            method: "POST",
            body: params,
          }
        );
        if (!response.ok) {
          return {
            status: response.status,
          };
        }
        return {
          status: response.status,
          message: "Reset password successfully.",
        };
      } catch (error) {
        return;
      }
    },
  },
});
