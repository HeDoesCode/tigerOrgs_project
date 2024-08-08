import { Link } from '@inertiajs/react';
import IconMenu3 from '@/Components/Icons/IconMenu3';
import IconList from '@/Components/Icons/IconList';
import IconHistory from '@/Components/Icons/IconHistory';
import IconTableOptions from '@/Components/Icons/IconTableOptions';
import IconUserSearch from '@/Components/Icons/IconUserSearch';

function Layout({ children, sidebar, headerContent }) {
    const headerHeight_pt = 'pt-[4.5rem]';
    const headerHeight_h = 'h-16';
    const sideBarWidth_pl = 'pl-20';
    const sideBarWidth_w = 'w-16';

    return (
        <div>
            <Header />
            {sidebar && <SideBar />}
            <main className={`w-full ${sidebar || 'p-4'} h-screen ${headerHeight_pt} overflow-y-auto`}>
                {/* {children} */}
                {sidebar ?
                    <div className='flex h-full w-full'>
                        <div className={sideBarWidth_w}>
                            {/* sidebar width */}
                        </div>
                        <div className='flex-1 px-4'>{children}</div>
                    </div>
                    :
                    <>{children}</>
                }
            </main>
        </div>
    );

    function SideBar() {
        return (
            // <div className={`fixed flex flex-col left-0 ${sideBarWidth_w} h-full`}>
            //     {/* <div className='fixed inset-0 bg-gray-400 opacity-20'></div> */}
            //     <div className={`${headerHeight_h} flex items-center justify-center w-full`}>
            //         <IconMenu3 size={'27'} />
            //     </div>
            //     <div className='flex flex-1 w-full justify-center relative'>
            //         <nav className='absolute h-min left-0 flex flex-col items-center p-5 border-gray-400 border-r-[1px] space-y-5 min-w-full bg-[#EEEEEE]'>
            //             <SideBarLink desc='Organizations'>
            //                 <IconList />
            //             </SideBarLink>
            //             <Link>
            //                 <IconHistory />
            //             </Link>
            //             <Link>
            //                 <IconTableOptions />
            //             </Link>
            //             <Link>
            //                 <IconUserSearch size={27} />
            //             </Link>
            //         </nav>
            //     </div>
            // </div>
            <div className={`fixed left-0 top-0 bottom-0 ${sideBarWidth_w} flex justify-center b`}>
                <div className={`${headerHeight_h} ${sideBarWidth_w} flex items-center justify-center  b`}><IconMenu3 size='27' /></div>
            </div>
        );

        // function SideBarLink({ children, desc }) {
        //     return (<>
        //         <Link>
        //             <div className='flex space-x-3'>
        //                 {children}
        //                 <span className='w-0 hidden'>{desc}</span>
        //             </div>
        //         </Link>
        //     </>)
        // }


    }

    function Header() {
        return (
            <div className='relative'>
                <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 ${headerHeight_h} ${sidebar && sideBarWidth_pl} bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px]`}>
                    <div className='poetsen-one text-2xl'><span className='text-[#E7A600]'>Tiger</span>Orgs</div>
                    {headerContent}
                </div>
            </div>
        );


    }

}

export default Layout
