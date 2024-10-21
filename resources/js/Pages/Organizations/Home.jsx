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
import CustomFileInput from "@/Components/CustomFileInput";
import IconFile from "@/Components/Icons/IconFile";

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

        if (editableLayoutData.logo instanceof File) {
            formData.append("logo", editableLayoutData.logo);
        }

        if (editableLayoutData.coverPhoto instanceof File) {
            formData.append("coverPhoto", editableLayoutData.coverPhoto);
        }

        let photos = [];
        editableData.photos.map((photo) => {
            if (photo.fileBlob) {
                // Append the actual file object
                formData.append("photos[]", photo.filename); // Assuming photo.filename is a File object
                photos.push({
                    photoID: photo.photoID ? photo.photoID : null,
                    filename: photo.filename.name, // Use .name to get the file name
                    caption: photo.caption,
                });
            }
        });

        // Append the JSON array of captions, if needed
        if (photos.length > 0) {
            formData.append("photoData", JSON.stringify(photos)); // For captions
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
        const [localData, setLocalData] = useState(pageData.aboutUs);

        const handleSave = () => {
            const formData = new FormData();
            formData.append("aboutUs", localData);

            router.post("save/about-us", formData);
        };

        return (
            <Tile name="About Us">
                {pageData.aboutUs}
                {editing && (
                    <EditArea title="Set About Us description">
                        <textarea
                            placeholder="Your description here..."
                            value={localData}
                            onChange={(e) => setLocalData(e.target.value)}
                        ></textarea>
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function ContactsContainer() {
        const [localData, setLocalData] = useState(pageData.contacts);

        const platformIcons = {
            email: <IconMailFilled />,
            instagram: <IconInstagram />,
            facebook: <IconFacebookRoundFilled />,
            x: <IconX />,
            linkedin: <IconLinkedIn />,
            default: <IconPoint />,
        };

        const handleAddNewContact = () => {
            setLocalData([
                ...localData,
                { platform: "email", name: "", address: "" },
            ]);
        };

        const handleEditContact = (index, data) => {
            let updatedData = [...localData];
            updatedData[index] = {
                ...updatedData[index],
                address: data.address,
                platform: data.platform,
            };
            return updatedData;
        };

        const handleSave = () => {
            setEditableData({ ...editableData, contacts: localData });
        };

        return (
            <Tile name="Contacts and Information">
                <ul className="w-full space-y-2 pl-2 relative">
                    {editableData.contacts.map((contact, index) => (
                        <li
                            key={index}
                            className="flex items-center quicksand gap-x-2"
                        >
                            <div>{platformIcons[contact.platform]}</div>
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
                        <div>
                            <ul>
                                {localData.map((contact, index) => {
                                    return (
                                        <li key={index}>
                                            <select
                                                onChange={(e) =>
                                                    setLocalData(
                                                        handleEditContact(
                                                            index,
                                                            {
                                                                ...contact,
                                                                platform:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        )
                                                    )
                                                }
                                            >
                                                <option value="email">
                                                    Email
                                                </option>
                                                <option value="facebook">
                                                    Facebook
                                                </option>
                                                <option value="x">X</option>
                                                <option value="linkedin">
                                                    Linked In
                                                </option>
                                                <option value="instagram">
                                                    Instagram
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                            <input
                                                type="text"
                                                value={contact.address}
                                                onChange={(e) =>
                                                    setLocalData(
                                                        handleEditContact(
                                                            index,
                                                            {
                                                                ...contact,
                                                                address:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        )
                                                    )
                                                }
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            <button
                                type="button"
                                className="px-3 py-2 bg-cyan-400 rounded-lg"
                                onClick={handleAddNewContact}
                            >
                                Add New Contact
                            </button>

                            <button
                                type="button"
                                className="px-3 py-2 bg-cyan-400 rounded-lg"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
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

    // done
    function SocialIFrame() {
        const [localData, setLocalData] = useState(pageData.fb_link);

        const handleSave = () => {
            const formData = new FormData();
            formData.append("fb_link", localData);

            router.post("save/fb-link", formData);
        };

        return (
            <Tile className="h-full" name="Social Activities">
                <span>Facebook Iframe: {pageData.fb_link}</span>
                {editing && (
                    <EditArea title="Set IFrame link">
                        <textarea
                            placeholder="Your description here..."
                            value={localData}
                            onChange={(e) => setLocalData(e.target.value)}
                        ></textarea>
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function PhotoScrollArea() {
        const [localData, setLocalData] = useState(editableData.photos);
        const [edittingPhotos, setEdittingPhotos] = useState(
            editableData.photos
        );

        const handleAddPhoto = () => {
            if (edittingPhotos.length == 5) {
                return;
            }

            setEdittingPhotos([
                ...edittingPhotos,
                { filename: null, caption: "" },
            ]);
        };

        const handleEditPhoto = (index, event) => {
            let updatedPhotos = [...edittingPhotos];
            const selectedFile = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.readAsDataURL(selectedFile); // read the file

            fileReader.onload = (e) => {
                // when file is done reading
                // setPreviewBlob(e.target.result);
                updatedPhotos[index] = {
                    ...updatedPhotos[index],
                    filename: selectedFile,
                    fileBlob: e.target.result,
                };
                setEdittingPhotos(updatedPhotos);
            };
        };

        const handleEditCaption = (index, caption) => {
            let updatedPhotos = [...edittingPhotos];
            updatedPhotos[index] = {
                ...updatedPhotos[index],
                caption: caption,
            };
            setEdittingPhotos(updatedPhotos);
        };

        const handleDeletePhoto = (index) => {
            console.log(index);
            if (confirm("Are you sure you want to delete this photo?")) {
                setEdittingPhotos(edittingPhotos.filter((_, i) => i !== index));
            }
        };

        const handleReset = () => {
            if (
                confirm(
                    "Are you sure you want to delete changes you have made?"
                )
            ) {
                setEdittingPhotos(localData);
            }
        };

        const handleSave = () => {
            if (confirm("Are you sure you want to save changes?")) {
                setEditableData({ ...editableData, photos: edittingPhotos });
            }
        };

        return (
            <Tile
                name="Showcase Photos"
                id="photos"
                className="overflow-x-hidden"
            >
                <div className="h-52 md:h-80 w-full flex flex-row overflow-x-auto gap-x-6 pb-1 relative">
                    {localData.map((photo, index) => (
                        <Dialog key={index}>
                            <DialogTrigger className="contents">
                                <div className="h-full flex-shrink-0 relative rounded-xl overflow-clip">
                                    <img
                                        src={
                                            photo.fileBlob
                                                ? photo.fileBlob
                                                : photo.filename
                                        }
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
                        <ul className="h-96 w-full overflow-scroll">
                            {edittingPhotos.map((image, index) => (
                                <EditPhotoScrollItem
                                    key={index}
                                    image={image}
                                    index={index}
                                    handleEditPhoto={handleEditPhoto}
                                    handleEditCaption={handleEditCaption}
                                    handleDeletePhoto={handleDeletePhoto}
                                />
                            ))}
                        </ul>
                        {edittingPhotos.length == 5 ? (
                            <button
                                disabled="disable"
                                className="px-3 py-2 bg-gray-400 rounded-lg"
                            >
                                Up to 5 photos only!
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="px-3 py-2 bg-cyan-400 rounded-lg font-bold"
                                onClick={handleAddPhoto}
                            >
                                + Add Photo
                            </button>
                        )}
                        <ul className="grid grid-cols-2 gap-3">
                            <li>
                                <button
                                    type="button"
                                    className="w-full px-3 py-2 bg-green-400 rounded-lg"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="w-full px-3 py-2 bg-gray-400 rounded-lg"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            </li>
                        </ul>
                    </EditArea>
                )}
            </Tile>
        );
    }

    function EditPhotoScrollItem({
        image,
        index,
        handleEditPhoto,
        handleEditCaption,
        handleDeletePhoto,
    }) {
        const counter = index + 1; // for image counter only

        return (
            <li>
                <fieldset className="border-2 mb-3 p-5">
                    <div className="mb-3">
                        <img
                            src={
                                image.fileBlob ? image.fileBlob : image.filename
                            }
                            alt=""
                        />
                    </div>
                    <legend className="font-bold">Image {counter}</legend>
                    <div className="flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out">
                        <label className="cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md mb-3">
                            <span>Upload Photo</span>
                            <IconFile />
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={(e) => handleEditPhoto(index, e)}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <label htmlFor="caption" className="block">
                        Caption:{" "}
                    </label>
                    <input
                        type="text"
                        name="caption"
                        id="caption"
                        className="block w-full rounded mb-3"
                        onChange={(e) =>
                            handleEditCaption(index, e.target.value)
                        }
                        value={image.caption}
                    />
                    <button
                        className="px-3 py-2 block w-full bg-red-400 rounded"
                        onClick={() => handleDeletePhoto(index)}
                    >
                        Delete
                    </button>
                </fieldset>
            </li>
        );
    }
}

export default Home;
