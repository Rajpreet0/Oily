import { Search } from "lucide-react";

const SearchComponent = () => {
  return (
    <div className="w-full max-w-md bg-grey px-4 py-2 rounded-xl flex items-center">
      <Search size={22} className="text-yellow" />
      <input
        placeholder="Search"
        className="w-full ml-2 focus:ring-0 focus:outline-0 text-white text-base placeholder:text-yellow bg-transparent"
      />
    </div>
  );
};

export default SearchComponent;
