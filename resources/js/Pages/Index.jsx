import { Link, Head } from '@inertiajs/react';

export default function Welcome({ role }) {



















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
                    {/* <div className='fixed inset-0 bg-gray-400 opacity-20'></div> */}
                    <div className={`${headerHeight_h} flex items-center justify-center w-full`}>
                        <IconMenu3 size={'27'} />
                    </div>
                    <div className='flex flex-1 w-full justify-center relative'>
                        <nav className='absolute h-min left-0 flex flex-col items-center p-5 border-gray-400 border-r-[1px] space-y-5 min-w-full bg-[#EEEEEE]'>
                            <SideBarLink desc='Organizations'>
                                <IconList />
                            </SideBarLink>
                            <Link>
                                <IconHistory />
                            </Link>
                            <Link>
                                <IconTableOptions />
                            </Link>
                            <Link>
                                <IconUserSearch size={27} />
                            </Link>
                        </nav>
                    </div>
                </div>
            );

            function SideBarLink({ children, desc }) {
                return (<>
                    <Link>
                        <div className='flex space-x-3'>
                            {children}
                            <span className='w-0 hidden'>{desc}</span>
                        </div>
                    </Link>
                </>)
            }


        }

        function Header() {

            return (
                <div>
                    <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 ${headerHeight_h} ${sidebar && sideBarWidth_pl} bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px]`}>
                        <div className='poetsen-one text-2xl'><span className='text-[#E7A600]'>Tiger</span>Orgs</div>
                        {header && (
                            <nav className='flex-1'>
                                <ul className='flex justify-end items-center space-x-6 nunito font-extrabold'>
                                    <li className='text-[#E7A600]'>Home</li>
                                    <li>Organizations</li>
                                    <li>Status</li>
                                    <li className='flex items-center'>
                                        <div className='w-0 border-gray-400 border-r-[1px] h-5'></div>
                                    </li>
                                    <li><Notifications count='15' /></li>
                                    <li><Profile /></li>
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
