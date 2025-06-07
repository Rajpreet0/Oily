import React from 'react'
import {LucideIcon} from "lucide-react";

interface TankstellenDetailInformationProps {
    icon?: LucideIcon;
    label: string;
    value: string;
    isYellow?: boolean;
}

const TankstellenDetailInformation: React.FC<TankstellenDetailInformationProps> = ({icon: Icon, label, value , isYellow}) => {
  return (
    <div className='p-2 w-full flex items-center text-lg'>
        {Icon && <Icon size={25}/>}
        <div className='flex space-x-3 ml-2'>
            <p className='text-white font-semibold'>{label}</p>
            <p className={`${isYellow ? "text-yellow" : "text-[#DFDFD6]"}`}>{value}</p>
        </div>
    </div>
  )
}

export default TankstellenDetailInformation