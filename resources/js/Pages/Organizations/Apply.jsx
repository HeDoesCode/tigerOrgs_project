import FormRenderer from "@/Components/Forms/Form-Renderer/FormRenderer"
import OrganizationLayout from "@/Components/Organizations/OrganizationLayout"
import { Head } from "@inertiajs/react"

function Apply({ pageLayoutData, formLayout }) {
    console.log(formLayout)
    return (
        <OrganizationLayout pageLayoutData={pageLayoutData}>
            <Head title={`Applying for ${pageLayoutData.metadata.organizationName}`} />
            <FormRenderer formLayout={formLayout} />
        </OrganizationLayout>
    )
}

export default Apply
