import * as VueRouter from 'vue-router';
const routes = [{
        path: '/',
        component: () => import('../views/home.vue')
    }, {
        path: '/app',
        component: () => import('../views/app.vue')
    },
    {
        path: '/cashierDeskConfig',
        component: () => import('../views/cashierDeskConfig.vue')
    },
    {
        path: '/cashierDesk',
        component: () => import('../views/CashierDesk/index.vue')
    }
];

const index = VueRouter.createRouter({
    routes,
    // history: VueRouter.createWebHistory('/app/order/')
    history: VueRouter.createWebHashHistory()
});
export default index;
