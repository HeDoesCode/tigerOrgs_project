import OrganizationLayout from "@/Components/Organizations/OrganizationLayout"
import { Head } from "@inertiajs/react"

function Apply({ pageLayoutData, formLayout }) {
    return (
        <OrganizationLayout pageLayoutData={pageLayoutData}>
            <Head title={`Applying for ${pageLayoutData.metadata.organizationName}`} />
            test
        </OrganizationLayout>
    )
}

export default Apply
