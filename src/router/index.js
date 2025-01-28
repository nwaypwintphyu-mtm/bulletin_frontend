import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/pages/Login.vue";
import Posts from "../components/pages/posts/index.vue";
import Users from "../components/pages/users/index.vue";
import Register from "../components/pages/users/register.vue";
import UserProfile from "../components/pages/users/profile.vue";
import EditProfile from "../components/pages/users/edit.vue";
import PostsCreate from "../components/pages/posts/create.vue";
import PostCreateConfirm from "../components/pages/posts/create_confirm.vue";
import PostEdit from "../components/pages/posts/edit.vue";
import PostEditConfirm from "../components/pages/posts/edit_confirm.vue";
import PostsUpload from "../components/pages/posts/upload.vue";
import RegisterConfirm from "../components/pages/users/register_confirm.vue";
import ForgotPassword from "../components/pages/ForgotPassword.vue";
import ResetPassword from "../components/pages/ResetPassword.vue";
import ChangePassword from "../components/pages/users/change_password.vue";
import { useUsersStore } from "../stores/users";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/profile/changepassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/user/profile/edit",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: true },
  },
  {
    path: "/forgot",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/posts/create",
    name: "PostsCreate",
    component: PostsCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/upload",
    name: "PostsUpload",
    component: PostsUpload,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/create/confirm",
    name: "PostCreateConfirm",
    component: PostCreateConfirm,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/edit/:id",
    name: "PostEdit",
    component: PostEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/edit/confirm",
    name: "PostEditConfirm",
    component: PostEditConfirm,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/register/confirm",
    name: "RegisterConfirm",
    component: RegisterConfirm,
    meta: { requiresAuth: true },
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: ResetPassword,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// user auth
router.beforeEach((to, next) => {
  const usersStore = useUsersStore();
  const isAuthenticated = usersStore.current_user !== null;
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
