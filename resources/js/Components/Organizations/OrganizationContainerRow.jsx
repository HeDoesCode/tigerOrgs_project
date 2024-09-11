import { useState, useRef, useEffect } from "react"

function OrganizationContainerRow({ children, title, className, index, collegeLength }) {
    const [expand, setExpand] = useState(false);
    const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
    const [isScrolledOffStart, setIsScrolledOffStart] = useState(false);

    const elementRef = useRef(null);

    const checkOverflow = () => {
        if (elementRef.current) {
            const isOverflowing = elementRef.current.scrollWidth > elementRef.current.clientWidth;
            setHasHorizontalOverflow(isOverflowing);

            const scrollLeft = elementRef.current.scrollLeft;
            const offsetWidth = elementRef.current.offsetWidth;
            const scrollWidth = elementRef.current.scrollWidth;

            const isAtEnd = Math.abs(scrollLeft + offsetWidth - scrollWidth) < 1;
            setIsScrolledToEnd(isAtEnd);
            const isOffStart = scrollLeft > 0;
            setIsScrolledOffStart(!isOffStart);
        }
    };

    useEffect(() => {
        const div = elementRef.current;
        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        div.addEventListener("scroll", checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
            div.removeEventListener("scroll", checkOverflow);
        };

    }, []);

    const expandRow = () => {
        setExpand(!expand);
    }

    // this is not working f***
    function expandSpacing(index) {
        if (index === 0) {
            return 'pb-10'
        } else if (index === collegeLength) {
            return 'pb-0'
        } else {
            return 'pt-10 pb-10'
        }
    }


    return (
        <div className={`flex flex-col gap-y-3 w-full relative ${className} ${expand && expandSpacing(index)}`}>
            <div className="flex flex-row justify-between -mb-3">
                <div className="questrial font-bold tracking-wider">{title}</div>
                <div className="w-20 min-w-20 relative overflow-visible">
                    {(hasHorizontalOverflow || expand) && (
                        <button onClick={expandRow} className={`absolute right-0 min-w-max underline text-sm py-1 px-2 hover:bg-gray-800 hover:text-white rounded-lg ${expand ? 'text-blue-500 font-bold' : 'text-gray-500'} z-30`}>
                            {expand ? 'hide all' : 'show all'}
                        </button>
                    )}
                </div>
            </div>
            <div ref={elementRef} className={expand ?
                (
                    'w-full select-none max-h-full overflow-y-hidden overflow-x-hidden grid grid-cols-[repeat(auto-fill,_minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-4 justify-items-center rounded-lg border border-gray-300'
                ) :
                (
                    `flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden`
                )
            }>
                {children}

            </div>
            {!expand && hasHorizontalOverflow && (
                <div className={`absolute right-0 top-6 bottom-0 w-20 bg-gradient-to-r from-transparent to-[#EEEEEE]/70 pointer-events-none transition-all ease-in ${isScrolledToEnd && '!w-0'}`}>
                </div>
            )}
            {!expand && hasHorizontalOverflow && (
                <div className={`absolute left-0 top-6 bottom-0 w-20 bg-gradient-to-l from-transparent to-[#EEEEEE]/70 pointer-events-none transition-all ease-in ${isScrolledOffStart && '!w-0'}`}>
                </div>
            )}
        </div >
    )
}

export default OrganizationContainerRow
