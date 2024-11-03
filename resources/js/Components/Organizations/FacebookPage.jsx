import { useEffect } from "react";

function FacebookPage({ className, link = '' }) {
    // useEffect(() => {
    //     if (link) {
    //         if (!window.FB) {
    //             const fbScript = document.createElement('script');
    //             fbScript.async = true;
    //             fbScript.defer = true;
    //             fbScript.crossOrigin = 'anonymous';
    //             fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    //             fbScript.onload = () => {
    //                 window.FB.init({
    //                     xfbml: true,
    //                     version: 'v21.0',
    //                 });
    //                 window.FB.XFBML.parse();
    //             };
    //             document.body.appendChild(fbScript);
    //         } else {
    //             window.FB.XFBML.parse();
    //         }
    //     }
    // }, [link]);
    // // for debugging return nothing for now. uncomment to enable
    // return (
    //     <div className="flex flex-col gap-y-3">
    //         {link ? (
    //             <>
    //                 <a
    //                     className="truncate flex-1 text-left hover:outline hover:outline-1 rounded-md my-2 hover:outline-gray-500 hover:px-2 transition-all max-w-full"
    //                     href={link}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     <span className="leading-3 text-xs italic text-black/30">Click link to visit:</span><br />
    //                     <span className="underline">{link}</span>
    //                 </a>
    //                 <div className={`h-full ${className} w-full facebook-feed flex justify-center scale-100 max-[468px]:scale-75 lg:scale-100`}>
    //                     <div
    //                         key={link}
    //                         className="fb-page"
    //                         data-href={link}
    //                         data-tabs="timeline"
    //                         data-width=""
    //                         data-height="500"
    //                         data-small-header="false"
    //                         data-adapt-container-width="true"
    //                         data-hide-cover="false"
    //                         data-show-facepile="true"
    //                     ></div>
    //                 </div>
    //             </>
    //         ) : (
    //             <span className="font-bold text-sm italic text-black/30">No link provided</span>
    //         )}
    //     </div>
    // );

    return (
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsite.ust%2F&tabs=timeline&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
            // width=""
            height="500"
            className="border-none overflow-hidden"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">

        </iframe>
    )
}

export default FacebookPage;
