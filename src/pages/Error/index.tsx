import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1 className="text-red text-9xl">404</h1>
      <p className="text-lg">Oups... Il semble y avoir une erreur</p>
      <Link to="/" className="text-lg">
        Cliquer ici pour retourner dans votre espace personnel
      </Link>
    </main>
  );
};

export default Error;
