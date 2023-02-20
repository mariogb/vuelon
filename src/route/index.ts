import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routerHistory = createWebHashHistory()
//src/floncomponents/FVlonxComercialDocumentOut.vue
const router = createRouter({
    history: routerHistory,
    
    routes: [

        {
            path: '/',
            redirect: '/resume'
        },
        {
            path: '/resume',
            component: () => import(/* webpackChunkName: 'WelcomeResume' */ '../components/WelcomeResume.vue'),
            name: 'w-resume'
        },
        {
            path: '/vlAirport',
            component: () => import(/* webpackChunkName: 'VlAirport' */ '../floncomponents/FVlonAirport.vue'),
            name: 'vl_airport',
            children: [
                {
                    path: '/vlAirport/:airport_id',
                    name: 'vl_airport_detail',
                    component: () => import(/* webpackChunkName: 'VLAirportDetail' */  '../floncomponents/FVlonAirportDetail.vue')
                }
            ]
        },
        {
            path: '/vlPurchase',
            component: () => import(/* webpackChunkName: 'VlPurchase' */ '../floncomponents/FVlonPurchase.vue'),
            name: 'vl_purchase',
            children: [
                {
                    path: '/vlPurchase/:purchase_id',
                    name: 'vl_purchase_detail',
                    component: () => import(/* webpackChunkName: 'VLPurchaseDetail' */  '../floncomponents/FVlonPurchaseDetail.vue')
                }
            ]
        },
        {
            path: '/vlSale',
            component: () => import(/* webpackChunkName: 'VlPurchase' */ '../floncomponents/FVlonSale.vue'),
            name: 'vl_sale',
            children: [
                {
                    path: '/vlSale/:sale_id',
                    name: 'vl_sale_detail',
                    component: () => import(/* webpackChunkName: 'VLSaleDetail' */  '../floncomponents/FVlonSaleDetail.vue')
                }
            ]
        },

        {
            path: '/w',
            component: () => import(/* webpackChunkName: "Welcome" */ "../views/Welcome.vue"),
            name: 'w',
            alias: '/w',
            children: [
                {
                    path: '/w/simpledc/:dc',
                    component: () => import(/* webpackChunkName: 'SimpleDC' */ '../views/SimpleDC.vue'),
                    name: 'simpledc'
                },
                {
                    path: '/w/simpledc/:dc/:id0',
                    component: () => import(/* webpackChunkName: 'SimpleDC' */ '../views/SimpleDC.vue'),
                    name: 'simpledcid'
                },
                {
                    path: '/w/mxm/:dcch/:dcpn1/:dcpn2',
                    component: () => import(/* webpackChunkName: 'SimpleDC' */ '../views/MXMView.vue'),
                    name: 'mxm'
                },
                {
                    path: '/w/admui',
                    component: () => import(/* webpackChunkName: 'AdminMUI' */ '../views/AdminMUI.vue'),
                    name: 'admui'
                }, {
                    path: '/w/elg',
                    component: () => import(/* webpackChunkName: 'ElG' */ '../views/TestLon.vue'),
                    name: 'elg'
                }
            
            ]
        },
        {
            path: '/welcomeThird',
            component: () => import(/* webpackChunkName: 'WelcomeThird' */ '../views/WelcomeThird.vue'),
            name: 'welcomeThird',
            alias: '/w-third',
        },
        {
            path: '/welcomeAgent',
            component: () => import(/* webpackChunkName: 'WelcomeAgent' */ '../views/WelcomeAgent.vue'),
            name: 'welcomeAgent',
            alias: '/w-agent',
        }
    ]

})

router.beforeEach((to, from) => {
    
    // if (/*to.name===undefined || */to.name === "w") {
    //     router.push({ name: 'w-resume' })
    // }
    return true
})
router.afterEach((to, from) => {
    if (to.name === "simpledc") {
        document.title="SIMPLEDC "+to.params['dc'];
    }
    return true
})


export default router
