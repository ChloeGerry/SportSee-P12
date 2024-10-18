type NavigationLinkProps = {
  href: string;
  pageName: string;
};

const NavigationLink = ({ href, pageName }: NavigationLinkProps) => {
  return (
    <a href={href} className="text-white">
      {pageName}
    </a>
  );
};

export default NavigationLink;
