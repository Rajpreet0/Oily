import { Search } from "lucide-react"

const SearchComponent = () => {
  return (
    <div className="min-w-xl bg-grey p-4 h-[50px] rounded-xl flex items-center mt-1">
        <Search size={25} className="text-yellow"/>
        <input placeholder="Search" className="w-full ml-2 mt-1 focus:ring-0 focus:outline-0 text-white text-xl placeholder:text-yellow"></input>
    </div>
  )
}

export default SearchComponent