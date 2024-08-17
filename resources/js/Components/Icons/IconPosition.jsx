function IconPosition({ size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || "24"}
            height={size || "24"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-vector-bezier"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M17 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M10 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M10 8.5a6 6 0 0 0 -5 5.5" />
            <path d="M14 8.5a6 6 0 0 1 5 5.5" />
            <path d="M10 8l-6 0" />
            <path d="M20 8l-6 0" />
            <path d="M3 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M21 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
    );
}

export default IconPosition;
