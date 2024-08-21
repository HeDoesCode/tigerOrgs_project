import IconSearch from "./Icons/IconSearch";
function Searchbar() {
    return (
        <div className="flex flex-col  space-y-1 w-full relative shadow-lg rounded-xl">
            <input
                type="text"
                placeholder="Search"
                className="peer p-3 bg-transparent  text-gray-600 focus:text-black rounded-xl bg-white border-none h-12 pl-10 focus:pl-3 transition-all duration-200"
            />
            <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                <IconSearch size="22" />
            </div>
        </div>
    );
}

export default Searchbar;
