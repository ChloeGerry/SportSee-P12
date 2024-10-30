type MacroCardProps = {
  icon: JSX.Element;
  macroValue: string;
  macroName: string;
  iconBackground: string;
};

const MacroCard = ({ icon, macroValue, macroName, iconBackground }: MacroCardProps) => {
  return (
    <article className="flex bg-light-grey py-10 pr-12 pl-10 gap-6 w-64">
      <div className={`w-60 h-60 ${iconBackground} opacity-10 absolute rounded-md`}></div>
      <div className="p-5  rounded-md">{icon}</div>
      <div>
        <p className="text-xl font-bold text-dark-grey">{macroValue}</p>
        <p className="text-sm text-grey">{macroName}</p>
      </div>
    </article>
  );
};

export default MacroCard;
