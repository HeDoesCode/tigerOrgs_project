import UserLayout from "@/Layouts/UserLayout";
import IconQR from "../Icons/IconQR";
import IconUserPlus from "../Icons/IconUserPlus";
import IconArrowUp from "../Icons/IconArrowUp";
import EditArea from "./EditArea";

function OrganizationLayout({ editing, children, isRecruiting, pageLayoutData }) {

    return (
        <div className="w-full">
            {editing ? (
                <PageContent />
            ) : (
                <UserLayout noPadding>
                    <PageContent />
                </UserLayout>
            )}
        </div>
    )

    function PageContent() {
        return (
            <>
                <div>
                    {/* cover photo */}
                    <CoverPhoto />
                    <div className="w-full h-fit md:h-48 -mt-14 px-5 md:px-12 flex justify-between">
                        {/* organization logo */}
                        <OrganizationLogo />

                        <div className="flex-1 hidden md:flex px-8 pt-12 my-2 items-center">
                            <div className="w-full justify-center space-x-3 flex">
                                <OrganizationMetadata />
                                <div className="w-fit text-xs font-bold h-min">
                                    <button>
                                        <div className="flex items-center flex-nowrap py-1 px-3 rounded-full bg-[#D9D9D9]">
                                            View&nbsp;QR&nbsp;
                                            <IconQR size="20" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 space-y-2 inter font-bold">
                            {isRecruiting && (
                                <div className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full bg-[#FFCB11] border-[0.15rem] border-[#AAAAAA] relative">
                                    Apply
                                    <div className="inline rotate-45">
                                        <IconArrowUp size="20" />
                                    </div>
                                </div>
                            )}

                            {/* remove route if editing */}
                            <a className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full border-[0.15rem] border-[#AAAAAA] relative bg-[#EEEEEE] hover:bg-sky-500 cursor-pointer">
                                Follow
                                <div className="inline">
                                    <IconUserPlus size="20" />
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="w-full px-5 md:px-12 flex md:hidden justify-center space-x-3 my-4">
                        <OrganizationMetadata />
                        <div className="w-fit text-xs font-bold h-min">
                            <button className="flex items-center flex-nowrap py-1 px-3 rounded-full bg-[#D9D9D9] hover:bg-[#969696]">
                                <span className="hidden sm:inline">
                                    View QR{" "}
                                </span>
                                <IconQR size="20" />
                            </button>
                        </div>
                    </div>

                    {/* main content */}
                    <section className="h-fit px-5 md:px-12 space-y-3 md:space-y-8">
                        {children}
                    </section>
                </div>
            </>
        );
    }

    function CoverPhoto() {
        return (
            <div className="max-h-[25rem] h-fit rounded-b-[2rem] border-b-[0.15rem] border-b-[#AAAAAA] overflow-clip flex items-center relative z-0">
                <img
                    src={
                        pageLayoutData.find((page) => page.type === "coverPhoto").src
                    }
                    alt="Organization Cover Photo"
                    className="w-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Page Cover Photo">
                        <div>photo upload preview and shee</div>
                    </EditArea>
                )}
            </div>
        );
    }

    function OrganizationLogo() {
        return (
            <div className="size-36 md:size-44 rounded-[2rem] overflow-clip relative">
                <img
                    src={pageLayoutData.find((page) => page.type === "logo").src}
                    alt="Organization Logo"
                    className="size-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Organization Logo">
                        <div>photo upload preview and shee</div>
                    </EditArea>
                )}
            </div>
        );
    }

    function OrganizationMetadata() {
        return (
            <div className="flex-1 relative">
                <div className="text-lg inter font-extrabold">
                    {
                        pageLayoutData.find((page) => page.type === "metadata")
                            .metadata.organizationName
                    }
                </div>
                <div className="text-sm">
                    {
                        pageLayoutData.find((page) => page.type === "metadata")
                            .metadata.members
                    }{" "}
                    members
                </div>
            </div>
        );
    }



}

export default OrganizationLayout
