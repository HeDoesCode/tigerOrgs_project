import { useEffect } from "react";
import { memo } from "react";

const FacebookPage = memo(function FacebookPage({ className, link = '' }) {
    useEffect(() => {
        if (link) {
            if (!window.FB) {
                const fbScript = document.createElement('script');
                fbScript.async = true;
                fbScript.defer = true;
                fbScript.crossOrigin = 'anonymous';
                fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
                fbScript.onload = () => {
                    window.FB.init({
                        xfbml: true,
                        version: 'v16.0',
                    });
                    window.FB.XFBML.parse();
                };
                document.body.appendChild(fbScript);
            } else {
                window.FB.XFBML.parse();
            }
        }
    }, [link]);
    // for debugging return nothing for now. uncomment to enable
    return (
        <div className="flex flex-col gap-y-3">
            {link ? (
                <>
                    <a
                        className="truncate flex-1 text-left hover:outline hover:outline-1 rounded-md my-2 hover:outline-gray-500 hover:px-2 transition-all max-w-full"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="leading-3 text-xs italic text-black/30">Click link to visit:</span><br />
                        <span className="underline">{link}</span>
                    </a>
                    <div className={`h-full ${className} w-full facebook-feed flex justify-center scale-100 max-[468px]:scale-75 lg:scale-100`}>
                        <div
                            key={link}
                            className="fb-page"
                            data-href={link}
                            data-tabs="timeline"
                            data-width=""
                            data-height="500"
                            data-small-header="false"
                            data-adapt-container-width="true"
                            data-hide-cover="false"
                            data-show-facepile="true"
                        ></div>
                    </div>
                </>
            ) : (
                <span className="font-bold text-sm italic text-black/30">No link provided</span>
            )}
        </div>
    );
})

export default FacebookPage;
