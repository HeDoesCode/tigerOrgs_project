function IconVideo({ size, strokeWidth }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || '2'} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-video">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
            <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
        </svg>

    )
}

export default IconVideo