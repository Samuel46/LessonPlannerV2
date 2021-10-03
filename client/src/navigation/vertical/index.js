import { Mail, Home, User, Circle, CheckSquare, Settings } from "react-feather";

export default [
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/home",
  },

  {
    id: "lesson_planner",
    title: "Lesson Planner",
    icon: <CheckSquare size={20} />,
    navLink: "/planner",
  },
  {
    id: "teachers",
    title: "Manage Teachers",
    icon: <User size={20} />,
    navLink: "/teacher-list",
    // children: [
    //   {
    //     id: "list",
    //     title: "List",
    //     icon: <Circle size={12} />,
    //     navLink: "/teacher-list",
    //   },
    //   {
    //     id: "view",
    //     title: "View",
    //     icon: <Circle size={12} />,
    //     navLink: "/teacher-view",
    //   },
    //   {
    //     id: "edit",
    //     title: "Edit",
    //     icon: <Circle size={12} />,
    //     navLink: "/teacher-edit",
    //   },
    // ],
  },
  {
    id: "accountSettings",
    title: "Account Settings",
    icon: <Settings size={20} />,
    navLink: "/account",
  },
];
