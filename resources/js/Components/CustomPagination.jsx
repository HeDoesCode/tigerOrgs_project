import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

function CustomPagination({ page }) {

    useEffect(() => {
        // Execute scrolling logic when the component mounts
        const element = document.getElementById('scroll-target');
        if (element) {
            element.scrollIntoView({
                block: 'center',
                inline: 'center'
            });
        }
    }, [page]); // Empty dependency array ensures this runs once on mount


    function handlePaging(href = false) {
        if (href) {
            router.get(href)
        }
    }

    return (
        <div className="max-w-full w-fit flex justify-between shadow-md shadow-black/40 py-1 bg-[#EEEEEE] rounded-full overflow-clip px-1">
            <Pagination className='contents'>
                <PaginationContent className='contents'>
                    <div className="w-fit my-auto">
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePaging(page.links[0].url)}
                                className={`rounded-l-full ${page.current_page === 1 && 'cursor-not-allowed hover:bg-transparent'}`} />
                        </PaginationItem>
                    </div>

                    <div className="flex flex-row flex-1 overflow-x-auto">
                        {page.links.map((link, index) => {
                            if (index !== 0 && index !== page.links.length - 1) {
                                if (link.label === '...') {
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )
                                } else {
                                    return (
                                        <PaginationItem key={index} id={link.active !== false ? 'scroll-target' : ''}>
                                            <PaginationLink
                                                onClick={() => handlePaging(link.url)}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                }
                            }
                        })}
                    </div>

                    <div className="w-fit my-auto">
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePaging(page.links[page.links.length - 1].url)}
                                className={`rounded-r-full ${page.current_page === page.last_page && 'cursor-not-allowed hover:bg-transparent'}`}
                            />
                        </PaginationItem>
                    </div>
                </PaginationContent>
            </Pagination>
        </div>

    )
}

export default CustomPagination
