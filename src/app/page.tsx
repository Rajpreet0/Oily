import TankstellenCard from "@/components/dashboardComponents/TankstellenCard";
import ExchangeCard from "@/components/dashboardComponents/ExchangeCard";
import WeatherCard from "@/components/dashboardComponents/WeatherCard";
import Header from "@/components/Header";
import OilpriceCard from "@/components/dashboardComponents/OilpriceCard";

export default function Home() {
  return (
    <div className="p-4">
      <Header />

      {/* Grid for main cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center items-start">
        <TankstellenCard />
        <OilpriceCard />
        <div>
          <WeatherCard />
          <ExchangeCard />
        </div>
      </div>
    </div>
  );
}
