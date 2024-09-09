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
import ControlContainer from "@/Components/Organizations/ControlContainer";
import ControlKeywords from "@/Components/Organizations/ControlKeywords";
import OrganizationJoined from "@/Components/Organizations/OrganizationJoined";
import OrganizationContainerRow from "@/Components/Organizations/OrganizationContainerRow";
import OrganizationTile from "@/Components/Organizations/OrganizationTile";
import Pre from "@/Components/Pre";
import { useState } from "react";
import { useEffect } from "react";

function Organizations({
    organizations,
    queryParameters = null,
    departments,
    keywords,
}) {
    queryParameters = queryParameters || {};
    const [organizationList, setOrganizationList] = useState({});

    useEffect(() => {
        const groupedByDepartment = organizations.reduce(
            (acc, organization) => {
                const department = organization.department;
                if (!acc[department]) {
                    acc[department] = [];
                }
                acc[department].push(organization);
                return acc;
            },
            {}
        );

        setOrganizationList(groupedByDepartment);
    }, [organizations]);

    const handleSearch = (e) => {
        const searchDebounce = setTimeout(() => {
            if (e.target.value !== "") {
                queryParameters["search"] = e.target.value;
            } else {
                delete queryParameters["search"];
            }
            router.get(route("organizations"), queryParameters, {
                preserveState: true,
                // replace: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(searchDebounce);
    };

    const handleFilterCategory = (category) => {
        const filterCategoryDebounce = setTimeout(() => {
            if (category !== "All") {
                queryParameters["category"] = category;
            } else {
                delete queryParameters["category"];
            }
            router.get(route("organizations"), queryParameters, {
                preserveState: true,
                // replace: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(filterCategoryDebounce);
    };

    const handleClearQuery = () => {
        router.get(route("organizations"));
    };

    return (
        <div className="w-full">
            <Head title="Browse Organizations" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Browse <span className="text-[#ffb700]">Organizations</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* control panel */}
                    <div className="flex flex-col w-full md:w-64 space-y-5">
                        <ControlContainer className="relative" name="Search">
                            <input
                                type="text"
                                className="peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-11 pl-10 focus:pl-3 transition-all duration-200"
                                defaultValue={queryParameters["search"] || ""}
                                onChange={handleSearch}
                            />
                            <div className="absolute text-gray-500 left-0 bottom-0 h-11 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                                <IconSearch size="22" />
                            </div>
                        </ControlContainer>

                        <ControlContainer name="Keywords">
                            <ControlKeywords keywords={keywords} />
                        </ControlContainer>

                        <ControlContainer name="Category">
                            <Select
                                defaultValue="All"
                                onValueChange={handleFilterCategory}
                            >
                                <SelectTrigger className="w-full h-12 border-gray-500 bg-transparent">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent
                                    className="border-gray-500 bg-[#EEEEEE] quicksand"
                                    ref={(ref) => {
                                        if (!ref) return;
                                        ref.ontouchstart = (e) =>
                                            e.preventDefault();
                                    }}
                                >
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
                                            className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                        >
                                            {department}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </ControlContainer>

                        {/* {Object.keys(queryParameters).length !== 0 && ( */}
                        <ControlContainer
                            className={`flex items-center !-mb-3 !mt-3 ${
                                Object.keys(queryParameters).length !== 0
                                    ? "visible"
                                    : "invisible"
                            }`}
                        >
                            <button
                                className="w-fit px-3 py-1 bg-[#ffb700] hover:bg-[#f1ad00] rounded-lg text-sm"
                                onClick={handleClearQuery}
                            >
                                Clear All
                            </button>
                        </ControlContainer>
                        {/* )} */}

                        <ControlContainer>
                            <ul className="bg-transparent flex flex-col py-3 rounded-md space-y-4">
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                                    title="Office for Student Affairs"
                                    isSuperAdmin
                                    link={route("superadmin.status")}
                                />
                            </ul>
                        </ControlContainer>

                        <ControlContainer name="Your&nbsp;Organizations">
                            <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-1">
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                                    title="Fotomasino"
                                    isAdmin
                                    link={route("admin.editpage", {
                                        orgID: 1,
                                    })}
                                />
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                                    title="UST Mountaineering Club"
                                />
                            </ul>
                        </ControlContainer>
                    </div>

                    {/* orgs panel */}
                    <div className="md:flex-1 space-y-3 overflow-x-hidden">
                        {/* <Pre object={keywords} /> */}

                        {queryParameters && organizations.length === 0 && (
                            <div className="w-full flex justify-center font-bold text-gray-400">
                                No Organizations Found
                            </div>
                        )}

                        {Object.entries(organizationList).map(
                            ([department, orgs], index) => (
                                <OrganizationContainerRow
                                    key={department}
                                    title={department}
                                    index={index}
                                    collegeLength={
                                        Object.keys(organizationList).length
                                    }
                                >
                                    {orgs.map((org, index) => (
                                        <OrganizationTile
                                            key={index}
                                            orgBg={org.photos[0].filename}
                                            orgIcon={org.logo}
                                            title={org.name}
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
        </div>
    );
}

export default Organizations;
