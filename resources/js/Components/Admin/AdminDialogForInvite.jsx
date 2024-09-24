import AdminDialog from "./AdminDialog";
import Searchbar from "../Searchbar";
import AdminOrgInvCard from "./AdminOrgInvCard";
import AdminButton from "./AdminButton";
import IconInvite from "../Icons/IconInvite";

function AdminDialogForInvite({ ...props }) {
    return (
        <AdminDialog
            title={props.title}
            description={props.description}
            trigger={props.trigger}
        >
            <form onSubmit={props.handleInvite}>
                <Searchbar
                    className={"col-span-3"}
                    value={props.orgSearchQuery}
                    onChange={props.handleOrgSearchChange}
                    placeholder={"Search for an organization"}
                />
                <div className="max-h-[400px] overflow-auto">
                    {props.filteredOrganizations.length !== 0 ? (
                        <div className="grid sm:grid-cols-2 overflow-auto grid-cols-1 gap-4 p-5">
                            {props.filteredOrganizations.map((organization) => (
                                <AdminOrgInvCard
                                    key={organization.orgID}
                                    userRoles={props.currentUserRoles}
                                    organization={organization}
                                    onClick={() => {
                                        props.getOrg(organization.orgID);
                                    }}
                                    selectedOrg={props.selectedOrg}
                                    onDelete={props.onDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="m-14 sm:m-48 text-xl font-thin text-center">
                            No Organization Found
                        </div>
                    )}
                </div>

                <div className="grid justify-items-end">
                    <AdminButton
                        className="mr-2 mt-5  bg-white hover:bg-green-800 hover:text-white"
                        icon={<IconInvite />}
                        name="Save"
                        type="submit"
                        disabled={props.processing}
                    />
                </div>
            </form>
        </AdminDialog>
    );
}

export default AdminDialogForInvite;
