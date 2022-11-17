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
            path: '/docCom1',
            component: () => import(/* webpackChunkName: 'DocComer1' */ '../floncomponents/FVlonComercialDocumentOut.vue'),
            name: 'doccomer1',
            children: [
                {
                    path: '/docCom1/:docid',
                    name: 'indoc',
                    component: () => import(/* webpackChunkName: 'DocComer1Detail' */  '../floncomponents/FVlonComercialDocumentOutDetail.vue')
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
                },
                {
                    path: '/w/resume',
                    component: () => import(/* webpackChunkName: 'WelcomeResume' */ '../components/WelcomeResume.vue'),
                    name: 'w-resume'
                }
            ]
        },
        {
            path: '/welcomeThird',
            component: () => import(/* webpackChunkName: 'WelcomeThird' */ '../views/WelcomeThird.vue'),
            name: 'welcomeThird',
            alias: '/w-third',
        }
    ]

})

router.beforeEach((to, from) => {
    if (to.name === "w") {
        router.push({ name: 'w-resume' })
    }
    return true
})
router.afterEach((to, from) => {
    if (to.name === "simpledc") {
        document.title="SIMPLEDC "+to.params['dc'];
    }
    return true
})


export default router
