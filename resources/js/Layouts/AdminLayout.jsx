import IconExit from "@/Components/Icons/IconExit"
import Layout from "./Layout"
import { Link } from "@inertiajs/react"
import IconUserSearch from '@/Components/Icons/IconUserSearch';
import IconFolder from '@/Components/Icons/IconFolder';

function AdminLayout({ children }) {
    return (
        <Layout headerContent={<HeaderContent />} sidebar={<SideBarContent />}>
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

    function SideBarContent() {
        return (
            <div className={`border-gray-300 border-r-[1px] fixed left-0 top-0 bottom-0 min-w-16 w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE]`}>
                <div className='flex'>
                    <div className={`min-h-16 min-w-16 size-16 flex items-center justify-center p-2`}>
                        {/* logo */}
                        {/* <IconMenu3 size='27' /> */}
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s" alt="test" className='bg-cover rounded-full' />
                    </div>
                    <p className='text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-full'>Placeholder Society of Information Technology Enthusiasts (SITE)</p>
                </div>
                <nav className='flex-1 flex flex-col space-y-3 m-2 transition-all group-hover:mr-0 ease-in-out duration-300'>
                    <SideBarLink
                        icon={<IconFolder size='100%' />}
                        href='#managepage'
                        desc='Manage'
                        current />
                    <SideBarLink
                        icon={<IconUserSearch size='100%' />}
                        href='#recruitmentpage'
                        desc='Recruitment'
                    />
                </nav>
            </div>
        );

        function SideBarLink({ icon, href, desc, current }) {
            return (
                <div className={`flex pl-[0.6rem] group-hover:transition ease-in-out duration-300 p-2 group-hover:pl-5 group-hover:rounded-r-none rounded-full ${current && 'bg-[#FFBC58]' || 'hover:bg-gray-800 hover:text-white'}`}>
                    <Link className='contents' href={href}>
                        <div className='min-h-7 min-w-7 size-7'>{icon}</div>
                        <div className='text-left pl-3 text-lg overflow-hidden h-min my-auto w-full'>{desc}</div>
                    </Link>
                </div>
            )
        }


    }
}

export default AdminLayout
