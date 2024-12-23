import IconMailFilled from "@/Components/Icons/IconMailFilled";
import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
import KeywordSelect from "@/Components/Organizations/KeywordSelect";
import React, { useState } from "react";
import InputContainer from "./InputContainer";
import IconCircleMinus from "@/Components/Icons/IconCircleMinus";
import IconFileDownload from "@/Components/Icons/IconFileDownload";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

function Edit({ user, activeUserKeywords, keywords, followedOrgs = [] }) {
    const { toast } = useToast();
    // const fullName = `${user.firstname} ${user.lastname} ${user.middlename}`;
    const fullName = `${user.lastname}, ${user.firstname}
    ${user.middlename ? ` ${user.middlename[0]}.` : ""}`;

    const userSectionError = user.section != null ? null : "Specify Section";

    const [currentFollowedOrgs, setCurrentFollowedOrgs] = useState(
        [...followedOrgs] || []
    );

    const [editing, setEditing] = useState(false);

    const [openFollowingAlertDialog, setOpenFollowingAlertDialog] =
        useState(false);

    const handleSave = () => {
        if (
            JSON.stringify(currentFollowedOrgs) === JSON.stringify(followedOrgs)
        ) {
            setEditing(false);
            return;
        }

        const followedOrgIDs = followedOrgs.map(({ orgID }) => orgID);
        const currentFollowedOrgIDs = currentFollowedOrgs.map(
            ({ orgID }) => orgID
        );
        const unfollowedOrgs = followedOrgIDs.filter(
            (item) => !currentFollowedOrgIDs.includes(item)
        );
        router.patch(route("update.user.follows"), unfollowedOrgs, {
            onSuccess: () => {
                setEditing(false);
                toast({
                    title: "Unfollow Organizations Success",
                    description: "Successfully unfollowed organization/s.",
                    variant: "success",
                    duration: 3000,
                });
            },
            onError: () =>
                toast({
                    title: "Unfollow Organizations Failed",
                    description:
                        "An error occurred while updating your followed organizations.",
                    variant: "destructive",
                    duration: 4000,
                }),
        });
    };

    const visitOrg = (orgID) => {
        router.get(route("organizations.home", orgID));
    };

    const removeOrg = (orgID) => {
        setCurrentFollowedOrgs((prevState) => {
            const newState = prevState.filter((org) => org.orgID !== orgID);
            return newState;
        });
    };

    return (
        <div className="w-full">
            <Head title="Profile" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Manage <span className="text-[#ffb700]">Profile</span>
                </div>
                <div className="mt-4 w-full flex flex-col items-center px-5 gap-6">
                    <div className="w-full max-w-[65rem] flex flex-col items-center drop-shadow shadow-black rounded-[2rem] space-y-3 bg-[#F4F4F4] border border-gray-300">
                        <div className="h-28 sm:h-36 w-full flex flex-col justify-center px-12 space-y-3 bg-[#ffd875] rounded-[2rem]">
                            <span className="poetsen-one text-xl sm:text-3xl uppercase ">
                                {fullName}
                            </span>
                            <div className="flex gap-x-3 text-sm sm:textbase">
                                <div className="hidden sm:contents">
                                    <IconMailFilled />
                                </div>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className="w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="">
                                    ID Number:
                                    <div className="text-lg font-semibold">
                                        {user.userID}
                                    </div>
                                </div>
                                <div className="">
                                    Affiliation:
                                    <div className="text-lg font-semibold ">
                                        {user.college}
                                    </div>
                                </div>
                                <div className="">
                                    Stakeholder Category:
                                    <div className="text-lg font-semibold ">
                                        {user.status}
                                    </div>
                                </div>

                                <SectionInput />
                            </div>
                            <div className="mt-10">
                                <InputContainer
                                    title="Interests"
                                    className="min-h-11"
                                >
                                    <KeywordSelect
                                        activeUserKeywords={activeUserKeywords}
                                        keywords={keywords}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-[65rem] drop-shadow shadow-black rounded-[2rem] p-8 bg-[#F4F4F4] border border-gray-300">
                        <div className="w-full flex justify-between mb-5 gap-x-2">
                            <span className="font-bold mb-4">
                                Your followed organizations:
                            </span>
                            {followedOrgs.length !== 0 && (
                                <div className="h-10 flex gap-x-4 items-center">
                                    <span className="text-sm hidden sm:block text-slate-400/80 italic">
                                        {editing && "Click to unfollow"}
                                    </span>
                                    <button
                                        className={`px-2 select-none py-1 text-center w-20 rounded-md h-full ${
                                            editing
                                                ? "bg-sky-400"
                                                : "bg-amber-500 hover:bg-amber-400 transition-colors"
                                        }`}
                                        onClick={
                                            editing
                                                ? () => {
                                                      if (
                                                          JSON.stringify(
                                                              currentFollowedOrgs
                                                          ) ===
                                                          JSON.stringify(
                                                              followedOrgs
                                                          )
                                                      ) {
                                                          setEditing(false);
                                                          return;
                                                      }
                                                      setOpenFollowingAlertDialog(
                                                          true
                                                      );
                                                  }
                                                : () => setEditing(true)
                                        }
                                    >
                                        {editing ? "Save" : "Edit"}
                                    </button>
                                    <AlertDialog
                                        open={openFollowingAlertDialog}
                                        onOpenChange={(open) =>
                                            setOpenFollowingAlertDialog(open)
                                        }
                                    >
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Confirm unfollowing
                                                    organization/s.
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You may still follow them
                                                    again later.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleSave}
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </div>
                        <div className="w-full grid sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-4">
                            {/* <div className="w-full flex flex-col sm:grid sm:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] gap-4"> */}
                            {currentFollowedOrgs.map((org, index) => (
                                <FollowedOrganizationTile
                                    org={org}
                                    key={index}
                                />
                            ))}
                            {currentFollowedOrgs.length == 0 && (
                                <span className="text-sm text-slate-400/80 italic">
                                    No followed organizations...
                                </span>
                            )}
                        </div>
                    </div>
                    {/* <div className="w-full max-w-[65rem] drop-shadow shadow-black rounded-[2rem] p-8 bg-[#F4F4F4] border border-gray-300"> */}
                    <div className="p-5 grid max-w-[65rem] gridcol drop-shadow shadow-black rounded-[2rem] bg-[#F4F4F4] col-span-12 lg:col-span-7 w-full border border-gray-300">
                        <h1 className="font-bold">User Manual - Users</h1>
                        <div className="flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out">
                            <button
                                className="cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md"
                                onClick={() =>
                                    (window.location.href = route("download", [
                                        "manual",
                                    ]))
                                }
                            >
                                <span>Download Manual</span>
                                <IconFileDownload />
                            </button>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </UserLayout>
        </div>
    );

    function FollowedOrganizationTile({ org }) {
        return (
            <button
                className="flex items-center gap-x-3 hover:bg-slate-800 py-2 rounded-lg hover:text-white text-black bg-transparent transition-all"
                onClick={
                    editing
                        ? () => removeOrg(org.orgID)
                        : () => visitOrg(org.orgID)
                }
            >
                <div>
                    <IconCircleMinus
                        fill="#ef4444"
                        stroke="white"
                        size="27"
                        className={editing ? "block ml-3" : "hidden"}
                    />
                </div>
                <div className="flex items-center gap-x-2">
                    <img
                        src={`storage/logo/${org.logo}`}
                        className="aspect-square rounded-full size-12"
                    />
                    <div className="flex-1 line-clamp-2 leading-5 text-left">
                        {org.name}
                    </div>
                </div>
            </button>
        );
    }

    function SectionInput() {
        const [sectionString, setSectionString] = useState(user.section || "");

        const handleSectionStringChange = (e) => {
            setSectionString(e.target.value);
        };

        const handleSectionKeyDown = (e) => {
            if (e.key === "Enter") patchSection(sectionString);
        };

        const patchSection = (section) => {
            if (section === "" || sectionString === user.section) {
                return;
            } else {
                router.patch(route("update.user.section"), {
                    section,
                });
            }
        };

        return (
            <InputContainer
                title="Section"
                error={
                    userSectionError || sectionString !== user.section
                        ? "Unsaved"
                        : ""
                }
            >
                <div className="flex">
                    <input
                        type="text"
                        maxLength={10}
                        placeholder={"[YEAR]-[SECTION] ex. 3-ITG"}
                        className="w-full rounded-l-lg focus:border-black border-transparent"
                        value={sectionString}
                        onChange={handleSectionStringChange}
                        onKeyDown={handleSectionKeyDown}
                        // onBlur={() => setSectionString(user.section || '')}
                    />
                    {sectionString !== user.section && (
                        <button
                            className="px-3 border-l border-l-gray-200"
                            onClick={() => setSectionString(user.section || "")}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        className={`rounded-r-lg border-l border-l-gray-200 px-3 ${
                            sectionString !== user.section
                                ? "hover:bg-black/5 text-black"
                                : "cursor-not-allowed text-gray-500"
                        }`}
                        disabled={sectionString === user.section}
                        onClick={() => patchSection(sectionString)}
                    >
                        Save
                    </button>
                </div>
            </InputContainer>
        );
    }
}

export default Edit;
