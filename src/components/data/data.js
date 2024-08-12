import {
  Bell,
  BriefcaseMedical,
  ClipboardPlus,
  House,
  Stethoscope,
  UsersRound,
} from "lucide-react";

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
