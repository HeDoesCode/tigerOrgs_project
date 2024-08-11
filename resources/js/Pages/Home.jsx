import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout.jsx';
import Logo from '@/Components/Logo';
import IconSearch from '@/Components/Icons/IconSearch';

function Home({ bgImage, tiger1, tiger2 }) {
    return (
        <div className='w-full'>
            <Head title="Home" />
            <UserLayout bgImage={bgImage}>
                <div className='w-full flex-1 flex justify-center items-center relative'>
                    <div className='flex flex-col items-center mx-7 w-full max-w-[35rem] relative'>
                        <Logo className='mb-14 text-[15cqw] sm:text-[7rem] sm:mb-20' leftClass='text-[#FFBC11]' />
                        <div className='flex w-full max-w-lg h-14 relative'>
                            <div className='absolute h-full flex items-center justify-center text-gray-500 w-20'>
                                <IconSearch size={'22'} />
                            </div>
                            <input type="text" className='flex-1 rounded-l-full border-gray-400 border-l-[1px] border-y-[1px] border-r-0 pl-16 text-base sm:text-lg text-ellipsis' placeholder='Search Organizations' />
                            <button className='rounded-r-full h-auto flex items-center justify-center min-w-24 w-24 bg-[#FFCD12] border-gray-400 border-r-[1px] border-y-[1px] border-l-0 nunito font-bold'>
                                Search
                            </button>
                        </div>
                        <button className='bg-[#FFE6C1] bg-opacity-50 mt-8 sm:mt-12 p-4 sm:p-5 rounded-2xl border-[3px] border-[#FFCD12] nunito font-extrabold text-sm sm:text-xl shadow-md shadow-gray-500'>
                            Browse Organizations
                        </button>
                    </div>
                    <img className='absolute bottom-[-3.3rem] sm:bottom-[-4.3rem] right-[3%] h-36 sm:h-56' src={tiger1} alt="" />
                    <img className='absolute top-[-0.5rem] left-[5%] rotate-180 h-40 sm:h-60' src={tiger2} alt="" />
                </div>
            </UserLayout>
        </div>
    )
}

export default Home
