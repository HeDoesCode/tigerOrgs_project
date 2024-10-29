import IconMailFilled from "@/Components/Icons/IconMailFilled";

import IconInstagram from "@/Components/Icons/Social/IconInstagram";
import IconFacebookRoundFilled from "@/Components/Icons/Social/IconFacebookRoundFilled";
import IconX from "@/Components/Icons/Social/IconX";
import IconLinkedIn from "@/Components/Icons/Social/IconLinkedIn";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import OrganizationLayout from "@/Components/Organizations/OrganizationLayout";
import { Head } from "@inertiajs/react";
import IconPoint from "@/Components/Icons/IconPoint";
import { useToast } from "@/hooks/use-toast";

function Home({
    editing = false,
    recruiting = true,
    pageData,
    pageLayoutData,
    withFollow,
}) {
    const { toast } = useToast();

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

    return (
        <OrganizationLayout
            pageLayoutData={pageLayoutData}
            // setEditableLayoutData={setEditableLayoutData}
            recruiting={recruiting}
            editing={editing}
            withFollow={withFollow}
        >
            {/* About Us */}
            <AboutUsContainer />
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
                <div className="flex justify-end px-5 md:px-12 mt-6 ">
                    {editing.saveButton}
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
                <div className="w-full block whitespace-pre-line">{children}</div>
            </div>
        );
    }

    function AboutUsContainer() {

        return (
            <Tile name="About Us">
                {pageData.aboutUs}
                {editing && editing.aboutUs}
            </Tile>
        );
    }

    function ContactsContainer() {

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
                    {pageData.contacts.map((contact, index) => (
                        <li
                            key={index}
                            className="flex items-center quicksand gap-x-2"
                        >
                            <div>{platformIcons[contact.platform]}</div>
                            <div className="font-semibold">{contact.name}:</div>
                            <button
                                className="truncate flex-1 text-left hover:outline hover:outline-1 rounded-md hover:outline-gray-500 hover:px-2 transition-all"
                                onClick={() => copyToClipboard(contact.address)}
                            >
                                {contact.address}
                            </button>
                        </li>
                    ))}
                </ul>
                {editing && editing.contacts}
            </Tile>
        );
    }

    // not editable
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
                {editing && editing.officers}
            </Tile>
        );
    }

    function SocialIFrame() {
        return (
            <Tile className="h-full" name="Social Activities">
                <span>Facebook Iframe: {pageData.fb_link}</span>
                {editing && editing.social}
            </Tile>
        );
    }

    function PhotoScrollArea() {

        return (
            <Tile
                name="Showcase Photos"
                id="photos"
                className="overflow-x-hidden"
            >
                <div className="h-52 md:h-80 w-full flex flex-row overflow-x-auto gap-x-6 pb-1 relative">
                    {pageData['photos'].map((photo, index) => (
                        <Dialog key={index}>
                            <DialogTrigger className="contents">
                                <div className="h-full flex-shrink-0 relative rounded-xl overflow-clip min-w-40">
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
                {editing && editing.photos}
            </Tile>
        );
    }

}

export default Home;
