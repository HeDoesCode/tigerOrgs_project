import IconMailFilled from "@/Components/Icons/IconMailFilled";

import IconInstagram from "@/Components/Icons/Social/IconInstagram";
import IconFacebookRoundFilled from "@/Components/Icons/Social/IconFacebookRoundFilled";
import IconX from "@/Components/Icons/Social/IconX";
import IconLinkedIn from "@/Components/Icons/Social/IconLinkedIn";
import EditArea from "@/Components/Organizations/EditArea";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import OrganizationLayout from "@/Components/Organizations/OrganizationLayout";
import { Head, router, usePage } from "@inertiajs/react";
import IconPoint from "@/Components/Icons/IconPoint";
import { Description } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useEffect } from "react";

function Home({
    editing = false,
    recruiting = true,
    pageData,
    pageLayoutData,
    withFollow,
}) {
    const { toast } = useToast();
    const { errors = {} } = usePage().props;
    const [editableData, setEditableData] = useState(pageData);
    const [editableLayoutData, setEditableLayoutData] =
        useState(pageLayoutData);

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast({
                    title: "Text copied to cliboard",
                    description: text,
                    duration: 2000,
                    variant: "success",
                });
            })
            .catch((err) => {
                toast({
                    title: "Text copy failed",
                    description: text,
                    duration: 2000,
                    variant: "desctructive",
                });
            });
    };

    const handleSave = () => {
        console.log(editableData, editableLayoutData);

        const formData = new FormData();

        formData.append("orgID", editableLayoutData.orgID);
        formData.append("aboutUs", editableData.aboutUs);
        formData.append("fb_link", editableData.fb_link);

        if (editableLayoutData.logo instanceof File) {
            formData.append("logo", editableLayoutData.logo);
        }

        if (editableLayoutData.coverPhoto instanceof File) {
            formData.append("coverPhoto", editableLayoutData.coverPhoto);
        }

        router.post("save", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            Object.entries(errors).forEach(([key, value]) => {
                toast({
                    title: "Error:",
                    description: value,
                    duration: 10000,
                    variant: "destructive",
                });
            });
        }
    }, [errors]);

    return (
        <OrganizationLayout
            pageLayoutData={editableLayoutData}
            setEditableLayoutData={setEditableLayoutData}
            recruiting={recruiting}
            editing={editing}
            withFollow={withFollow}
        >
            {/* About Us */}
            <AboutUs />
            <Head title={pageData.metadata.organizationName} />
            <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8">
                <div className="flex flex-col space-y-3 md:space-y-8 wfull md:w-1/2">
                    {/* Contacts and Information */}
                    <ContactsContainer />

                    {/* Officers */}
                    <OfficersContainer />
                </div>

                {/* Facebook Iframe */}
                <div className="w-full md:w-1/2">
                    <SocialIFrame />
                </div>
            </div>
            <PhotoScrollArea />
            {editing && (
                <div className="flex justify-end px-5 md:px-12 mt-6">
                    <button
                        className="px-3 py-2 bg-cyan-400 rounded-lg"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => console.log(editableData)}
                        className="px-3 py-2 bg-cyan-400 rounded-lg"
                    >
                        Check page data
                    </button>
                    <button
                        type="button"
                        onClick={() => console.log(editableLayoutData)}
                        className="px-3 py-2 bg-cyan-400 rounded-lg"
                    >
                        Check page layout data
                    </button>
                </div>
            )}
        </OrganizationLayout>
    );

    function Tile({ children, className, name, id }) {
        return (
            <div
                className={`w-full bg-white p-4 md:p-7 rounded-lg flex flex-col ${className} space-y-1 relative`}
                id={id}
            >
                <div className="poppins text-lg font-extrabold">{name}</div>
                <div className="w-full block">{children}</div>
            </div>
        );
    }

    //done
    function AboutUs() {
        const [localData, setLocalData] = useState(editableData.aboutUs);

        return (
            <Tile name="About Us">
                {editableData.aboutUs}
                {editing && (
                    <EditArea title="Set About Us description">
                        <textarea
                            name=""
                            id=""
                            placeholder="Your description here..."
                            value={localData}
                            onChange={(e) => setLocalData(e.target.value)}
                        ></textarea>
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={() =>
                                setEditableData({
                                    ...editableData,
                                    aboutUs: localData,
                                })
                            }
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function ContactsContainer() {
        const data = pageData.contacts;

        const platformIcons = {
            email: <IconMailFilled />,
            instagram: <IconInstagram />,
            facebook: <IconFacebookRoundFilled />,
            x: <IconX />,
            linkedin: <IconLinkedIn />,
            default: <IconPoint />,
        };

        return (
            <Tile name="Contacts and Information">
                <ul className="w-full space-y-2 pl-2 relative">
                    {data.map((contact, index) => (
                        <li
                            key={index}
                            className="flex items-center quicksand gap-x-2"
                        >
                            <div>{platformIcons[contact.platform]}</div>
                            <div>{contact.name}:</div>
                            {/* <div className="truncate flex-1">{contact.address}</div> */}
                            <button
                                className="truncate flex-1 text-left hover:outline hover:outline-1 rounded-md hover:outline-gray-500 hover:px-2 transition-all"
                                onClick={() => copyToClipboard(contact.address)}
                            >
                                {contact.address}
                            </button>
                        </li>
                    ))}
                </ul>
                {editing && (
                    <EditArea title="Set contacts list">
                        <div>complex bullet text editor</div>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function OfficersContainer() {
        const officers = pageData.officers;

        return (
            <Tile name="Officers">
                <ul className="w-full space-y-2 pl-2">
                    {officers.map((officer, index) => (
                        <li key={index} className="flex items-center">
                            <span className="mr-3">•</span>
                            <div>
                                <div className="nunito font-extrabold text-lg">
                                    {officer.user.firstname}&nbsp;
                                    {officer.user.lastname}
                                </div>
                                <div className="-mt-1 quicksand text-sm">
                                    {officer.position}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Tile>
        );
    }

    function SocialIFrame() {
        const [localData, setLocalData] = useState(editableData.fb_link);

        return (
            <Tile className="h-full" name="Social Activities">
                <span>Facebook Iframe: {editableData.fb_link}</span>
                {editing && (
                    <EditArea title="Set IFrame link">
                        <textarea
                            name=""
                            id=""
                            placeholder="Your description here..."
                            value={localData}
                            onChange={(e) => setLocalData(e.target.value)}
                        ></textarea>
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={() =>
                                setEditableData({
                                    ...editableData,
                                    fb_link: localData,
                                })
                            }
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function PhotoScrollArea() {
        const photos = pageData.photos;

        return (
            <Tile
                name="Showcase Photos"
                id="photos"
                className="overflow-x-hidden"
            >
                <div className="h-52 md:h-80 w-full flex flex-row overflow-x-auto gap-x-6 pb-1 relative">
                    {photos.map((photo) => (
                        <Dialog key={photo.photoID}>
                            <DialogTrigger className="contents">
                                <div className="h-full flex-shrink-0 relative rounded-xl overflow-clip">
                                    <img
                                        src={photo.filename}
                                        className="h-full object-cover"
                                        alt={photo.caption}
                                    />
                                    <div className="absolute bottom-0 top-52 left-0 right-0 bg-gradient-to-b from-transparent to-black text-white px-9 flex items-center quicksand font-bold tracking-wide">
                                        <span className="line-clamp-3">
                                            {photo.caption}
                                        </span>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl w-fit max-h-[90%]">
                                <DialogHeader>
                                    <DialogTitle>{photo.caption}</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div className="overflow-y-auto flex justify-center">
                                    <img
                                        src={photo.filename}
                                        className="object-contain max-w-full h-full max-h-full"
                                        alt={photo.caption}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
                {editing && (
                    <EditArea title="Set showcase photos">
                        <div>
                            complex multi-file upload with text edit (pic and
                            caption)
                        </div>
                    </EditArea>
                )}
            </Tile>
        );
    }
}

export default Home;
