"use client";

import { useEffect, useState } from "react";

const TimeComponent = () => {

    const [time, setTime] = useState<string>("");

    useEffect(() => {

        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            setTime(formatted);
        }

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);

    }, []);

  return (
    <p className="text-xl mt-1 ml-2">{time}</p>
  )
}

export default TimeComponent