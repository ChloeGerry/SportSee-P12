import { sidebarNavigation } from "@/data/sidebarNavigationPages";
import NavigationLink from "@/components/NavigationLink";

const currentDate = new Date().getFullYear();

const Sidebar = () => {
  return (
    <div className="bg-light-black flex flex-col px-8 w-min justify-center relative">
      <div className="flex flex-col gap-6">
        {sidebarNavigation.map(({ href, icon }) => (
          <NavigationLink key={href} href={href}>
            {icon}
          </NavigationLink>
        ))}
      </div>
      <p className="text-white text-xs font-medium -rotate-90 absolute left-0 bottom-28 whitespace-nowrap">
        Copyright, SportSee {currentDate}
      </p>
    </div>
  );
};

export default Sidebar;
