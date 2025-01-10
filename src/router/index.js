import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/pages/Login.vue'; 
import Posts from '../components/pages/Posts.vue'; 
import Register from '../components/pages/Register.vue'; 
import ForgotPassword from '../components/pages/ForgotPassword.vue'; 




const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/posts',
    name: 'Post',
    component: Posts,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;