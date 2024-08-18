import UserLayout from "@/Layouts/UserLayout"
import { Link } from "@inertiajs/react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"


import IconArrowUp from "@/Components/Icons/IconArrowUp"
import IconMailFilled from "@/Components/Icons/IconMailFilled"
import IconQR from "@/Components/Icons/IconQR"
import IconUserPlus from "@/Components/Icons/IconUserPlus"

import IconInstagram from "@/Components/Icons/Social/IconInstagram"
import IconFacebookRoundFilled from "@/Components/Icons/Social/IconFacebookRoundFilled"
import IconX from "@/Components/Icons/Social/IconX"
import IconLinkedIn from "@/Components/Icons/Social/IconLinkedIn"

function Home({ editing, isRecruiting }) {
    editing = false;
    isRecruiting = false;

    const pageData = [
        {
            type: 'logo',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s',
        },
        {
            type: 'coverPhoto',
            src: 'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/440157037_826883462808874_1884542927338964791_n.png?stp=dst-png_s960x960&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF-iHA5tGGTjllKkngWhNwzZBy86ZNOkCFkHLzpk06QIWlW9y_IZDIa9gnqO4TmlORRLq8_A0Bay2SPO8SKF0Om&_nc_ohc=wnM1T6HPwUQQ7kNvgHPD7_-&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYDCQrliXzWlGMjKz1N0123SJwpAXflH8hyNnkmRfjdB0Q&oe=66C65C2D',
        },
        {
            type: 'metadata',
            metadata: {
                organizationName: 'Society of Information Technology Enthusiasts (SITE)',
                members: '210',
            }
        },
        {
            type: 'aboutUs',
            data: 'Official TigerOrgs™ page of the Society of Information Technology Enthusiasts, the mother organization of the IT students of the University of Santo Tomas.',
        },
        {
            type: 'contacts',
            data: [
                {
                    platform: 'email',
                    address: 'site.cics@ust.edu.ph',
                },
                {
                    platform: 'facebook',
                    address: 'https://www.facebook.com/site.ust',
                },
                {
                    platform: 'instagram',
                    address: 'https://www.instagram.com/site.ust',
                },
                {
                    platform: 'x',
                    address: 'https://www.x.com/site.ust',
                },
            ],
        },
        {
            type: 'officers',
            data: [
                {
                    position: 'President',
                    name: 'John Doe',
                },
                {
                    position: 'Vice President',
                    name: 'Jane Smith',
                },
                {
                    position: 'Secretary',
                    name: 'Alex Johnson',
                },
                {
                    position: 'Treasurer',
                    name: 'Emily Davis',
                },
                {
                    position: 'Auditor',
                    name: 'Michael Brown',
                },
                {
                    position: 'PRO',
                    name: 'Sarah Lee',
                }
            ],
        },
        {
            type: 'photos',
            data: [
                {
                    caption: 'CICS Wellness Series',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1JyKAmPjMMDpas4R8piV_Q6DHSjTBXgd3Q&s',
                },
                {
                    caption: 'CICS Wellness Series',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1JyKAmPjMMDpas4R8piV_Q6DHSjTBXgd3Q&s',
                },
            ],
        },
    ]

    const originalPageData = {}

    /*
    pageData para sa view mode and edit mode.
    sa edit mode, store sa originalPageData yung original data and store sa pageData yung original data first then yung edits
    compare yung orig and new data jan natin determine if enable or disable yung "Save Changes" button para save bandwidth di lang basta basta upload to server
    probably (pageData === originalPageData)
    */

    return (
        <div className="w-full">
            <UserLayout noPadding>
                <div>
                    {/* cover photo */}
                    <CoverPhoto />
                    <div className="w-full h-fit md:h-48 -mt-14 px-5 md:px-12 flex justify-between">

                        {/* organization logo */}
                        <OrganizationLogo />

                        <div className="flex-1 hidden md:flex px-8 pt-12 my-2 items-center">
                            <div className="w-full justify-center space-x-3 flex">
                                <OrganizationMetadata />
                                <div className="w-fit text-xs font-bold h-min">
                                    <div className="flex items-center flex-nowrap py-1 px-3 rounded-full bg-[#D9D9D9]">
                                        View&nbsp;QR&nbsp;<IconQR size='20' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 space-y-2 inter font-bold">
                            {isRecruiting && (
                                <div className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full bg-[#FFCB11] border-[0.15rem] border-[#AAAAAA] relative">
                                    Apply<div className="inline rotate-45"><IconArrowUp size='20' /></div>
                                </div>
                            )}
                            <a className="flex flex-nowrap justify-center items-center px-4 py-2 rounded-full border-[0.15rem] border-[#AAAAAA] relative bg-[#EEEEEE] hover:bg-sky-500 cursor-pointer">
                                Follow<div className="inline"><IconUserPlus size='20' /></div>
                            </a>
                        </div>
                    </div>

                    <div className="w-full px-5 md:px-12 flex md:hidden justify-center space-x-3 my-4">
                        <div className="">
                            <div className="text-lg inter font-extrabold">Society of Information Technology Enthusiasts (SITE) [max lines: 3]</div>
                            <div className="text-sm">210 members</div>
                        </div>
                        <div className="w-fit text-xs font-bold h-min">
                            <div className="flex items-center flex-nowrap py-1 px-3 rounded-full bg-[#D9D9D9]">
                                <span className="hidden sm:inline">View&nbsp;QR&nbsp;</span><IconQR size='20' />
                            </div>
                        </div>
                    </div>

                    {/* main content */}
                    <section className="h-fit px-5 md:px-12 space-y-3 md:space-y-8">

                        {/* About Us */}
                        <Tile name='About Us'>
                            {pageData.find(data => data.type === 'aboutUs').data}
                        </Tile>

                        <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8">
                            <div className="flex flex-col space-y-3 md:space-y-8 wfull md:w-1/2">

                                {/* Contacts and Information */}
                                <Tile name='Contacts and Information'>
                                    <ContactsContainer />
                                </Tile>

                                {/* Officers */}
                                <Tile name='Officers'>
                                    <OfficersContainer />
                                </Tile>
                            </div>

                            {/* Facebook Iframe */}
                            <div className="w-full md:w-1/2">
                                <Tile className='h-full' name='Social Activities'>
                                    facebook iframe
                                </Tile>
                            </div>
                        </div>
                        <Tile name='Showcase Photos' id='photos' className='overflow-x-hidden'>
                            <PhotoScrollArea />
                        </Tile>
                    </section>
                    {editing && (
                        <div className="flex justify-end px-5 md:px-12 mt-6">
                            <button className="px-3 py-2 bg-cyan-400 rounded-lg">Save Changes</button>
                        </div>
                    )}
                </div>
            </UserLayout>
        </div>
    )

    function EditArea() {
        return (
            <div className="absolute inset-0 h-full w-full flex items-center justify-center group hover:border hover:border-red-500">
                <button className="bg-gray-300/50 group-hover:bg-gray-500/80 px-3 py-2 opacity-50 hover:opacity-100 text-black hover:text-white rounded-xl">Edit</button>
            </div>
        )
    }

    function CoverPhoto() {
        return (
            <div className="max-h-[25rem] h-fit rounded-b-[2rem] border-b-[0.15rem] border-b-[#AAAAAA] overflow-clip flex items-center relative z-0">
                <img src={pageData.find(page => page.type === 'coverPhoto').src}
                    alt="Organization Cover Photo"
                    className="w-full object-cover" />
                {editing && (
                    <EditArea />
                )}
            </div>
        )
    }

    function OrganizationLogo() {
        return (
            <div className="size-36 md:size-44 rounded-[2rem] overflow-clip relative">
                <img src={pageData.find(page => page.type === 'logo').src}
                    alt="Organization Logo"
                    className="size-full object-cover" />
                {editing && (
                    <EditArea />
                )}
            </div>
        )
    }

    function OrganizationMetadata() {
        return (
            <div>
                <div className="text-lg inter font-extrabold">Society of Information Technology Enthusiasts (SITE) [max lines: 3]</div>
                <div className="text-sm">210 members</div>
            </div>
        )
    }

    function PhotoScrollArea() {
        const photos = pageData.find(data => data.type === 'photos').data;

        return (
            <div className="h-52 md:h-80 w-full flex flex-row overflow-x-auto gap-x-6 pb-1">
                {photos.map((photo, index) => (
                    <Dialog key={index}>
                        <DialogTrigger className="contents">
                            <div className="h-full flex-shrink-0 relative rounded-xl overflow-clip">
                                <img src={photo.src}
                                    className="h-full object-cover"
                                    alt={photo.caption} />
                                <div className="absolute bottom-0 top-52 left-0 right-0 bg-gradient-to-b from-transparent to-black text-white px-9 flex items-center quicksand font-bold tracking-wide">
                                    <span className="line-clamp-3">{photo.caption}</span>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className='max-w-5xl'>
                            <DialogHeader>
                                <DialogTitle>{photo.caption}</DialogTitle>
                            </DialogHeader>
                            <img src={photo.src} className="w-full h-auto" alt={photo.caption} />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        )
    }

    function Tile({ children, className, name, id }) {
        return (
            <div className={`w-full bg-white p-4 md:p-7 rounded-lg flex flex-col ${className} space-y-1 relative`} id={id}>
                <div className="poppins text-lg font-extrabold">
                    {name}
                </div>
                <div className="w-full block">
                    {children}
                </div>
                {editing && (
                    <EditArea />
                )}
            </div>
        )
    }

    function ContactsContainer() {
        const data = pageData.find(data => data.type === 'contacts').data;

        const platformIcons = {
            email: <IconMailFilled />,
            instagram: <IconInstagram />,
            facebook: <IconFacebookRoundFilled />,
            x: <IconX />,
            linkedin: <IconLinkedIn />,
        }

        return (
            <ul className="w-full space-y-2 pl-2">
                {data.map((contact, index) => (
                    <li key={index} className="flex items-center quicksand">
                        <div>{platformIcons[contact.platform]}</div>
                        <a className="ml-3 truncate flex-1 hover:text-blue-600 hover:underline" href={contact.address}>{contact.address}</a>
                    </li>
                ))}
            </ul>
        )
    }

    function OfficersContainer() {
        const officers = pageData.find(page => page.type === 'officers').data;

        return (
            <ul className="w-full space-y-2 pl-2">
                {officers.map((officer, index) => (
                    <li key={index} className="flex items-center">
                        <span className="mr-3">•</span>
                        <div>
                            <div className="nunito font-extrabold text-lg">{officer.name}</div>
                            <div className="-mt-1 quicksand text-sm">{officer.position}</div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Home
