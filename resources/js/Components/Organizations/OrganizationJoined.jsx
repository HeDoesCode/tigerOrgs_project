import { Link } from "@inertiajs/react";
import ImageWithLoader from "../ImageWithLoader";
function OrganizationJoined({
    icon,
    title,
    isAdmin,
    isSuperAdmin,
    link,
    visibility,
}) {
    return (
        <Link
            href={link}
            className="bg-transparent text-black transition-all duration-100 ease-in-out hover:bg-gray-800 hover:text-white p-2 rounded-xl"
        >
            <li className="flex items-center space-x-3 poppins">
                {/* <img src={icon} className="size-10 object-cover rounded-full" /> */}
                <ImageWithLoader
                    src={icon}
                    className="size-10 rounded-full aspect-square"
                    img={{ className: "object-cover" }}
                />
                <label className="cursor-pointer flex-1 text-sm font-bold line-clamp-2 leading-4">
                    {title}
                </label>
                <div className="flex flex-col gap-y-1 items-center">
                    {(isAdmin || isSuperAdmin) && (
                        <Label className="bg-red-600">
                            {(isAdmin && "Admin") ||
                                (isSuperAdmin && "S.Admin")}
                        </Label>
                    )}
                    {!visibility && (
                        <Label className="bg-slate-600">Hidden</Label>
                    )}
                </div>
            </li>
        </Link>
    );

    function Label({ children, className }) {
        return (
            <label
                className={`cursor-pointer text-white text-[0.6rem] w-fit px-[0.35rem] rounded-full ${className}`}
            >
                {children}
            </label>
        );
    }
}

export default OrganizationJoined;
