function OrganizationJoined({ icon, title, isAdmin, isSuperAdmin }) {
    return (
        <li className="flex items-center space-x-3 poppins">
            <img
                src={icon}
                className="size-10 object-cover rounded-full"
            />
            <label className="flex-1 text-sm font-bold line-clamp-2 leading-4">{title}</label>
            {(isAdmin || isSuperAdmin) &&
                <label className="bg-red-600 text-white text-[0.6rem] px-[0.35rem] rounded-full">{(isAdmin && 'Admin') || (isSuperAdmin && 'S.Admin')}</label>
            }
        </li>
    )
}

export default OrganizationJoined
