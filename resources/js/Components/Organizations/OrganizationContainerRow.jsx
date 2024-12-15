function OrganizationContainerRow({ children, title }) {
    return (
        <div className="flex flex-col w-full gap-y-3 border-[1px] border-slate-400 overflow-visible p-2 rounded-lg">
            <div className="questrial font-bold tracking-wider text-sm md:text-base justify-between w-fit px-2 -mb-3 -mt-4 md:-mt-5 ml-2 bg-[#EEEEEE]">
                {title}
            </div>
            <div className="flex flex-wrap w-full">{children}</div>
        </div>
    );
}

export default OrganizationContainerRow;
