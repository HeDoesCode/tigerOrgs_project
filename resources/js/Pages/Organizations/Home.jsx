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
import { Head } from "@inertiajs/react";
import IconPoint from "@/Components/Icons/IconPoint";
import { Description } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";

function Home({
    editing = false,
    recruiting = true,
    pageData,
    pageLayoutData,
    withFollow
}) {
    // pageData = {
    //     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s",
    //     coverPhoto:
    //         "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/440157037_826883462808874_1884542927338964791_n.png?stp=dst-png_s960x960&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF-iHA5tGGTjllKkngWhNwzZBy86ZNOkCFkHLzpk06QIWlW9y_IZDIa9gnqO4TmlORRLq8_A0Bay2SPO8SKF0Om&_nc_ohc=wnM1T6HPwUQQ7kNvgHPD7_-&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYDCQrliXzWlGMjKz1N0123SJwpAXflH8hyNnkmRfjdB0Q&oe=66C65C2D",
    //     metadata: {
    //         organizationName:
    //             "Society of Information Technology Enthusiasts (SITE)",
    //         members: "210",
    //     },
    //     aboutUs:
    //         "Official TigerOrgs™ page of the Society of Information Technology Enthusiasts, the mother organization of the IT students of the University of Santo Tomas.",
    //     contacts: [
    //         {
    //             platform: "email",
    //             address: "site.cics@ust.edu.ph",
    //         },
    //         {
    //             platform: "facebook",
    //             address: "https://www.facebook.com/site.ust",
    //         },
    //         {
    //             platform: "instagram",
    //             address: "https://www.instagram.com/site.ust",
    //         },
    //         {
    //             platform: "x",
    //             address: "https://www.x.com/site.ust",
    //         },
    //     ],
    //     officers: [
    //         {
    //             position: "President",
    //             name: "John Doe",
    //         },
    //         {
    //             position: "Vice President",
    //             name: "Jane Smith",
    //         },
    //         {
    //             position: "Secretary",
    //             name: "Alex Johnson",
    //         },
    //         {
    //             position: "Treasurer",
    //             name: "Emily Davis",
    //         },
    //         {
    //             position: "Auditor",
    //             name: "Michael Brown",
    //         },
    //         {
    //             position: "PRO",
    //             name: "Sarah Lee",
    //         },
    //     ],
    //     photos: [
    //         {
    //             caption: "CICS Wellness Series",
    //             src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1JyKAmPjMMDpas4R8piV_Q6DHSjTBXgd3Q&s",
    //         },
    //         {
    //             caption: "CICS Wellness Series",
    //             src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1JyKAmPjMMDpas4R8piV_Q6DHSjTBXgd3Q&s",
    //         },
    //     ],
    // };

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

    // pageLayoutData = {
    //     logo: pageData.logo,
    //     coverPhoto: pageData.coverPhoto,
    //     metadata: pageData.metadata,
    // };

    return (
        <OrganizationLayout
            pageLayoutData={pageLayoutData}
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
                    <button className="px-3 py-2 bg-cyan-400 rounded-lg">
                        Save Changes
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

    function AboutUs() {
        return (
            <Tile name="About Us">
                {pageData.aboutUs}
                {editing && (
                    <EditArea title="Set About Us description">
                        <div>text editor</div>
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
        return (
            <Tile className="h-full" name="Social Activities">
                facebook iframe
                {editing && (
                    <EditArea title="Set IFrame link">
                        <div>text editor</div>
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
