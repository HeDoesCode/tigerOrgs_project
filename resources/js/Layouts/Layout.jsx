
function Layout({ children, sidebar, headerContent }) {
    // const headerHeight_pt = 'pt-[4.5rem]';
    const headerHeight_pt = 'pt-16';
    const headerHeight_h = 'h-16';
    const sideBarWidth_pl = 'pl-16';
    const sideBarWidth_w = 'w-16';

    return (
        <div className={`${sidebar && 'pl-0 sm:pl-16'} flex`}>
            <Header />
            {sidebar}
            <main className={`w-full overflow-y-auto h-full ${headerHeight_pt} my-2 px-4`}>
                {children}
            </main>
        </div>
    );

    function Header() {
        return (
            <div className='relative'>
                <div className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 ${headerHeight_h} ${sidebar && sideBarWidth_pl} bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px]`}>
                    <div className={`poetsen-one text-2xl ${sidebar && 'ml-2'}`}><span className='text-[#E7A600]'>Tiger</span>Orgs</div>
                    {headerContent}
                </div>
            </div>
        );


    }

}

export default Layout
