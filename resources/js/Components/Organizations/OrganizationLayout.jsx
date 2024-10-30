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
import IconFileText from "../Icons/IconFileText";
import IconAlertCircleFilled from "../Icons/IconAlertCircleFilled";

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
        const forms = pageLayoutData.forms
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
                        {/* {!editing && ( */}
                        {route().current() === 'organizations.home' && (
                            <div className="pt-8 space-y-2 inter font-bold">
                                {!editing && pageLayoutData.recruiting && (
                                    (forms.length == 1 ? (
                                        <Link
                                            className="contents"
                                            href={route("organizations.apply", [pageLayoutData.orgID, forms[0]['formID']])}
                                        >
                                            <div className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full bg-[#FFCB11] border-[0.15rem] border-[#AAAAAA] relative h-12">
                                                Apply
                                                <div className="inline rotate-45">
                                                    <IconArrowUp size="20" />
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full bg-[#FFCB11] border-[0.15rem] border-[#AAAAAA] relative h-12 cursor-pointer">
                                                    Apply
                                                    <div className="inline rotate-45">
                                                        <IconArrowUp size="20" />
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Select Application Form</DialogTitle>
                                                    <DialogDescription className="contents">
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="size-full flex flex-col gap-y-2 mt-3">
                                                    {forms.map((form, index) => (
                                                        <Link
                                                            key={index}
                                                            href={route('organizations.apply', [pageLayoutData.orgID, form['formID']])}
                                                            className="px-4 h-12 rounded-lg bg-slate-200 flex items-center cursor-pointer hover:font-bold transition-all gap-x-2"
                                                        >
                                                            <IconFileText />
                                                            {form['formLayout']['name']}
                                                        </Link>
                                                    ))}
                                                    {forms.length === 0 && (
                                                        <span className="font-bold text-red-600">
                                                            <IconAlertCircleFilled /> Please contact your organization administrators.<br /> (Error: No deployed form.)
                                                        </span>
                                                    )}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ))
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
                </div >
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
                                    value={route("organizations.home", {
                                        orgID: pageLayoutData.orgID,
                                    })}
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

        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            const fileReader = new FileReader();
            fileReader.readAsDataURL(selectedFile);
            fileReader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
        }

        const handleSave = () => {
            if (confirm("Are you sure you want to save changes?")) {
                const formData = new FormData();

                formData.append('cover', file);
                router.post('save/cover', formData);
            }
        };

        return (
            <div className="max-h-[25rem] min-h-[15rem] h-fit rounded-b-[2rem] border-b-[0.15rem] border-b-[#AAAAAA] overflow-clip flex items-center relative z-0">
                <img
                    src={pageLayoutData.coverPhoto}
                    alt="Organization Cover Photo"
                    className="w-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Page Cover Photo">
                        <label>Select an image:</label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
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
            fileReader.readAsDataURL(selectedFile);
            fileReader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
        }

        const handleSave = () => {
            if (confirm("Are you sure you want to save changes?")) {
                const formData = new FormData();

                formData.append('logo', file);
                router.post('save/logo', formData);
            }
        };

        return (
            <div className="size-36 md:size-44 rounded-[2rem] overflow-clip relative">
                <img
                    src={pageLayoutData.logo}
                    alt="Organization Logo"
                    className="size-full object-cover"
                />
                {editing && (
                    <EditArea title="Set Organization Logo">
                        <label>Select an image:</label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
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
