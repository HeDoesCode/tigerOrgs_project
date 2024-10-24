import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";
import EditArea from "@/Components/Organizations/EditArea";
import { useState } from "react";
import { useEffect } from "react";
import IconMailFilled from "@/Components/Icons/IconMailFilled";
import IconInstagram from "@/Components/Icons/Social/IconInstagram";
import IconFacebookRoundFilled from "@/Components/Icons/Social/IconFacebookRoundFilled";
import IconX from "@/Components/Icons/Social/IconX";
import IconLinkedIn from "@/Components/Icons/Social/IconLinkedIn";
import IconPoint from "@/Components/Icons/IconPoint";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import TextEditorDialog from "@/Components/Admin/EditPage/TextEditorDialog";
import IconDelete from "@/Components/Icons/IconDelete";
import IconSquareArrowUpFilled from "@/Components/Icons/IconSquareArrowUpFilled";
import IconSquareArrowDownFilled from "@/Components/Icons/IconSquareArrowDownFilled";


function AdminEditPage({ pageData, pageLayoutData, orgID }) {

    // const prevPageData = pageData;
    // const pageLayoutData = pageLayoutData;

    const prevPageState = {
        pageData: pageData,
        pageLayoutData: pageLayoutData
    };

    const [currentPageState, setCurrentPageState] = useState({
        pageData: pageData,
        pageLayoutData: pageLayoutData
    });

    const changesMade = !(
        JSON.stringify(currentPageState.pageData) === JSON.stringify(pageData)
        &&
        JSON.stringify(currentPageState.pageLayoutData) === JSON.stringify(pageLayoutData)
    )

    // editing state

    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconEdit />,
                            label: "Edit Page",
                            link: "admin.editpage",
                            params: { orgID },
                        },
                        {
                            icon: <IconInvite />,
                            label: "Members",
                            link: "admin.invite",
                            params: { orgID },
                        },
                    ]}
                    title="Edit Organization's Page"
                >
                    <div className={`p-5 m-1 ${changesMade && '!border-2 !border-red-500'}`}>
                        {changesMade && (
                            <div className="flex justify-end mb-2">
                                <div className="px-3 py-1 text-sm text-white rounded-full bg-red-500">
                                    Unsaved Changes
                                </div>
                            </div>
                        ) || (
                                <>
                                    no changes made
                                </>
                            )
                        }
                        <Home
                            editing={
                                {
                                    coverPhoto: <EditorCoverPhoto />,
                                    orgLogo: <EditorOrganizationLogo />,
                                    aboutUs: <EditorAboutUs />,
                                    contacts: <EditorContacts />,
                                    social: <EditorSocial />,
                                    photos: <EditorPhotos />,
                                    saveButton: <EditorSaveButton />
                                }
                            }
                            recruiting={false} //example lang
                            pageData={currentPageState.pageData}
                            pageLayoutData={currentPageState.pageLayoutData}
                        />
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );

    function EditorCoverPhoto() {
        const changedCoverPhoto = currentPageState.pageLayoutData.coverPhoto !== pageLayoutData.coverPhoto
        const [file, setFile] = useState(null);
        const [previewUrl, setPreviewUrl] = useState('');

        // if (changedCoverPhoto) {
        //     setChangedSections(prevState => ({
        //         ...prevState,
        //         coverPhoto: true,
        //     }));
        // } else {
        //     setChangedSections(prevState => {
        //         const { coverPhoto, ...rest } = prevState;
        //         return rest;
        //     });
        // }


        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                setFile(selectedFile);
                setPreviewUrl(URL.createObjectURL(selectedFile));
            }
        }

        const handleSavePreview = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    coverPhoto: previewUrl
                }
            }))
        };

        const handleReset = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    coverPhoto: pageLayoutData.coverPhoto
                }
            }))
        }

        return (
            <EditArea
                title="Set Page Cover Photo"
                componentProps={{
                    // dialog: { open: true }
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={(file) ? {
                        onClick: handleSavePreview
                    } : null}
                />}
            >
                <label>
                    Select an image: <span className="text-gray-400">(Accepts .png, .jpg, and .jpeg)</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                />
                {(previewUrl && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="Image Preview"
                            style={{ width: "100%" }}
                        />
                    </div>
                )) || (changedCoverPhoto && (
                    <img
                        src={currentPageState.pageLayoutData.coverPhoto}
                        alt="Image Preview"
                        style={{ width: "100%" }}
                    />
                ))}
                {/* {file && <EditorPreviewButton onClick={handleSave} />} */}
            </EditArea>
        )
    }

    function EditorOrganizationLogo() {
        const changedLogo = currentPageState.pageLayoutData.logo !== pageLayoutData.logo
        const [file, setFile] = useState(null);
        const [previewUrl, setPreviewUrl] = useState('');

        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                setFile(selectedFile);
                setPreviewUrl(URL.createObjectURL(selectedFile));
            }
        }

        const handleSavePreview = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    logo: previewUrl
                }
            }))
        };

        const handleReset = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    logo: pageLayoutData.logo
                }
            }))
        }

        return (
            <EditArea
                title="Set Organization Logo"
                componentProps={{
                    // dialog: { open: true }
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={(file) ? {
                        onClick: handleSavePreview
                    } : null}
                />}
            >
                <label>
                    Select an image: <span className="text-gray-400">(Accepts .png, .jpg, and .jpeg)</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                />
                {(previewUrl && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="Image Preview"
                            style={{ width: "100%" }}
                        />
                    </div>
                )) || (changedLogo && (
                    <img
                        src={currentPageState.pageLayoutData.logo}
                        alt="Image Preview"
                        style={{ width: "100%" }}
                    />
                ))}
                {/* {file && <EditorPreviewButton onClick={handleSave} />} */}
            </EditArea>
        )
    }

    function EditorAboutUs() {
        const [editAboutUs, setEditAboutUs] = useState(currentPageState.pageData.aboutUs);

        const handleSavePreview = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    aboutUs: editAboutUs
                }
            }))
        }
        const handleReset = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    aboutUs: pageData.aboutUs
                }
            }))
        }

        return (
            <EditArea
                title="Set About Us description"
                componentProps={{
                    // dialog: { open: true }
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <textarea
                    placeholder="Your description here..."
                    className="h-52"
                    value={editAboutUs}
                    onChange={(e) => setEditAboutUs(e.target.value)}
                ></textarea>
            </EditArea>
        )
    }

    function EditorContacts() {
        const [editContacts, setEditContacts] = useState(currentPageState?.pageData?.contacts || [])

        const handleSavePreview = () => {
            const nonEmptyContacts = editContacts.filter(contact => contact.name !== '' && contact.address !== '');

            setEditContacts(nonEmptyContacts);

            setCurrentPageState((prevState) => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    contacts: nonEmptyContacts,
                }
            }));
        };

        const handleReset = () => {
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    contacts: pageData.contacts
                }
            }))
        }

        function handleDelete(i) {
            const updatedContacts = editContacts.filter((_, index) => index !== i);
            setEditContacts(updatedContacts);
        }

        const platformIcons = {
            email: <IconMailFilled />,
            instagram: <IconInstagram />,
            facebook: <IconFacebookRoundFilled />,
            x: <IconX />,
            linkedin: <IconLinkedIn />,
            default: <IconPoint />,
        };

        const handleAddContactField = () => {
            setEditContacts((prevState) => {
                let emptyContact = {
                    contactID: null,
                    orgID: pageLayoutData.orgID,
                    platform: 'default',
                    name: '',
                    address: '',
                }

                return [
                    ...prevState,
                    emptyContact
                ]
            })
        }

        return (
            <EditArea
                title="Set contacts list"
                componentProps={{
                    // dialog: { open: true },
                    dialogContentCN: 'max-w-[40rem]'
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <div className="border border-slate-400 w-full p-2 overflow-x-auto">
                    <table className="w-full min-w-96">
                        <thead className="font-bold">
                            <tr>
                                <td className="text-center">Type</td>
                                <td className="px-3">Name</td>
                                <td>Address</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {editContacts.map((contact, index) => (
                                <tr key={contact.contactID}>
                                    <td className="h-12">
                                        <PlatformsDropdownMenu
                                            trigger={
                                                <div className="size-full flex items-center justify-center cursor-pointer hover:bg-slate-300 rounded-lg">
                                                    {platformIcons[contact.platform]}
                                                </div>
                                            }
                                            index={index}
                                        />
                                    </td>
                                    <td className="px-3">

                                        <TextEditorDialog
                                            trigger={contact.name || <span className="text-red-500/80">*required</span>}
                                            type='Name'
                                            required="true"
                                            target={(text) => {
                                                setEditContacts((prevState) => {
                                                    const updatedContact = [...prevState];
                                                    updatedContact[index] = {
                                                        ...updatedContact[index],
                                                        name: text
                                                    }

                                                    return updatedContact;
                                                })
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextEditorDialog
                                            trigger={contact.address || <span className="text-red-500/80">*required</span>}
                                            type='Address'
                                            required="true"
                                            target={(text) => {
                                                setEditContacts((prevState) => {
                                                    const updatedContact = [...prevState];
                                                    updatedContact[index] = {
                                                        ...updatedContact[index],
                                                        address: text
                                                    }

                                                    return updatedContact;
                                                })
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-300"
                                            >
                                                <IconDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                    <div className="border-b-[1px] mt-2 mb-3 border-slate-400 w-full" />
                    <button className="py-2 rounded-md text-center w-full bg-slate-300 hover:bg-slate-300/80"
                        onClick={handleAddContactField}
                    >
                        <span className="text-xl">+</span>&nbsp;Add Contact
                    </button>
                </div >
            </EditArea >
        )

        function PlatformsDropdownMenu({ trigger, index }) {
            const [currentPlatform, setPlatform] = useState(editContacts[index]?.platform);

            const handleOnValueChange = (value) => {
                setPlatform(value);
                setEditContacts((prevState) => {
                    const updatedContact = [...prevState]
                    updatedContact[index] = {
                        ...updatedContact[index],
                        platform: value,
                    };

                    return updatedContact;
                });
            };


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {trigger}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Select Platform</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={currentPlatform} onValueChange={handleOnValueChange}>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="email">{platformIcons['email']}&nbsp;Email</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="instagram">{platformIcons['instagram']}&nbsp;Instagram</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="facebook">{platformIcons['facebook']}&nbsp;Facebook</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="x">{platformIcons['x']}&nbsp;X (formerly Twitter)</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="linkedin">{platformIcons['linkedin']}&nbsp;LinkedIn</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className="cursor-pointer hover:font-bold" value="default">{platformIcons['default']}&nbsp;Other</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

    }

    function EditorSocial() {
        const [editSocial, setSocial] = useState(currentPageState.pageData.fb_link);

        const handleSavePreview = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    fb_link: editSocial
                }
            }))
        }
        const handleReset = () => {
            setCurrentPageState(prevState => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    fb_link: pageData.fb_link
                }
            }))
        }

        return (
            <EditArea
                title="Set Facebook IFrame link"
                componentProps={{
                    // dialog: { open: true }
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <input
                    type="text"
                    value={editSocial}
                    onChange={(e) => setSocial(e.target.value)}
                />
            </EditArea>
        )
    }

    function EditorPhotos() {
        const changedLogo = currentPageState.pageLayoutData.logo !== pageLayoutData.logo
        const [editPhotos, setEditPhotos] = useState(currentPageState.pageData.photos);
        console.log(editPhotos)
        const [file, setFile] = useState(null);
        const [previewUrl, setPreviewUrl] = useState('');

        const handleSavePreview = () => {
            //
        }

        const handleReset = () => {
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    photos: pageData.photos
                }
            }))
        }

        const handleDelete = (param) => {
            //
        }

        function handleMoveItemUp(index) {
            if (index === 0) return;

            setEditPhotos((prevState) => {
                const updatedPhotos = [...prevState];

                const heldItem = updatedPhotos[index - 1];
                updatedPhotos[index - 1] = updatedPhotos[index];
                updatedPhotos[index] = heldItem;

                return updatedPhotos;
            });
        }

        function handleMoveItemDown(index) {
            if (index === editPhotos.length - 1) return;

            setEditPhotos((prevState) => {
                const updatedPhotos = [...prevState];

                const heldItem = updatedPhotos[index + 1];
                updatedPhotos[index + 1] = updatedPhotos[index];
                updatedPhotos[index] = heldItem;

                return updatedPhotos;
            });
        }

        console.log(editPhotos)

        return (
            <EditArea
                title="Set Showcase Photos"
                componentProps={{
                    // dialog: { open: true },
                    dialogContentCN: 'max-w-[40rem]'
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={(/*file*/true) ? {
                        onClick: handleSavePreview
                    } : null}
                />}

            >
                <table className="">
                    <thead>
                        <tr>
                            <th className="w-56 max-w-56">Preview</th>
                            <th className="w-72">Caption</th>
                            <th className="w-32">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editPhotos.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="o">
                                        <img src={item.filename} alt={`Photo loading error`} />
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2 px-1">
                                        <TextEditorDialog
                                            trigger={item.caption}
                                            type='Caption'
                                            required='true'
                                            target={(text) => {
                                                setEditPhotos((prevState) => {
                                                    const updatedPhotos = [...prevState];
                                                    updatedPhotos[index] = {
                                                        ...updatedPhotos[index],
                                                        caption: text
                                                    };

                                                    return updatedPhotos;
                                                })
                                            }}
                                        />
                                    </div>
                                </td>
                                {/* <td>reposition (up down), delete</td> */}
                                <td>
                                    <div className="flex gap-x-3 justify-center">
                                        <div className="flex gap-x-1 items-center">
                                            <button className="text-slate-600 enabled:hover:text-slate-600/80 disabled:cursor-not-allowed relative group"
                                                onClick={() => handleMoveItemUp(index)}
                                                disabled={index === 0}
                                            >
                                                <IconSquareArrowUpFilled size={30} />
                                                <div className="group-disabled:block hidden h-0 border-b-2 border-red-500 absolute w-full inset-0 m-auto -rotate-45" />
                                            </button>
                                            <button className="text-slate-600 enabled:hover:text-slate-600/80 disabled:cursor-not-allowed relative group"
                                                onClick={() => handleMoveItemDown(index)}
                                                disabled={index === editPhotos.length - 1}
                                            >
                                                <IconSquareArrowDownFilled size={30} />
                                                <div className="group-disabled:block hidden h-0 border-b-2 border-red-500 absolute w-full inset-0 m-auto -rotate-45" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-300"
                                        >
                                            <IconDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="border-b-[1px] mt-2 mb-3 border-slate-400 w-full" />
                <button className="py-2 rounded-md text-center w-full bg-slate-300 hover:bg-slate-300/80"
                    onClick={() => null/*handleAddContactField */}
                >
                    <span className="text-xl">+</span>&nbsp;Add Photo
                </button>
            </EditArea>
        )
    }

    function EditorSaveButton() {
        // const show = !(
        //     JSON.stringify(currentPageState.pageData) === JSON.stringify(pageData)
        //     &&
        //     JSON.stringify(currentPageState.pageLayoutData) === JSON.stringify(pageLayoutData)
        // )

        return (
            <>
                {changesMade && (
                    <>
                        <button
                            className="px-3 py-2 bg-red-500 rounded-lg"
                            onClick={() => {
                                setCurrentPageState({ pageLayoutData, pageData });
                            }}
                        >
                            Reset All
                        </button>
                        <button
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                        // onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </>
                )}
            </>
        )
    }

    // function EditorPreviewButton({ children = false, ...props }) {
    //     return (
    //         <button type="button" className="px-3 py-2 bg-cyan-400 rounded-lg" {...props}>
    //             {children || "Preview Change"}
    //         </button>
    //     )
    // }

    // function EditorPhotos() {
    //     const [localData, setLocalData] = useState(editableData.photos);
    //     const [edittingPhotos, setEdittingPhotos] = useState(
    //         editableData.photos
    //     );

    //     const handleAddPhoto = () => {
    //         if (edittingPhotos.length == 5) {
    //             return;
    //         }

    //         setEdittingPhotos([
    //             ...edittingPhotos,
    //             { filename: null, caption: "" },
    //         ]);
    //     };

    //     const handleEditPhoto = (index, event) => {
    //         let updatedPhotos = [...edittingPhotos];
    //         const selectedFile = event.target.files[0];
    //         const fileReader = new FileReader();

    //         fileReader.readAsDataURL(selectedFile); // read the file

    //         fileReader.onload = (e) => {
    //             // when file is done reading
    //             // setPreviewBlob(e.target.result);
    //             updatedPhotos[index] = {
    //                 ...updatedPhotos[index],
    //                 filename: selectedFile,
    //                 fileBlob: e.target.result,
    //             };
    //             setEdittingPhotos(updatedPhotos);
    //         };
    //     };

    //     const handleEditCaption = (index, caption) => {
    //         let updatedPhotos = [...edittingPhotos];
    //         updatedPhotos[index] = {
    //             ...updatedPhotos[index],
    //             caption: caption,
    //         };
    //         setEdittingPhotos(updatedPhotos);
    //     };

    //     const handleDeletePhoto = (index) => {
    //         console.log(index);
    //         if (confirm("Are you sure you want to delete this photo?")) {
    //             setEdittingPhotos(edittingPhotos.filter((_, i) => i !== index));
    //         }
    //     };

    //     const handleReset = () => {
    //         if (
    //             confirm(
    //                 "Are you sure you want to delete changes you have made?"
    //             )
    //         ) {
    //             setEdittingPhotos(localData);
    //         }
    //     };

    //     const handleSave = () => {
    //         if (confirm("Are you sure you want to save changes?")) {
    //             setEditableData({ ...editableData, photos: edittingPhotos });
    //         }
    //     };


    //     return (
    //         <EditArea title="Set showcase photos">
    //             <ul className="h-96 w-full overflow-scroll">
    //                 {edittingPhotos.map((image, index) => (
    //                     <EditPhotoScrollItem
    //                         key={index}
    //                         image={image}
    //                         index={index}
    //                         handleEditPhoto={handleEditPhoto}
    //                         handleEditCaption={handleEditCaption}
    //                         handleDeletePhoto={handleDeletePhoto}
    //                     />
    //                 ))}
    //             </ul>
    //             {edittingPhotos.length == 5 ? (
    //                 <button
    //                     disabled="disable"
    //                     className="px-3 py-2 bg-gray-400 rounded-lg"
    //                 >
    //                     Up to 5 photos only!
    //                 </button>
    //             ) : (
    //                 <button
    //                     type="button"
    //                     className="px-3 py-2 bg-cyan-400 rounded-lg font-bold"
    //                     onClick={handleAddPhoto}
    //                 >
    //                     + Add Photo
    //                 </button>
    //             )}
    //             <ul className="grid grid-cols-2 gap-3">
    //                 <li>
    //                     <button
    //                         type="button"
    //                         className="w-full px-3 py-2 bg-green-400 rounded-lg"
    //                         onClick={handleSave}
    //                     >
    //                         Save
    //                     </button>
    //                 </li>
    //                 <li>
    //                     <button
    //                         type="button"
    //                         className="w-full px-3 py-2 bg-gray-400 rounded-lg"
    //                         onClick={handleReset}
    //                     >
    //                         Reset
    //                     </button>
    //                 </li>
    //             </ul>
    //         </EditArea>
    //     )
    // }

}

export default AdminEditPage;
