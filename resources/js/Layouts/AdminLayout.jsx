import IconExit from "@/Components/Icons/IconExit"
import Layout from "./Layout"
import { Link } from "@inertiajs/react"

function AdminLayout({ children }) {
    return (
        <Layout headerContent={<HeaderContent />} sidebarLinks={<SidebarLinks />} sidebar>
            {children}
        </Layout>
    )

    function HeaderContent() {
        return (
            <div className="flex-1 flex justify-end">
                <Link href="#userpage" className='p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl'><IconExit size='27' /></Link>
            </div>
        )
    }

    function SidebarLinks() {
        return (<></>)
    }
}

export default AdminLayout
