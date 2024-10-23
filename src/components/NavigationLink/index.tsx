type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavigationLink = ({ href, children }: NavigationLinkProps) => {
  return (
    <a href={href} className="text-white">
      {children}
    </a>
  );
};

export default NavigationLink;
