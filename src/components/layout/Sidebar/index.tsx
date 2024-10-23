import { sidebarNavigation } from "@/data/sidebarNavigationPages";
import NavigationLink from "../../NavigationLink";

const Sidebar = () => {
  return (
    <div className="bg-light-black flex flex-col px-8 w-min h-dvh justify-center">
      <div className="flex flex-col gap-6">
        {sidebarNavigation.map(({ href, icon }) => (
          <NavigationLink key={href} href={href}>
            {icon}
          </NavigationLink>
        ))}
      </div>
      <p className="text-white text-xs font-medium -rotate-90 absolute ml-14 -left-16 bottom-6">
        Copiryght, SportSee 2020
      </p>
    </div>
  );
};

export default Sidebar;
