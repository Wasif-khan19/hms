import { Bell, Package2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../data/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate()
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
          <div className="relative">
            <span className="relative inline-block cursor-pointer" onClick={() => {navigate('/notification')}}>
              <Bell className="mt-2 mr-1" />
              { user && user.notification.length > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 text-center">
                  {user.notification.length}
                </div>
              )}
            </span>
          </div>
      </nav>
    </aside>
  );
};

export default Sidebar;