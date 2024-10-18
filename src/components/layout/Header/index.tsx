import Logo from "@/components/Logo";
import NavigationLink from "@/components/NavigationLink";
import { navigationPages } from "@/services/navigationPages";

const Header = () => {
  return (
    <header className="bg-light-black px-6 py-4 flex items-center">
      <Logo />
      <nav className="text-2xl font-medium flex w-full justify-around">
        {navigationPages.map(({ href, pageName }) => (
          <NavigationLink key={href} href={href} pageName={pageName} />
        ))}
      </nav>
    </header>
  );
};

export default Header;
