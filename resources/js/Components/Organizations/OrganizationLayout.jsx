import UserLayout from "@/Layouts/UserLayout";
import IconQR from "../Icons/IconQR";
import IconUserPlus from "../Icons/IconUserPlus";
import IconArrowUp from "../Icons/IconArrowUp";
import EditArea from "./EditArea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { QRCode } from "react-qrcode-logo";
import { Link, router } from "@inertiajs/react";
import IconUserCancel from "../Icons/IconUserCancel";
import IconUserCheck from "../Icons/IconUserCheck";
import { useState } from "react";
import { useEffect } from "react";
// import { useRef } from "react";

function OrganizationLayout({
    editing,
    children,
    pageLayoutData,
    setEditableLayoutData,
    withFollow,
}) {
    const toggleFollow = () => {
        router.get(route("organizations.follow", pageLayoutData.orgID), {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
    );

    function PageContent() {
        // const qrRef = useRef(null);

        // console.log(route('organizations.home', { orgID: pageLayoutData.orgID }))

        const qrValue = () => {
            return route("organizations.home", { orgID: pageLayoutData.orgID });
        };

        return (
            <>
                <div>
                    {/* cover photo */}
                    <CoverPhoto globalData={pageLayoutData.coverPhoto} />
                    <div className="w-full h-fit md:h-48 -mt-14 px-5 md:px-12 flex justify-between">
                        {/* organization logo */}
                        <OrganizationLogo />

                        <div className="flex-1 hidden md:flex px-8 pt-12 my-2 items-center">
                            <div className="w-full justify-center space-x-3 flex">
                                <OrganizationMetadata />
                                <div className="w-fit text-xs font-bold h-min">
                                    {pageLayoutData.orgID && <QRButton />}
                                </div>
                            </div>
                        </div>
                        {!editing && (
                            <div className="pt-8 space-y-2 inter font-bold">
                                {pageLayoutData.recruiting && (
                                    <Link
                                        className="contents"
                                        href={route(
                                            "organizations.process",
                                            pageLayoutData.orgID
                                        )}
                                    >
                                        <div className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full bg-[#FFCB11] border-[0.15rem] border-[#AAAAAA] relative h-12">
                                            Apply
                                            <div className="inline rotate-45">
                                                <IconArrowUp size="20" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* remove route if editing */}
                                {withFollow && withFollow ? (
                                    // not following org
                                    <button
                                        onClick={toggleFollow}
                                        className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full border-[0.15rem] border-[#AAAAAA] relative bg-[#EEEEEE] hover:bg-sky-400 cursor-pointer h-12"
                                    >
                                        Follow
                                        <div className="inline">
                                            <IconUserPlus size="20" />
                                        </div>
                                    </button>
                                ) : (
                                    // already following org
                                    <button
                                        onClick={toggleFollow}
                                        className="group flex flex-nowrap text-sm justify-center items-center px-4 py-2 rounded-full border-[0.15rem] border-[#AAAAAA] relative bg-sky-400 hover:bg-orange-400 cursor-pointer h-12"
                                    >
                                        <span className="group-hover:hidden w-16">
                                            Followed
                                        </span>
                                        <span className="hidden group-hover:inline w-16">
                                            Unfollow
                                        </span>
                                        <div className="inline group-hover:hidden">
                                            <IconUserCheck size="20" />
                                        </div>
                                        <div className="hidden group-hover:inline">
                                            <IconUserCancel size="20" />
                                        </div>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="w-full px-5 md:px-12 flex md:hidden justify-center space-x-3 my-4">
                        <OrganizationMetadata />
                        <div className="w-fit text-xs font-bold h-min">
                            <QRButton />
                        </div>
                    </div>

                    {/* main content */}
                    <section className="h-fit px-5 md:px-12 space-y-3 md:space-y-8">
                        {children}
                    </section>
                </div>
            </>
        );

        function QRButton() {
            return (
                <Dialog>
                    <DialogTrigger className="flex items-center flex-nowrap py-1 px-3 rounded-full bg-[#D9D9D9]">
                        View&nbsp;QR&nbsp;
                        <IconQR size="20" />
                    </DialogTrigger>
                    <DialogContent className="w-fit p-10">
                        <DialogTitle className="text-center hidden">
                            QR Code
                        </DialogTitle>
                        <DialogDescription className="hidden"></DialogDescription>
                        <div className="flex flex-col items-center space-y-3">
                            <span>
                                {route("organizations.home", {
                                    orgID: pageLayoutData.orgID,
                                })}
                            </span>
                            <button>
                                <QRCode
                                    value={qrValue}
                                    size={200}
                                    qrStyle="dots"
                                />
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            );
        }
    }

    function CoverPhoto() {
        const [file, setFile] = useState(null);

        const [previewUrl, setPreviewUrl] = useState(null);

        function handleImageChange(event) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            fileReader.readAsDataURL(selectedFile);
        }

        const handleSave = () => {
            setEditableLayoutData({
                ...pageLayoutData,
                coverPhoto: file,
                coverPhotoURL: URL.createObjectURL(file),
            });
        };

        return (
            <div className="max-h-[25rem] min-h-[15rem] h-fit rounded-b-[2rem] border-b-[0.15rem] border-b-[#AAAAAA] overflow-clip flex items-center relative z-0">
                <img
                    src={
                        typeof pageLayoutData.coverPhoto === "object"
                            ? pageLayoutData.coverPhotoURL
                            : pageLayoutData.coverPhoto
                    }
                    alt="Organization Cover Photo"
                    className="w-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Page Cover Photo">
                        <label>Select an image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {previewUrl && (
                            <div>
                                <img
                                    src={previewUrl}
                                    alt="Image Preview"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </div>
        );
    }

    function OrganizationLogo() {
        const [file, setFile] = useState(null);

        const [previewUrl, setPreviewUrl] = useState(null);

        function handleImageChange(event) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            fileReader.readAsDataURL(selectedFile);
        }

        const handleSave = () => {
            setEditableLayoutData({
                ...pageLayoutData,
                logo: file,
                logoURL: URL.createObjectURL(file),
            });
        };

        return (
            <div className="size-36 md:size-44 rounded-[2rem] overflow-clip relative">
                <img
                    src={
                        typeof pageLayoutData.logo === "object"
                            ? pageLayoutData.logoURL
                            : pageLayoutData.logo
                    }
                    alt="Organization Logo"
                    className="size-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Organization Logo">
                        <label>Select an image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {previewUrl && (
                            <div>
                                <img
                                    src={previewUrl}
                                    alt="Image Preview"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </div>
        );
    }

    function OrganizationMetadata() {
        return (
            <div className="flex-1 relative">
                <div className="text-lg inter font-extrabold">
                    {pageLayoutData.metadata.organizationName}
                </div>
                <div className="text-sm">
                    {pageLayoutData.metadata.members}&nbsp;members
                </div>
            </div>
        );
    }
}

export default OrganizationLayout;
