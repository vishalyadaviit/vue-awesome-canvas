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
      path: "/fyndster",
      name: "fyndster",
      component: () => import("@/pages/fyndster/index.vue"),
      children: [
        {
          path: "create-card-intro",
          component: () => import("@/pages/fyndster/create-card-intro.vue"),
        },
      ],
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
        {
          path: "rings",
          component: () => import("@/pages/examples/rings.vue"),
        },
      ],
    },
  ],
});

export default router;
