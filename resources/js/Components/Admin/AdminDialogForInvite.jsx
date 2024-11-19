// AdminDialogForInvite.jsx
import { useState } from "react";
import AdminDialog from "./AdminDialog";
import Searchbar from "../Searchbar";
import AdminOrgInvCard from "./AdminOrgInvCard";
import AdminButton from "./AdminButton";
import IconInvite from "../Icons/IconInvite";
import { DialogDescription } from "@/Components/ui/dialog";

function AdminDialogForInvite({
    title,
    description,
    trigger,
    handleInvite,
    orgSearchQuery,
    handleOrgSearchChange,
    filteredOrganizations,
    currentUserRoles,
    getOrg,
    selectedOrg,
    onDelete,
    processing,
}) {
    // Add validation check for selected organization
    const isFormValid = selectedOrg !== 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            handleInvite(e);
        }
    };

    return (
        <AdminDialog title={title} trigger={trigger}>
            <div className="space-y-4">
                <DialogDescription asChild>
                    <div className="text-base">{description}</div>
                </DialogDescription>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Searchbar
                        className="col-span-3"
                        value={orgSearchQuery}
                        onChange={handleOrgSearchChange}
                        placeholder="Search for an organization"
                    />

                    <div className="max-h-[400px] overflow-auto">
                        {filteredOrganizations.length > 0 ? (
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 p-5">
                                {filteredOrganizations.map((organization) => (
                                    <AdminOrgInvCard
                                        key={organization.orgID}
                                        userRoles={currentUserRoles}
                                        organization={organization}
                                        onClick={() =>
                                            getOrg(organization.orgID)
                                        }
                                        selectedOrg={selectedOrg}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                No Organization Found
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <AdminButton
                            className={`py-2 bg-white ${
                                isFormValid
                                    ? "hover:bg-green-800 hover:text-white"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                            icon={<IconInvite />}
                            name="Save"
                            type="submit"
                            disabled={!isFormValid || processing}
                        />
                    </div>
                </form>
            </div>
        </AdminDialog>
    );
}

export default AdminDialogForInvite;
