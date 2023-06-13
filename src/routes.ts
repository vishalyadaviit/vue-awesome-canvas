import { createWebHashHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/index.vue"),
    },
    {
      path: "/examples",
      name: "examples",
      component: () => import("@/pages/examples/index.vue"),
      children: [
        {
          path: "base-shapes",
          component: () => import("@/pages/examples/base-shapes.vue"),
        },
        {
          path: "charts",
          component: () => import("@/pages/examples/charts.vue"),
        },
        {
          path: "bouncing-balls",
          component: () => import("@/pages/examples/bouncing-balls.vue"),
        },
        {
          path: "gravity",
          component: () => import("@/pages/examples/gravity.vue"),
        },
        {
          path: "earth-mars",
          component: () => import("@/pages/examples/earth-mars.vue"),
        },
      ],
    },
  ],
});

export default router;
