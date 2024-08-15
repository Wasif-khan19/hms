import {
  BriefcaseMedical,
  ClipboardPlus,
  House,
  Stethoscope,
  UsersRound
} from "lucide-react";


// side bar menu icns for doctors and users
export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: ClipboardPlus,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: BriefcaseMedical,
  },
];

export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Doctor",
    path: "/admin/doctor",
    icon: Stethoscope,
  },
  {
    name: "Users",
    path: "/admin/user",
    icon: UsersRound,
  },
];


// for dashboard user and doctor counting
export const adminDashboard = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Doctor",
    path: "/admin/doctor",
    icon: Stethoscope,
  },
  {
    name: "Users",
    path: "/admin/user",
    icon: UsersRound,
  },
];

export const userDashboard = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Doctor",
    path: "/admin/doctor",
    icon: Stethoscope,
  },
  {
    name: "Users",
    path: "/admin/user",
    icon: UsersRound,
  },
];


