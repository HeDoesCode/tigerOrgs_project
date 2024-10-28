import FormRenderer from "@/Components/Forms/Form-Renderer/FormRenderer";
import OrganizationLayout from "@/Components/Organizations/OrganizationLayout";
import { Head } from "@inertiajs/react";

function Apply({ pageLayoutData, formLayout, orgID, formID }) {
    console.log(formLayout);
    return (
        <OrganizationLayout pageLayoutData={pageLayoutData}>
            <Head
                title={`Applying for ${pageLayoutData.metadata.organizationName}`}
            />
            <FormRenderer
                orgID={orgID}
                formID={formID}
                formLayout={formLayout}
            />
        </OrganizationLayout>
    );
}

export default Apply;
