import { Link } from "@inertiajs/react";
import { useRef } from "react";

function OrganizationTile({ orgBg, orgIcon, title, desc, count, recruiting, href, className }) {
    // console.log(orgBg)
    const imgRef = useRef(null);
    const hideImage = () => {
        if (imgRef.current) {
            imgRef.current.style.display = 'none';
        }
    };

    return (
        <Link href={href} className={`w-min space-y-2 hover:cursor-pointer group p-3 hover:scale-[1.06] flex flex-col justify-center items-center transition-all duration-300 ease-in-out transOptimize h-max select-none ${className}`}>
            <div className="h-52 md:h-72 aspect-[5/8] relative">
                <img src={orgBg} className="object-cover h-full rounded-lg shadow-sm" ref={imgRef} />
                {recruiting && <div className="absolute left-1/2 -translate-x-1/2 top-3 text-[0.6rem] px-2 py-[0.15rem] rounded-[0.25rem] bg-[#EF9B1E]/90 inter font-extrabold text-white shadow-sm shadow-black/50">Now&nbsp;Recruiting</div>}
                <img src={orgIcon} className="absolute right-2 bottom-2 bg-[#EEEEEE] size-14 rounded-full object-cover" ref={imgRef} />
                <div className="transition-all hidden md:flex flex-col justify-center duration-200 ease-in-out absolute inset-0 bg-black/0 overflow-y-auto group-hover:bg-black/70 invisible group-hover:visible group-hover:delay-100 rounded-lg text-white/0 group-hover:text-white/100 p-3 tracking-wide transOptimize">
                    <p className="poppins tracking-normal md:tracking-wide text-sm md:text-lg">{title}</p>
                    <p className="quicksand font-extralight text-sm overflow-hidden overflow-ellipsis">{desc}</p>
                </div>
            </div>
            {/* hover replacement */}
            <div className="space-y-1">
                <div className="w-full line-clamp-2 poppins text-sm font-bold tracking-wide">{title}</div>
                <div className="w-full text-xs line-clamp-2">{desc}</div>
                <div className="w-full text-xs line-clamp-1 text-gray-600 truncate">{count} Members</div>
            </div>
        </Link>
    )
}


export default OrganizationTile
