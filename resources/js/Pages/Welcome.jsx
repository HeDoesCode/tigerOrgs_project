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

        return (
            <div>
                <Header />
                {sidebar && <SideBar />}
                <main className={`w-full px-4 ${sidebar && `pl-16`} min-h-screen pt-14`}>
                    {children}
                </main>
                {footer && <Footer />}
            </div>
        );

        function SideBar() {
            return (
                <div className={`fixed flex flex-col left-0 w-16 px-3`}>
                    <div className={`h-14 flex items-center justify-center`}>I.Menu</div>
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
                    <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 h-14 ${sidebar && (`pl-16`)} bg-[#EEEEEE] px-4`}>
                        <div>TigerOrgs</div>
                        <nav className='flex-1'>
                            <ul className='flex justify-end space-x-4'>
                                <li>Home</li>
                                <li>Organizations</li>
                                <li>Status</li>
                                <li className='flex items-center'>
                                    <div className='w-0 border-gray-400 border-r-[1px] h-5'></div>
                                </li>
                                <li><IconBellFilled /></li>
                                <li>Profile</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            );

            function IconBellFilled({ size }) {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-bell">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" />
                        <path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" />
                    </svg>
                )
            }
        }

        function Footer() {
            return (
                <div className='b min-h-32 mx-4'>Footer</div>
            );
        }
    }
}
