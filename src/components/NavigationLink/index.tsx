import { NavLink } from "react-router-dom";

type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavigationLink = ({ href, children }: NavigationLinkProps) => {
  return (
    <NavLink to={href} className="text-white">
      {children}
    </NavLink>
  );
};

export default NavigationLink;
