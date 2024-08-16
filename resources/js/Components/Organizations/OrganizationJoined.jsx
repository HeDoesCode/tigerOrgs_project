import { Link } from "@inertiajs/react";
function OrganizationJoined({ icon, title, isAdmin, isSuperAdmin, link }) {
    return (
        <Link href={link} className="bg-transparent text-black transition-all duration-100 ease-in-out hover:bg-gray-800 hover:text-white p-2 rounded-xl">
            <li className="flex items-center space-x-3 poppins">
                <img src={icon} className="size-10 object-cover rounded-full" />
                <label className="cursor-pointer flex-1 text-sm font-bold line-clamp-2 leading-4">
                    {title}
                </label>
                {(isAdmin || isSuperAdmin) && (
                    <label className="cursor-pointer bg-red-600 text-white text-[0.6rem] px-[0.35rem] rounded-full">
                        {(isAdmin && "Admin") || (isSuperAdmin && "S.Admin")}
                    </label>
                )}
            </li>
        </Link>
    );
}

export default OrganizationJoined;
