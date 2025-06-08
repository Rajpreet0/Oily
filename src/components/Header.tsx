import Image from "next/image";
import Logo from "../../public/oily_logo.png";
import { Clock } from "lucide-react";
import TimeComponent from "./TimeComponent";
import SearchComponent from "./SearchComponent";

const Header = () => {
  return (
    <div className='p-2 w-full flex items-center justify-around mb-12'>
        <Image src={Logo} width={150} height={100} alt="Oily Logo"/>
        <SearchComponent/>
        <div className="flex gap-2 items-center text-white">
            <Clock size={25}/>
            <TimeComponent/>
        </div>
    </div>
  )
}

export default Header