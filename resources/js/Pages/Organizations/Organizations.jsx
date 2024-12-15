import IconSearch from "@/Components/Icons/IconSearch";
import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import ControlContainer from "@/Components/Organizations/ControlContainer";
import ControlKeywords from "@/Components/Organizations/ControlKeywords";
import OrganizationJoined from "@/Components/Organizations/OrganizationJoined";
import OrganizationContainerRow from "@/Components/Organizations/OrganizationContainerRow";
import OrganizationTile from "@/Components/Organizations/OrganizationTile";
import { useState } from "react";
import { useEffect } from "react";
import CustomPagination from "@/Components/CustomPagination";

function Organizations({
    organizations,
    recommendedOrganizations,
    queryParameters = null,
    departments,
    keywords,
    myMemberOrganizations,
}) {
    queryParameters = queryParameters || {};

    const hasQueryParameters = [
        "search",
        "department",
        "keyword_filter[0][keyID]",
        "keyword_filter[1][keyword]",
    ].some((param) => new URLSearchParams(window.location.search).has(param));

    const [organizationList, setOrganizationList] = useState([]);

    useEffect(() => {
        setOrganizationList(organizations.data || organizations);
    }, [organizations]);

    // call server for search query every change
    const handleSearch = (e) => {
        const searchDebounce = setTimeout(() => {
            if (e.target.value !== "") {
                queryParameters["search"] = e.target.value;
            } else {
                delete queryParameters["search"];
            }
            router.get(route("organizations"), queryParameters, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(searchDebounce);
    };

    // call server for department/college filter
    const handleFilterCategory = (category) => {
        const filterCategoryDebounce = setTimeout(() => {
            if (category !== "All") {
                queryParameters["category"] = category;
            } else {
                delete queryParameters["category"];
            }
            router.get(route("organizations"), queryParameters, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(filterCategoryDebounce);
    };

    const formatOrgJoinedLink = (role, orgID) => {
        switch (role) {
            case "student": {
                return route("organizations.home", orgID);
            }
            case "admin": {
                return route("admin.editpage", orgID);
            }
        }
    };

    // get this route to remove all filters
    const handleClearQuery = () => {
        router.get(route("organizations"));
    };

    return (
        <div className="w-full relative">
            <Head title="Browse Organizations" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Browse <span className="text-[#ffb700]">Organizations</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6 ">
                    {/* control panel */}
                    <div className="flex flex-col w-full md:w-64 space-y-2">
                        <ControlContainer className="relative" name="Search">
                            <input
                                type="text"
                                className="peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-11 pl-10 focus:pl-3 transition-all duration-200 shadow-md"
                                defaultValue={queryParameters["search"] || ""}
                                onChange={handleSearch}
                                placeholder="Dept./Organization"
                            />
                            <div className="absolute text-gray-500 left-0 bottom-0 h-11 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                                <IconSearch size="22" />
                            </div>
                        </ControlContainer>

                        <ControlContainer name="Keywords">
                            <ControlKeywords
                                keywords={keywords}
                                queryParameters={queryParameters}
                            />
                        </ControlContainer>

                        <ControlContainer name="Department">
                            <Select
                                defaultValue="All"
                                onValueChange={handleFilterCategory}
                            >
                                <SelectTrigger className="w-full h-12 border-gray-500 bg-transparent shadow-md">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand">
                                    <SelectItem
                                        value="All"
                                        className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        All
                                    </SelectItem>
                                    {departments.map((department, index) => (
                                        <SelectItem
                                            key={index}
                                            value={department}
                                            onClick={(e) => e.stopPropagation()}
                                            className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                        >
                                            {department}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </ControlContainer>

                        <ControlContainer
                            className={` items-center !mt-3 ${
                                Object.keys(queryParameters).length !== 0
                                    ? "flex"
                                    : "hidden"
                            }`}
                        >
                            <button
                                className="w-fit px-3 py-1 bg-[#ffb700] hover:bg-[#f1ad00] rounded-lg text-sm"
                                onClick={handleClearQuery}
                            >
                                Clear All
                            </button>
                        </ControlContainer>

                        {myMemberOrganizations.length !== 0 && (
                            <ControlContainer
                                name="Organizations&nbsp;you've&nbsp;joined:"
                                className="!hidden md:!flex"
                            >
                                <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-1">
                                    {Object.values(myMemberOrganizations).map(
                                        (org, index) => (
                                            <OrganizationJoined
                                                key={index}
                                                visibility={org.visibility}
                                                icon={org.logoUrl}
                                                title={org.name}
                                                isAdmin={
                                                    org.role_description ===
                                                    "admin"
                                                }
                                                link={formatOrgJoinedLink(
                                                    org.role_description,
                                                    org.orgID
                                                )}
                                            />
                                        )
                                    )}
                                </ul>
                            </ControlContainer>
                        )}

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left flex md:hidden">
                                    <ControlContainer name="Organizations&nbsp;you've&nbsp;joined:"></ControlContainer>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-1">
                                        {Object.values(
                                            myMemberOrganizations
                                        ).map((org, index) => (
                                            <OrganizationJoined
                                                key={index}
                                                visibility={org.visibility}
                                                icon={org.logoUrl}
                                                title={org.name}
                                                isAdmin={
                                                    org.role_description ===
                                                    "admin"
                                                }
                                                link={formatOrgJoinedLink(
                                                    org.role_description,
                                                    org.orgID
                                                )}
                                            />
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* orgs panel */}
                    <div className="md:flex-1 flex flex-col gap-y-7 overflow-x-hidden pt-5">
                        {queryParameters && organizations.length === 0 && (
                            <div className="w-full flex justify-center font-bold text-gray-400">
                                No Organizations Found
                            </div>
                        )}

                        {Object.entries(organizationList).map(
                            ([department, orgs]) => (
                                <OrganizationContainerRow
                                    key={department}
                                    title={department}
                                >
                                    {orgs.map((org, index) => (
                                        <OrganizationTile
                                            key={index}
                                            orgBg={
                                                org.photos &&
                                                org.photos.length > 0
                                                    ? org.photos[0].Url
                                                    : "https://placehold.co/500x800"
                                            }
                                            orgIcon={org.logoUrl}
                                            title={org.name}
                                            recruiting={org.recruiting}
                                            desc={org.description}
                                            count={org.members_count}
                                            href={route("organizations.home", {
                                                orgID: org.orgID,
                                            })}
                                        />
                                    ))}
                                </OrganizationContainerRow>
                            )
                        )}
                    </div>
                </div>
            </UserLayout>
            {!hasQueryParameters && (
                <div className="absolute bottom-5 left-5 md:left-64 right-5 flex justify-center">
                    <CustomPagination page={organizations} />
                </div>
            )}
        </div>
    );
}

export default Organizations;
