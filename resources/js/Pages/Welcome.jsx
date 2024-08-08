import { Link, Head } from '@inertiajs/react';

export default function Welcome({ role }) {

    function IconBellFilled({ size }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
        )
    }

    function IconProfile({ size }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
        )
    }

    function IconMenu3({ size }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
            </svg>
        )
    }

    function IconList({ size }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-list-details">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 5h8" />
                <path d="M13 9h5" />
                <path d="M13 15h8" />
                <path d="M13 19h5" />
                <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            </svg>
        )
    }

    function IconHistory({ size }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-history">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8l0 4l2 2" />
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
        )
    }

    return (
        <div className='w-full'>
            <Layout sidebar footer header> {/* pass array or object for sidebar links */}
                content 1 <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content <br />
                content n <br />
            </Layout>
        </div>
    );

    function Layout({ children, sidebar, footer, header }) {
        const headerHeight_pt = 'pt-[4.5rem]';
        const headerHeight_h = 'h-16';
        const sideBarWidth_pl = 'pl-20';
        const sideBarWidth_w = 'w-16';
        const footer_minHeight = 'min-h-32';

        return (
            <div>
                <Header />
                {sidebar && <SideBar />}
                <main className={`w-full p-4 ${sidebar && sideBarWidth_pl} min-h-screen ${headerHeight_pt}`}>
                    {children}
                    {footer && <Footer />}
                </main>
            </div>
        );

        function SideBar() {
            return (
                <div className={`fixed flex flex-col left-0 ${sideBarWidth_w} h-full`}>
                    <div className={`${headerHeight_h} flex items-center justify-center`}>
                        <IconMenu3 size={'27'} />
                    </div>
                    <nav className='flex flex-1 flex-col items-center py-5 border-gray-400 border-r-[1px] space-y-5'>
                        <Link>
                            <IconList />
                        </Link>
                        <Link>
                            <IconHistory />
                        </Link>
                    </nav>
                </div>
            );
        }

        function Header() {

            return (
                <div>
                    <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 ${headerHeight_h} ${sidebar && sideBarWidth_pl} bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px]`}>
                        <div>TigerOrgs</div>
                        {header && (
                            <nav className='flex-1'>
                                <ul className='flex justify-end space-x-4'>
                                    <li>Home</li>
                                    <li>Organizations</li>
                                    <li>Status</li>
                                    <li className='flex items-center'>
                                        <div className='w-0 border-gray-400 border-r-[1px] h-5'></div>
                                    </li>
                                    <li><IconBellFilled /></li>
                                    <li><IconProfile /></li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            );


        }

        function Footer() {
            return (
                <div className={`${footer_minHeight} mt-3`}>Footer</div>
            );
        }
    }
}
