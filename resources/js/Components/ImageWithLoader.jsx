import { useState } from "react";
import LoadingDots from "./LoadingDots";

function ImageWithLoader({ div, img, ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);

    return (
        <div
            {...props}
            className={`${props?.className} ${div?.className}`}
            {...div}
        >
            <LoadingDots active={isLoading} />
            <img
                {...props}
                {...img}
                className={`${props?.className} ${img?.className} ${
                    isLoading && "hidden"
                }`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}

export default ImageWithLoader;
