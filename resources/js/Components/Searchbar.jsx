import IconSearch from "./Icons/IconSearch";
import { debounce } from "lodash";
import { useCallback } from "react";

function Searchbar({ className, onInviteAdmin, onChange, ...props }) {
    const debouncedOnChange = useCallback(debounce(onChange, 300), [onChange]);

    return (
        <div
            className={`flex items-center relative w-full shadow-lg rounded-l-xl ${className}`}
        >
            <input
                type="text"
                placeholder={props.placeholder}
                onChange={debouncedOnChange}
                className={`peer p-3 bg-transparent text-gray-600 focus:text-black ${
                    onInviteAdmin ? "rounded-xl" : "rounded-l-xl"
                } bg-white border-none h-12 pl-10 focus:pl-3 transition-all duration-200 w-full`}
            />
            <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                <IconSearch size="22" />
            </div>
        </div>
    );
}

export default Searchbar;
