// import React from "react";
// import { Badge, Bell, Package2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { adminMenu, userMenu } from "../data/data";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// const Sidebar = ({ children }) => {
//   const { user } = useSelector((state) => state.user);
//   const location = useLocation();
//   const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

//   return (
//     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//       <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//         <Link
//           to="#"
//           className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//         >
//           <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
//           <span className="sr-only">Acme Inc</span>
//         </Link>
//         <TooltipProvider>
//           {SidebarMenu.map((menu) => {
//             const isActive = location.pathname === menu.path;
//             const IconComponent = menu.icon;
//             return (
//               <Tooltip key={menu.path}>
//                 <TooltipTrigger asChild>
//                   <Link
//                     to={menu.path}
//                     className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-blue-500 md:h-8 md:w-8 ${
//                       isActive ? "bg-white text-black" : "text-foreground"
//                     }`}
//                   >
//                     <IconComponent className="h-5 w-5" />
//                     <span className="sr-only">{menu.name}</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">{menu.name}</TooltipContent>
//               </Tooltip>
//             );
//           })}
//         </TooltipProvider>
//       </nav>
//       <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//       <div className="content">
//             <div className="header text-white">
//               <div className="header-content text-white">
//                 <Badge count={user && user.notifcation}>
//                   <i className="text-white"></i>
//                 </Badge>
//               </div>
//             </div>
//             <div className="body">{children}</div>
//           </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



import React from "react";
import { Badge, Bell, Package2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminMenu, userMenu } from "../data/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Sidebar = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            const IconComponent = menu.icon;
            return (
              <Tooltip key={menu.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={menu.path}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-blue-500 md:h-8 md:w-8 ${
                      isActive ? "bg-white text-black" : "text-foreground"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="sr-only">{menu.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{menu.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <div className="content">
          <div className="header text-white">
            <div className="header-content text-white">
              <div count={user?.notification || 0}>
                <Bell className="text-white" />
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
