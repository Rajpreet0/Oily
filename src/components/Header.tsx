import Image from "next/image";
import Logo from "../../public/oily_logo.png";
import { Clock } from "lucide-react";
import TimeComponent from "./TimeComponent";
import SearchComponent from "./SearchComponent";

const Header = () => {
  return (
    <div className="p-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
      <Image src={Logo} width={150} height={100} alt="Oily Logo" />

      <div className="w-full sm:w-auto flex-1 flex justify-center sm:justify-center">
        <SearchComponent />
      </div>

      <div className="flex items-center gap-2 text-white">
        <Clock size={25} />
        <TimeComponent />
      </div>
    </div>
  );
};


export default Header