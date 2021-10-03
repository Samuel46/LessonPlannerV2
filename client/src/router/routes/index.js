import { lazy } from "react";

// ** Document title
const TemplateTitle = "%s - Lesson Planner";
const DefaultRoute = "/home";

// ** Merge Routes
const Routes = [
  {
    path: "/home",
    component: lazy(() => import("../../views/HomeScreens")),
  },
  {
    path: "/second-page",
    component: lazy(() => import("../../views/SecondPage")),
  },

  {
    path: "/planner",
    component: lazy(() => import("../../views/planner")),
  },

  {
    path: "/teacher-view/:id",
    component: lazy(() => import("../../views/user/view")),
  },
  {
    path: "/teacher-list",
    component: lazy(() => import("../../views/user/list")),
  },
  {
    path: "/teacher-edit/:id",
    component: lazy(() => import("../../views/user/edit")),
  },

  {
    path: "/account",
    component: lazy(() => import("../../views/account-settings")),
  },

  {
    path: "/login",
    component: lazy(() => import("../../views/authScreens/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/register",
    component: lazy(() => import("../../views/authScreens/RegisterV2")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },

  {
    path: "/forgot",
    component: lazy(() => import("../../views/authScreens/ForgotPasswordV2")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/api/v1/auth/resetpassword/:resettoken'",
    component: lazy(() => import("../../views/authScreens/ResetPasswordV2")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/confirmemail'",
    component: lazy(() => import("../../views/authScreens/ConfirmEmail")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },

  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
  },
];

export { TemplateTitle, Routes, DefaultRoute };
