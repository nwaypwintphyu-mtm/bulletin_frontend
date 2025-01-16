import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/pages/Login.vue";
import Posts from "../components/pages/posts/index.vue";
import Register from "../components/pages/Register.vue";
import CreatePost from "../components/pages/posts/create.vue";
import EditPost from "../components/pages/posts/edit.vue";
import ForgotPassword from "../components/pages/ForgotPassword.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/posts",
    name: "Post",
    component: Posts,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
