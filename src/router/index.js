import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import MasterPage from '../components/MasterPage.vue';

import RegisterUser from '../components/User/RegisterUser.vue';

import ContactList from '../components/Contact/ListContact.vue';
import EditContact from '../components/Contact/EditContact.vue';
import AddContact from '../components/Contact/AddContact.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/usuarios/criar',
    name: 'registerUser',
    component: RegisterUser
  },
  {
    path: '/',
    component: MasterPage,
    children: [
      {
        path: 'contatos',
        name: 'contacts',
        component: ContactList,
        meta: { requiresAuth: true }
      },
      {
        path: 'contatos/criar',
        name: 'addContact',
        component: AddContact,
        meta: { requiresAuth: true }
      },
      {
        path: 'contatos/editar/:id',
        name: 'editContact',
        component: EditContact,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)', 
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('authToken')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;