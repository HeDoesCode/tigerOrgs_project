import { useState } from "react";
import LoadingDots from "./LoadingDots";

function ImageWithLoader({ div, img, ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div
            {...props}
            {...div}
            className={`${props?.className} ${div?.className}`}
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
