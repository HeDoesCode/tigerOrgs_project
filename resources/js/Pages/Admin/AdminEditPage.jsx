import { Head, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconInvite from "@/Components/Icons/IconInvite";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";
import EditArea from "@/Components/Organizations/EditArea";
import { useState, useEffect } from "react";
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
} from "@/Components/ui/dropdown-menu";
import TextEditorDialog from "@/Components/Admin/EditPage/TextEditorDialog";
import IconDelete from "@/Components/Icons/IconDelete";
import IconSquareArrowUpFilled from "@/Components/Icons/IconSquareArrowUpFilled";
import IconSquareArrowDownFilled from "@/Components/Icons/IconSquareArrowDownFilled";
import EditorKeywordSelect from "@/Components/Admin/EditPage/EditorKeywordSelect";

function AdminEditPage({ pageData, pageLayoutData, keywords, orgID, members }) {
    const { errors } = usePage().props;
    console.log(errors)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

    const [currentPageState, setCurrentPageState] = useState({
        pageData: pageData,
        pageLayoutData: pageLayoutData
    });

    const [changesMade, setChangesMade] = useState({
        all: false,
        storage: {}
    });

    useEffect(() => {
        const statesChanged = !(
            JSON.stringify(currentPageState.pageData) === JSON.stringify(pageData)
            &&
            JSON.stringify(currentPageState.pageLayoutData) === JSON.stringify(pageLayoutData)
        )

        setChangesMade((prevState) => (
            {
                ...prevState,
                all: statesChanged
            }
        ));

        function jsonStringIsEqual(text1, text2) {
            return JSON.stringify(text1) === JSON.stringify(text2)
        }

        if (statesChanged) {
            let changes = {};
            // coverPhoto
            if (!jsonStringIsEqual(currentPageState.pageLayoutData.coverPhoto, pageLayoutData.coverPhoto)) {
                changes['coverPhoto'] = true;
                // changes['coverPhoto'] = changesMade.storage.coverPhoto.name;
            } else {
                delete changes['coverPhoto'];
            }

            // logo
            if (!jsonStringIsEqual(currentPageState.pageLayoutData.logo, pageLayoutData.logo)) {
                changes['logo'] = true;
                // changes['logo'] = changesMade.storage.logo.name;
            } else {
                delete changes['logo'];
            }

            // keywords
            if (!jsonStringIsEqual(currentPageState.pageLayoutData.metadata.keywords, pageLayoutData.metadata.keywords)) {
                changes['keywords'] = true;
            } else {
                delete changes['keywords'];
            }

            // aboutUs
            if (!jsonStringIsEqual(currentPageState.pageData.aboutUs, pageData.aboutUs)) {
                changes['aboutUs'] = true;
            } else {
                delete changes['aboutUs'];
            }

            // contacts
            if (!jsonStringIsEqual(currentPageState.pageData.contacts, pageData.contacts)) {
                changes['contacts'] = true;
            } else {
                delete changes['contacts'];
            }

            // social
            if (!jsonStringIsEqual(currentPageState.pageData.fb_link, pageData.fb_link)) {
                changes['social'] = true;
            } else {
                delete changes['social'];
            }

            // photos
            if (!jsonStringIsEqual(currentPageState.pageData.photos, pageData.photos)) {
                changes['photos'] = true;
            } else {
                delete changes['photos'];
            }

            setChangesMade((prevState) => ({
                ...prevState,
                changes: changes
            }))
        } else {
            setChangesMade((prevState) => {
                delete prevState.changes;
                delete prevState.files;
                return prevState;
            })
        }
    }, [currentPageState]);

    const handleResetAll = () => {
        setCurrentPageState({ pageLayoutData, pageData });
        setChangesMade({ all: false })
    }

    // console.log('pageData photos:', currentPageState.pageData.photos)
    // console.log('photo storage:', changesMade.storage.photos)

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
                    <div className={`p-5 m-1 !border-2 border-transparent ${changesMade.all && '!border-red-500'}`}>
                        {changesMade.all && (
                            <div className="flex justify-end mb-2">
                                <div className="px-3 py-1 text-sm text-white rounded-full bg-red-500">
                                    Unsaved Changes
                                </div>
                            </div>
                        )}
                        <Home
                            editing={
                                {
                                    coverPhoto: <EditorCoverPhoto />,
                                    orgLogo: <EditorOrganizationLogo />,
                                    keywords: <EditorKeywords />,
                                    aboutUs: <EditorAboutUs />,
                                    contacts: <EditorContacts />,
                                    officers: <EditorOfficers />,
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
        const [file, setFile] = useState(changesMade?.storage?.coverPhoto);
        const [previewUrl, setPreviewUrl] = useState(file ? URL.createObjectURL(file) : '');
        const [error, setError] = useState('');

        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                if (selectedFile.size > MAX_FILE_SIZE) {
                    setError('Max. file size 2MB exceeded.');
                    return
                } else {
                    setError('');
                }

                if (selectedFile.name === 'default.jpeg') {
                    setError('File name "default.jpeg" is not allowed.');
                    return;
                } else {
                    setError('');
                }

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

            setChangesMade((prevState) => ({
                ...prevState,
                storage: {
                    ...prevState.storage,
                    coverPhoto: file
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

            setChangesMade((prevState) => {
                let newState = { ...prevState };
                delete newState.storage.coverPhoto;

                return newState;
            })
        }

        const coverPhotoErrors = Object.entries(errors)
            .filter(([key]) => key === 'changesMade.storage.coverPhoto')
            .map(([, value]) => value); // Extract error messages

        return (
            <EditArea
                title="Set Page Cover Photo"
                componentProps={{
                    // dialog: { open: true }
                    dialogTriggerCN: (changesMade.changes?.coverPhoto) ? 'border border-red-500' : ''
                }}
                // editErrors={coverPhotoErrors}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={(file) ? {
                        onClick: handleSavePreview
                    } : null}
                />}
            >
                <label>
                    Select an image: <span className="text-gray-400">(Accepts .png, .jpg, and .jpeg. Max 2MB)</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                />
                <div className="font-bold text-sm text-red-500">{error}</div>
                {(previewUrl && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="Image Preview"
                            className="object-cover"
                            style={{ width: "100%" }}
                        />
                    </div>
                )) || (changedCoverPhoto && (
                    <img
                        src={currentPageState.pageLayoutData.coverPhoto}
                        alt="Image Preview"
                        className="object-cover"
                        style={{ width: "100%" }}
                    />
                ))}
            </EditArea>
        )
    }

    function EditorOrganizationLogo() {
        const changedLogo = currentPageState.pageLayoutData.logo !== pageLayoutData.logo
        const [file, setFile] = useState(changesMade?.storage?.logo);
        const [previewUrl, setPreviewUrl] = useState(file ? URL.createObjectURL(file) : '');
        const [error, setError] = useState('');

        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                if (selectedFile.size > MAX_FILE_SIZE) {
                    setError('Max. file size 2MB exceeded.');
                    return
                } else {
                    setError('');
                }

                if (selectedFile.name === 'default.jpeg') {
                    setError('File name "default.jpeg" is not allowed.');
                    return;
                } else {
                    setError('');
                }

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

            setChangesMade((prevState) => ({
                ...prevState,
                storage: {
                    ...prevState.storage,
                    logo: file
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

            setChangesMade((prevState) => {
                let newState = { ...prevState };
                delete newState.storage.logo;

                return newState;
            })
        }

        // const logoErrors = Object.entries(errors)
        //     .filter(([key]) => key === 'changesMade.storage.logo')
        //     .map(([, value]) => value); // Extract error messages

        return (
            <EditArea
                title="Set Organization Logo"
                componentProps={{
                    // dialog: { open: true }
                    dialogTriggerCN: (changesMade.changes?.logo) ? 'border border-red-500' : ''
                }}
                // editErrors={logoErrors}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={(file) ? {
                        onClick: handleSavePreview
                    } : null}
                />}
            >
                <label>
                    Select an image: <span className="text-gray-400">(Accepts .png, .jpg, and .jpeg. Max 2MB)</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                />
                <div className="font-bold text-sm text-red-500">{error}</div>
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
            </EditArea>
        )
    }

    function EditorKeywords() {
        const [editKeywords, setEditKeywords] = useState(currentPageState.pageLayoutData.metadata.keywords)

        const handleReset = () => {
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    metadata: {
                        ...prevState.pageLayoutData.metadata,
                        keywords: pageLayoutData.metadata.keywords
                    }
                }
            }))

            setEditKeywords(pageLayoutData.metadata.keywords)
        }

        const handleSavePreview = () => {
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageLayoutData: {
                    ...prevState.pageLayoutData,
                    metadata: {
                        ...prevState.pageLayoutData.metadata,
                        keywords: editKeywords
                    }
                }
            }))
        }

        const handleUpdateKeywords = (k) => {
            setEditKeywords(k)
        }

        return (
            <EditArea
                title="Set Organization Keywords"
                componentProps={{
                    // dialog: { open: true }
                    dialogTriggerCN: (changesMade.changes?.keywords) ? 'border border-red-500' : ''
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <EditorKeywordSelect keywords={keywords} activeOrgKeywords={editKeywords} updateOrgKeywords={handleUpdateKeywords} />
            </EditArea>
        )
    }

    function EditorAboutUs() {
        const [editAboutUs, setEditAboutUs] = useState(currentPageState.pageData.aboutUs);
        const maxTextLength = 1500;

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

        // const aboutUsErrors = Object.entries(errors)
        //     .filter(([key]) => key === 'pageState.pageData.aboutUs') // Filter for the specific key
        //     .map(([, value]) => value); // Extract the error messages

        return (
            <EditArea
                title="Set About Us description (Max. 1500 characters)"
                componentProps={{
                    // dialog: { open: true }
                    dialogTriggerCN: (changesMade.changes?.aboutUs) ? 'border border-red-500' : '',

                }}
                // editErrors={aboutUsErrors}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <textarea
                    placeholder="Your description here..."
                    className="h-52"
                    maxLength={maxTextLength}
                    value={editAboutUs}
                    onBlur={() => setEditAboutUs((prevState) => {
                        const trimmedText = prevState?.trim();

                        return trimmedText;
                    })}
                    onChange={(e) => setEditAboutUs(e.target.value)}
                ></textarea>
                <div className="font-bold text-sm text-red-500">{editAboutUs.length == maxTextLength && `Max. length ${maxTextLength} reached.`}</div>
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
                    dialogContentCN: 'max-w-[40rem]',
                    dialogTriggerCN: (changesMade.changes?.contacts) ? 'border border-red-500' : ''
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
                                <tr key={index}>
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
                                            trigger={contact.name || <span className="text-red-500/80 font-bold">*required</span>}
                                            type='Name'
                                            required="true"
                                            componentProps={{
                                                input: { maxLength: 255 }
                                            }}
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
                                            trigger={contact.address || <span className="text-red-500/80 font-bold">*required</span>}
                                            type='Address'
                                            required="true"
                                            componentProps={{
                                                input: { maxLength: 255 }
                                            }}
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

    function EditorOfficers() {
        return (
            // <EditArea>
            // </EditArea>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-3xl -rotate-45 text-red-500/50 pointer-events-none">
                edit pending
            </div>
        )
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
                    // dialog: { open: true },
                    dialogTriggerCN: (changesMade.changes?.social) ? 'border border-red-500' : ''
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}
            >
                <input
                    type="text"
                    value={editSocial}
                    onBlur={() => setSocial(
                        (prevState) => {
                            const trimmedText = prevState?.trim()

                            return trimmedText;
                        })}
                    onChange={(e) => setSocial(e.target.value)}
                    maxLength={255}
                />
                <div className="font-bold text-sm text-red-500">{editSocial?.length === 255 && 'Max. characters: 255'}</div>
            </EditArea>
        )
    }

    function EditorPhotos() {
        const [editPhotos, setEditPhotos] = useState(currentPageState.pageData.photos);

        const [tempPhotoStorage, setTempPhotoStorage] = useState(changesMade?.storage?.photos || {});

        const handleSavePreview = () => {
            const nonEmptyPhotos = editPhotos.filter((photo) => (photo.caption !== '' && photo.filename !== ''))
            console.log(nonEmptyPhotos)
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    photos: nonEmptyPhotos
                }
            }));

            setChangesMade((prevState) => ({
                ...prevState,
                storage: {
                    ...prevState.storage,
                    photos: tempPhotoStorage
                }
            }))
        }

        const handleReset = () => {
            setCurrentPageState((prevState) => ({
                ...prevState,
                pageData: {
                    ...prevState.pageData,
                    photos: pageData.photos
                }
            }))

            setChangesMade((prevState) => {
                let newState = { ...prevState };
                delete newState.storage.photos

                return newState
            })
        }

        const handleDelete = (param) => {
            if (param == 0 && editPhotos.length == 1) {
                return;
            }
            const updatedPhotos = editPhotos.filter((_, index) => index !== param)
            setEditPhotos(updatedPhotos);

            setTempPhotoStorage((prevState) => {
                const { [param]: _, ...rest } = prevState;
                let newState = {}
                Object.entries(rest).forEach(([key, value]) => {
                    if (key > param) {
                        newState[key - 1] = value;
                    } else {
                        newState[key] = value;
                    }
                });

                return newState;
            });
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

            setTempPhotoStorage((prevState) => {
                const updatedStorage = { ...prevState };

                if ((index in updatedStorage) && ((index - 1) in updatedStorage)) {
                    const heldItem = updatedStorage[index - 1];
                    updatedStorage[index - 1] = updatedStorage[index];
                    updatedStorage[index] = heldItem;
                } else if (index in updatedStorage) {
                    updatedStorage[index - 1] = updatedStorage[index];
                    delete updatedStorage[index];
                }

                return updatedStorage;
            });

        }

        function handleMoveItemDown(index) {
            setEditPhotos((prevState) => {
                if (index >= prevState.length - 1) return prevState;

                const updatedPhotos = [...prevState];

                const heldItem = updatedPhotos[index + 1];
                updatedPhotos[index + 1] = updatedPhotos[index];
                updatedPhotos[index] = heldItem;

                return updatedPhotos;
            });

            setTempPhotoStorage((prevState) => {
                const updatedStorage = { ...prevState };

                if ((index in updatedStorage) && ((index + 1) in updatedStorage)) {
                    const heldItem = updatedStorage[index + 1];
                    updatedStorage[index + 1] = updatedStorage[index];
                    updatedStorage[index] = heldItem;
                } else if (index in updatedStorage) {
                    updatedStorage[index + 1] = updatedStorage[index];
                    delete updatedStorage[index];
                }

                return updatedStorage;
            });
        }

        function handleAddPhotoField() {
            setEditPhotos((prevState) => {
                const emptyPhoto = {
                    photoID: null,
                    orgID: orgID,
                    caption: '',
                    filename: '',
                };

                return [...prevState, emptyPhoto];
            });
        }

        /**
         * replicating error:
         *  - add new photo and delete default
         * status of remaining row:
         *  - storage file index 1, state index 0 // mismatch
         */
        console.log('editPhotos:', editPhotos)
        console.log('tempPhotoStorage:', tempPhotoStorage)

        return (
            <EditArea
                title="Set Showcase Photos"
                transparent
                componentProps={{
                    // dialog: { open: true },
                    dialogContentCN: 'max-w-[40rem] w-full overflow-x-auto',
                    dialogTriggerCN: (changesMade.changes?.photos) ? 'border border-red-500' : ''
                }}
                footer={<EditArea.ActionButtons
                    resetProps={{ onClick: handleReset }}
                    previewChangeProps={{ onClick: handleSavePreview }}
                />}

            >
                <table>
                    <thead>
                        <tr>
                            <th className="w-56 max-w-56 min-w-36">
                                Preview <br />
                                <span className="text-gray-400 text-xs !leading-[0rem]">
                                    (Accepts .png, .jpg, and .jpeg. Max 2MB. <s>default.jpeg</s>)
                                </span>
                            </th>
                            <th className="w-72">Caption</th>
                            <th className="w-32">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editPhotos.map((item, index) => (
                            <PhotoRow item={item} index={index} key={index} />
                        ))}
                    </tbody>
                </table>
                {(editPhotos.length < 4) && (
                    <button className="py-2 rounded-md text-center w-full bg-slate-300 hover:bg-slate-300/80"
                        onClick={handleAddPhotoField}
                    >
                        <span className="text-xl">+</span>&nbsp;Add Photo
                    </button>
                ) || (
                        <span className='text-red-500 text-center text-sm font-bold -mt-3'>(Max: 4)</span>
                    )}
            </EditArea>
        )

        function PhotoRow({ item, index }) {
            const [error, setError] = useState('');

            const handleImageChange = (event) => {
                const selectedFile = event.target.files[0];

                if (selectedFile) {
                    if (selectedFile.size > MAX_FILE_SIZE) {
                        setError('Max. file size 2MB exceeded.');
                        return
                    } else {
                        setError('');
                    }

                    if (selectedFile.name === 'default.jpeg') {
                        setError('File name "default.jpeg" is not allowed.');
                        return;
                    } else {
                        setError('');
                    }

                    const newPhotoPreview = URL.createObjectURL(selectedFile);

                    setEditPhotos((prevState) => {
                        const updatedPhotos = [...prevState];
                        updatedPhotos[index] = {
                            ...updatedPhotos[index],
                            filename: newPhotoPreview
                        };
                        return updatedPhotos;
                    });

                    setTempPhotoStorage((prevState) => ({
                        ...prevState,
                        [index]: selectedFile
                    }))

                }
            };

            return (
                <>
                    <tr>
                        <td>
                            <div className="flex flex-col gap-y-2">
                                <img src={editPhotos[index].filename === '' ? '/storage/photo/default.jpeg' : editPhotos[index].filename} alt={`Photo loading error`} />
                                <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    className="w-full text-sm"
                                    onChange={handleImageChange}
                                />
                                <div className="font-bold text-sm text-red-500">{error}</div>
                            </div>
                        </td>
                        <td>
                            <div className="py-2 px-1">
                                <TextEditorDialog
                                    trigger={item.caption || <span className="text-red-500/80 font-bold">*required</span>}
                                    type='Caption'
                                    required='true'
                                    componentProps={{
                                        dialogTriggerCN: 'text-xs sm:text-base leading-tight sm:leading-normal',
                                        input: { maxLength: 255 }
                                    }}
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
                                    className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-300 relative group disabled:cursor-not-allowed"
                                    disabled={index == 0 && editPhotos.length == 1}
                                >
                                    <IconDelete />
                                    <div className="group-disabled:block hidden h-0 border-b-2 border-red-500 absolute w-full inset-0 m-auto -rotate-45" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='3'>
                            <div className="border-b-[1px] mt-2 mb-3 border-slate-400 w-full" />
                        </td>
                    </tr>
                </>
            )
        }
    }

    function EditorSaveButton() {
        const { data, _, post, progress } = useForm({
            changesMade: changesMade,
            pageState: currentPageState
        })

        async function handleSave(e) {
            e.preventDefault()
            try {
                post(route('admin.saveEditPage', [orgID]));
            } catch (error) {
                console.log('save error: ', error);
            }
        }

        return (
            <>
                {changesMade.all && (
                    <form onSubmit={(e) => handleSave(e)} className="contents">
                        <div className="gap-4 flex flex-col md:items-center md:flex-row mt-6">
                            <div className="flex gap-4">
                                <button
                                    className="px-3 py-2 bg-red-400 rounded-lg whitespace-nowrap"
                                    onClick={handleResetAll}
                                >
                                    Reset All
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-cyan-400 rounded-lg whitespace-nowrap flex items-center gap-x-2"
                                >
                                    {progress && (
                                        <div className="w-[40px] flex justify-center">
                                            <div className="dot-flashing" />
                                        </div>
                                    )}
                                    <span>Save Changes</span>
                                </button>

                            </div>
                        </div>

                    </form>
                )}
            </>
        )
    }
}

export default AdminEditPage;
