function Logo({ className, leftClass, rightClass }) {
    return (
        <div className={`poetsen-one text-2xl ${className} select-none`}>
            <span className={`text-[#E7A600] ${leftClass}`}>Tiger</span>
            <span className={rightClass}>Orgs</span>
        </div>
    )
}

export default Logo
