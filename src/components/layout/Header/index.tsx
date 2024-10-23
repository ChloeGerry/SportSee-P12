import Logo from "@/components/Logo";
import NavigationLink from "@/components/NavigationLink";
import { mainNavigationPages } from "@/data/mainNavigationPages";

const Header = () => {
  return (
    <header className="bg-light-black px-6 py-4 flex items-center">
      <Logo />
      <nav className="text-2xl font-medium flex w-full justify-around">
        {mainNavigationPages.map(({ href, pageName }) => (
          <NavigationLink key={href} href={href}>
            {pageName}
          </NavigationLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
