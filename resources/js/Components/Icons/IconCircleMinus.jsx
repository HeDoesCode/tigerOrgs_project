function IconCircleMinus({ size, ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="0 0 24 24"
            fill={props?.fill || "none"}
            stroke={props?.stroke || "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-circle-minus ${props?.className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l6 0" />
        </svg>
    );
}

export default IconCircleMinus;
