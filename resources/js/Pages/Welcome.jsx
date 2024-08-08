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
                content n <br />
            </Layout>
        </div>
    );

    function Layout({ children, sidebar, footer }) {
        const headerHeight = '14';
        const sidebarWidth = '16';

        return (
            <div>
                <Header />
                {sidebar && <SideBar />}
                <main className={`w-full px-4 ${sidebar && `pl-${sidebarWidth}`} min-h-screen pt-${headerHeight}`}>
                    {children}
                </main>
                {footer && <Footer />}
            </div>
        );

        function SideBar() {
            return (
                <div className={`fixed flex flex-col left-0 w-${sidebarWidth} px-3`}>
                    <div className={`h-${headerHeight} flex items-center justify-center`}>I.Menu</div>
                    <nav className='flex flex-col items-center'>
                        <Link>Orgs</Link>
                        <Link>logs</Link>
                    </nav>
                </div>
            );
        }

        function Header() {

            return (
                <div>
                    <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 h-${headerHeight} ${sidebar && (`pl-${sidebarWidth}`)} bg-[#EEEEEE] px-4`}>
                        {/* <div>I.Menu</div> */}
                        <div>TigerOrgs</div>
                        <nav className='flex-1'>
                            <ul className='flex justify-end space-x-4'>
                                <li>Home</li>
                                <li>Organizations</li>
                                <li>Status</li>
                                <li className='flex items-center'>
                                    <div className='w-0 border-gray-400 border-r-[1px] h-5'></div>
                                </li>
                                <li>Bell</li>
                                <li>Profile</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            );
        }

        function Footer() {
            return (
                <div className='b min-h-32 mx-4'>Footer</div>
            );
        }
    }
}
