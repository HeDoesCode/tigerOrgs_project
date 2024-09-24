import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import CustomPagination from "@/Components/CustomPagination";

export default function SuperAdminLoginHistory({ loginEntries }) {

    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Login History",
                            link: "superadmin.loginhistory",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Invite History",
                            link: "superadmin.invitehistory",
                        },
                    ]}
                    title="Activity Log"
                >
                    <div className="grid grid-rows-1 p-5 gap-2">
                        <div className="-mt-4 text-sm w-full flex justify-end">
                            {`Showing ${loginEntries.current_page === 1 ?
                                loginEntries.current_page * loginEntries.per_page :
                                `${((loginEntries.current_page - 1) * loginEntries.per_page) + 1}-${loginEntries.current_page * loginEntries.per_page}`
                                }/${loginEntries.total}`}
                        </div>
                        {loginEntries.data.map((entry, index) => (
                            <VerticalCard gridcol="sm:grid-cols-7" key={index}>
                                <div className=" col-span-1 ">
                                    <h1 className="ml-2  text-center font-semibold text-gray-500">
                                        {entry.login_date}
                                    </h1>
                                </div>
                                <div className=" col-span-5 ">
                                    <h1 className="ml-2  text-center">
                                        <span className="font-bold text-gray-500">
                                            {`${entry.firstname} ${entry.lastname}`}
                                        </span>{" "}
                                        <span className="text-gray-500 font-medium">
                                            accessed the Super Admin Dashboard
                                        </span>
                                    </h1>
                                </div>
                                <div className=" col-span-1 ">
                                    <h1 className="ml-2 text-center font-semibold text-gray-500">
                                        {entry.login_time}
                                    </h1>
                                </div>
                            </VerticalCard>
                        ))}
                        <div className="h-10 w-full">
                            <div className="fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center">
                                {/* start component detach here */}
                                <CustomPagination page={loginEntries} />
                                {/* <div className="max-w-full w-fit flex justify-between shadow-md shadow-black/40 py-1 bg-[#EEEEEE] rounded-full">
                                    <Pagination className='contents'>
                                        <PaginationContent className='contents'>
                                            <div className="w-fit my-auto">
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() => handlePaging(page.links[0].url)}
                                                        className={page.current_page === 1 && 'cursor-not-allowed hover:bg-transparent'} />
                                                </PaginationItem>
                                            </div>

                                            <div className="flex flex-row flex-1 overflow-x-auto">
                                                {page.links.map((link, index) => {
                                                    if (index !== 0 && index !== page.links.length - 1) {
                                                        return (
                                                            <PaginationItem key={index}>
                                                                <PaginationLink
                                                                    onClick={() => handlePaging(link.url)}
                                                                    isActive={link.active}
                                                                >
                                                                    {link.label}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        )
                                                    }
                                                })}
                                            </div>

                                            <div className="w-fit my-auto">
                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() => handlePaging(page.links[page.links.length - 1].url)}
                                                        className={page.current_page === page.last_page && 'cursor-not-allowed hover:bg-transparent'}
                                                    />
                                                </PaginationItem>
                                            </div>
                                        </PaginationContent>
                                    </Pagination>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
