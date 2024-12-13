import LoadingDots from "@/Components/LoadingDots";
import OrganizationTile from "@/Components/Organizations/OrganizationTile";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function TestOrganizationsPagination({ paginatedOrganizations }) {
    const [pagination, setPagination] = useState(paginatedOrganizations);
    const scrollEdgeRef = useRef(null);

    const [edgeIsInView, setEdgeIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !edgeIsInView) {
                    setEdgeIsInView(true);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0,
            }
        );
        if (scrollEdgeRef.current) {
            observer.observe(scrollEdgeRef.current);
        }
        return () => {
            if (scrollEdgeRef.current) {
                observer.unobserve(scrollEdgeRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (edgeIsInView && pagination.next_page_url) {
                try {
                    const response = await axios.get(pagination.next_page_url);
                    let newPagination = response.data;
                    newPagination = {
                        ...newPagination,
                        data: [...pagination.data, ...newPagination.data],
                    };
                    setPagination(newPagination);
                } catch (error) {
                    console.log("Fetching new data returned error", error);
                }
            }
        };
        fetchData();
    }, [edgeIsInView]);

    useEffect(() => {
        if (edgeIsInView) setEdgeIsInView(false);
    }, [pagination]);

    return (
        <div className="flex flex-wrap w-screen gap-y-10 overflow-x-hidden h-screen overflow-y-auto">
            {pagination.data.map((org) => (
                <OrganizationTile
                    key={org.orgID}
                    orgBg={
                        org.photos && org.photos.length > 0
                            ? org.photos[0].filename
                            : "https://placehold.co/500x800"
                    }
                    orgIcon={org.logo}
                    title={org.name}
                    recruiting={org.recruiting}
                    desc={org.description}
                    count={org.members_count}
                    href={route("organizations.home", {
                        orgID: org.orgID,
                    })}
                />
            ))}
            {(pagination.next_page_url && (
                <>
                    {/* <div className="w-full"  /> */}
                    <div className="mb-10 w-full" ref={scrollEdgeRef}>
                        <LoadingDots active />
                    </div>
                </>
            )) || <div className="w-full text-center mb-4">End of Page</div>}
        </div>
    );
}

export default TestOrganizationsPagination;
