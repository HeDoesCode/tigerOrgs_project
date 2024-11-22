import IconDownload from "@/Components/Icons/IconDownload";
import IconFile from "@/Components/Icons/IconFile";
import IconFileDownload from "@/Components/Icons/IconFileDownload";
import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head } from "@inertiajs/react";

function SuperAdminManual() {
    return (
        <div className="w-full">
            <Head title="Manuals Download" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconDownload />,
                            label: "Download",
                            link: "superadmin.manual",
                        },
                    ]}
                    title="Download Manual"
                >
                    <div className="p-5">
                        <div className="p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7">
                            <h1 className="font-bold">
                                User Manual - Super Admin
                            </h1>
                            <div className="flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out">
                                <button
                                    className="cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md"
                                    onClick={() =>
                                        (window.location.href = route(
                                            "superadmin.download",
                                            ["manual"]
                                        ))
                                    }
                                >
                                    <span>Download Manual</span>
                                    <IconFileDownload />
                                </button>
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminManual;
