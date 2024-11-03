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
    function scrollToElement() {
        const element = document.getElementById("scroll-target");
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }

    useEffect(() => {
        scrollToElement();
        window.addEventListener("resize", scrollToElement);
        return () => {
            window.removeEventListener("resize", scrollToElement);
        };
    }, [page]);

    function handlePaging(href = false) {
        if (href) {
            // Get current URL search params
            const currentParams = new URLSearchParams(window.location.search);
            // Get new URL search params
            const newUrl = new URL(href, window.location.origin);
            const newParams = newUrl.searchParams;

            // Preserve existing search and department parameters
            const search = currentParams.get("search") || "";
            const department = currentParams.get("department") || "All";

            // Navigate with preserved parameters
            router.get(
                href,
                {
                    search: search,
                    department: department,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }
    }

    return (
        <div className="max-w-full w-fit flex justify-between shadow-md shadow-black/40 py-1 bg-[#EEEEEE] rounded-full overflow-clip px-1">
            <Pagination className="contents">
                <PaginationContent className="contents">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePaging(page.links[0].url)}
                            className={`rounded-l-full h-full ${
                                page.current_page === 1 &&
                                "cursor-not-allowed hover:bg-transparent"
                            }`}
                        />
                    </PaginationItem>

                    <div className="flex flex-row flex-1 overflow-x-auto">
                        {page.links.map((link, index) => {
                            if (
                                index !== 0 &&
                                index !== page.links.length - 1
                            ) {
                                if (link.label === "...") {
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                } else {
                                    return (
                                        <PaginationItem
                                            key={index}
                                            id={
                                                link.active !== false
                                                    ? "scroll-target"
                                                    : ""
                                            }
                                        >
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePaging(link.url)
                                                }
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                handlePaging(
                                    page.links[page.links.length - 1].url
                                )
                            }
                            className={`rounded-r-full h-full ${
                                page.current_page === page.last_page &&
                                "cursor-not-allowed hover:bg-transparent"
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default CustomPagination;
