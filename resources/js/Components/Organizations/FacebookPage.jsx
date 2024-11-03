
export default function FacebookPage({ className, link = '' }) {
    const encodedLink = encodeURIComponent(link)
    return (
        <div className="flex">
            {link ? (
                <div className="flex flex-wrap items-center gap-4">
                    <a
                        className="text-left hover:outline hover:outline-1 rounded-md my-2 hover:outline-gray-500 hover:px-2 transition-all max-w-full p-2 w-full"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="leading-3 text-xs italic text-black/30">Click link to visit:</span><br />
                        <span className="underline line-clamp-1">{link}</span>
                    </a>
                    <div className={`h-full ${className} w-full facebook-feed flex justify-center scale-100 max-[468px]:scale-75 lg:scale-100`}>
                        <iframe src={`https://www.facebook.com/plugins/page.php?href=${encodedLink}&tabs=timeline&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                            // width=""
                            height="500"
                            className="border-none overflow-hidden"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe>
                    </div>
                </div>
            ) : (
                <span className="font-bold text-sm italic text-black/30">No link provided</span>
            )}
        </div>
    );
}
