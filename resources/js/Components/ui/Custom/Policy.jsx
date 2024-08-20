function Policy({ children }) {
    return (
        <article className='font-semibold text-2xl inter'>
            {children}
        </article>
    )
}

Policy.Title = ({ children }) => {
    return (
        <div className="font-semibold text-2xl mb-3">
            {children}
        </div>
    )
}

Policy.Content = ({ children }) => {
    return (
        <div className="space-y-3 font-extralight text-sm">
            {children}
        </div>
    )
}

Policy.Paragraph = ({ children }) => {
    return (
        <p className="text-justify">{children}</p>
    )
}

Policy.Number = ({ number, title, children }) => {
    return (
        <div className="flex flex-col">
            <div className="font-bold relative mb-1">
                <div className="absolute">{number}.</div>
                <div className="pl-4 top-0">{title}</div>
            </div>
            <div className='pl-4 space-y-1 text-justify'>{children}</div>
        </div>
    )
}

Policy.Bullet = ({ children }) => {
    return (
        <div className="flex items-start">
            <div>•</div>
            <div className="pl-1">{children}</div>
        </div>
    )
}

export default Policy
