import { useState, useRef, useEffect } from "react"

function OrganizationContainerRow({ children, title, className, index, collegeLength }) {
    const [expand, setExpand] = useState(false);
    const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

    const elementRef = useRef(null);

    const checkOverflow = () => {
        if (elementRef.current) {
            const isOverflowing = elementRef.current.scrollWidth > elementRef.current.clientWidth;
            setHasHorizontalOverflow(isOverflowing);
        }
    };

    useEffect(() => {
        checkOverflow();

        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };

    }, []);

    const expandRow = () => {
        setExpand(!expand);
    }

    // this is not working f***
    function expandSpacing(index) {
        if (index === 0) {
            return 'mb-20'
        } else if (index === collegeLength) {
            return 'mb-0'
        } else {
            return 'mt-20 mb-20'
        }
    }


    return (
        <div className={`flex flex-col space-y-3 w-full ${className} ${expand && expandSpacing(index)}`}>
            <div className="flex flex-row justify-between -mb-3">
                <div className="questrial font-bold tracking-wider">{title}</div>
                <div className="w-20 relative overflow-visible">
                    {hasHorizontalOverflow && (
                        <button onClick={expandRow} className={`absolute right-0 min-w-max underline text-sm py-1 px-2 hover:bg-gray-800 hover:text-white rounded-lg ${expand ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
                            {expand ? 'hide all' : 'show all'}
                        </button>
                    )}
                </div>
            </div>
            <div ref={elementRef} className={expand ?
                (
                    'w-full select-none max-h-full overflow-y-hidden overflow-x-hidden grid grid-cols-[repeat(auto-fill,_minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-4 justify-items-center rounded-lg'
                ) :
                (
                    'flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden'
                )
            }>
                {children}
            </div>
        </div >
    )
}

export default OrganizationContainerRow
