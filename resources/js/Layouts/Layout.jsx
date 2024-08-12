import Footer from "@/Components/Footer";
import Logo from "@/Components/Logo";
import { Link } from "@inertiajs/react";

function Layout({ children, sidebar, headerContent, bgImage, footerTiger }) {
    // const headerHeight_pt = 'pt-[4.5rem]';
    const headerHeight_pt = 'pt-16';
    const headerHeight_h = 'h-16';
    const sideBarWidth_pl = 'pl-16';
    const sideBarWidth_w = 'w-16';

    const bgStyle = {
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        <div className={`${sidebar && 'pl-0 sm:pl-16'} flex select-none`}>
            <Header />
            {sidebar}
            <main className={`w-full overflow-y-auto h-screen pt-[4.5rem] px-4 select-text flex flex-col`} style={bgStyle}>
                {children}
                <Footer />
            </main>
        </div >
    );

    function Header() {
        return (
            <div className='relative'>
                <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 ${headerHeight_h} ${sidebar && sideBarWidth_pl} bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px]`}>
                    {/* <div className={`poetsen-one text-2xl ${sidebar && 'ml-2'}`}><span className='text-[#E7A600]'>Tiger</span>Orgs</div> */}
                    {/* <Link className='contents' href={route('/')}> */}
                    <Link className='contents'>
                        <Logo className={sidebar && 'ml-2'} />
                    </Link>
                    {headerContent}
                </div>
            </div>
        );


    }

}

export default Layout
