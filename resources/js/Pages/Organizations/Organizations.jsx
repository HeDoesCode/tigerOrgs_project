import IconSearch from "@/Components/Icons/IconSearch";
import UserLayout from "@/Layouts/UserLayout"
import { Link, Head } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"

import { Button } from "@/Components/ui/button"

function Organizations() {
    return (
        <div className="w-full">
            <Head title="Browse Organizations" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">Browse <span className="text-[#ffb700]">Organizations</span></div>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* control panel */}
                    <div className="flex flex-col w-64 space-y-5 h-full">
                        <ControlContainer className='relative' name='Search'>
                            <input type="text" className="peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-12 pl-10 focus:pl-3 transition-all duration-200" />
                            <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                                <IconSearch size='22' />
                            </div>
                        </ControlContainer>

                        <ControlContainer name='Keywords'>
                            <ControlKeywords />
                        </ControlContainer>


                        <ControlContainer name='Category'>
                            <Select>
                                <SelectTrigger className="w-full h-12 border-gray-500 bg-transparent">
                                    <SelectValue placeholder="-- Browse Categories --" />
                                </SelectTrigger>
                                <SelectContent className='border-gray-500 bg-[#EEEEEE] quicksand'>
                                    <SelectItem value="light" className='hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10'>University-Wide</SelectItem>
                                    <SelectItem value="dark" className='hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10'>CICS</SelectItem>
                                </SelectContent>
                            </Select>
                        </ControlContainer>

                        <ControlContainer>
                            <ul className="bg-transparent flex flex-col py-3 rounded-md space-y-4">
                                <OrgJoined
                                    icon='https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011'
                                    title='Office for Student Affairs'
                                    isSuperAdmin
                                />

                            </ul>
                        </ControlContainer>

                        <ControlContainer name='Your&nbsp;Organizations'>
                            <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-4">
                                <OrgJoined
                                    icon='https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011'
                                    title='Fotomasino'
                                    isAdmin
                                />
                                <OrgJoined
                                    icon='https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44'
                                    title='UST Mountaineering Club'
                                />
                            </ul>
                        </ControlContainer>
                    </div>

                    {/* orgs panel */}
                    <div className="md:flex-1 overflow-x-hidden">
                        <OrgContainerRow title='Suggested based on your interests'>
                            <OrganizationTile
                                orgBg={'https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011'}
                                title='Fotomasino 1'
                                desc='The Thomasian Photographers Guild'
                                href='#Fotomasino'
                            />
                            <OrganizationTile
                                orgBg={'https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44'}
                                title='UST Mountaineering Club'
                                desc='With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!'
                                isRecruiting
                            />
                        </OrgContainerRow>
                        <OrgContainerRow title='Suggested based on your interests'>
                            <OrganizationTile
                                orgBg={'https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011'}
                                title='Fotomasino 1'
                                desc='The Thomasian Photographers Guild'
                                href='#Fotomasino'
                            />
                            <OrganizationTile
                                orgBg={'https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44'}
                                title='UST Mountaineering Club'
                                desc='With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!'
                                isRecruiting
                            />
                        </OrgContainerRow>
                        <OrgContainerRow title='Suggested based on your interests'>
                            <OrganizationTile
                                orgBg={'https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011'}
                                title='Fotomasino 1'
                                desc='The Thomasian Photographers Guild'
                                href='#Fotomasino'
                            />
                            <OrganizationTile
                                orgBg={'https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1'}
                                orgIcon={'https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44'}
                                title='UST Mountaineering Club'
                                desc='With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!'
                                isRecruiting
                            />
                        </OrgContainerRow>
                    </div>
                </div>
            </UserLayout>
        </div>
    );

    function ControlContainer({ name, children, className }) {
        return (
            <div className={`flex flex-col space-y-1 w-full ${className}`}>
                <span className="text-sm">{name}</span>
                {children}
            </div>
        )
    }

    function ControlKeywords({ keywordList }) {
        // keywordList = 1;
        // const availableKeywordsList = { 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'};
        return (
            <div className="w-full flex flex-wrap gap-2 max-h-20 min-h-10 border-[1px] rounded-md border-gray-500 p-2 relative text-xs overflow-clip group">
                <Dialog>
                    <DialogTrigger className="absolute size-full inset-0">
                        <div className="size-full flex items-center justify-center invisible group-hover:visible group-hover:!bg-gray-800 text-black/0 group-hover:!text-white transition-all duration-200 ease-in-out">
                            {keywordList && 'Edit' || 'Add'}&nbsp;Keyword Filters
                        </div>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                Add/Remove Keyword Filters
                            </DialogTitle>
                            <DialogDescription>
                                Filter organizations by adding or removing keywords. Save changes when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full flex flex-wrap gap-2 max-h-20 min-h-10 border-[1px] rounded-md border-gray-800 p-2 relative text-xs overflow-clip">
                            <EditableKeywordTile name='Tile&nbsp;1' remove />
                            <EditableKeywordTile name='Tile&nbsp;a#1' remove />
                            <EditableKeywordTile name='Ti&nbsp;#1' remove />
                            <EditableKeywordTile name='Tiasd&nbsp;#1' remove />
                        </div>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M18 11l-6 -6" />
                                <path d="M6 11l6 -6" />
                            </svg>
                        </div>
                        <div className="w-full flex flex-wrap gap-2 max-h-20 min-h-10 border-[1px] rounded-md border-gray-300 p-2 relative text-xs overflow-clip">
                            <EditableKeywordTile name='Tile&nbsp;1' add />
                            <EditableKeywordTile name='Tile&nbsp;a#1' add />
                            <EditableKeywordTile name='Ti&nbsp;#1' add />
                            <EditableKeywordTile name='Tiasd&nbsp;#1' add />
                        </div>
                        {/* <DialogFooter>
                            <Button type="submit" className='bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black'>Save changes</Button>
                        </DialogFooter> */}
                        <DialogClose asChild>
                            {/* <Button type="button" variant="secondary">
                                Close
                            </Button> */}
                            <div className="w-full flex justify-end">
                                <Button type="button" className='bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black w-fit'>Save changes</Button>
                            </div>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                <KeywordTile name='Tile&nbsp;1' />
                <KeywordTile name='Tile&nbsp;a#1' />
                <KeywordTile name='Ti&nbsp;#1' />
                <KeywordTile name='Tiasd&nbsp;#1' />
            </div>
        )

        function KeywordTile({ name }) {
            return <div className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-fit rounded-md cursor-pointer">{name}</div>
        }

        function EditableKeywordTile({ name, remove, add }) {
            return (
                <button className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-8 rounded-md space-x-2 flex items-center hover:bg-gray-300 group">
                    <span>{name}</span>
                    <div className="h-5 aspect-square text-gray-400 group-hover:text-gray-500">
                        {remove && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                            </svg>
                        )}
                        {add && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-plus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" />
                            </svg>
                        )}
                    </div>
                </button>
            )
        }
    }

    function OrgJoined({ icon, title, isAdmin, isSuperAdmin }) {
        return (
            <li className="flex items-center space-x-3 poppins">
                <img
                    src={icon}
                    className="size-10 object-cover rounded-full"
                />
                <label className="flex-1 text-sm font-bold line-clamp-2 leading-4">{title}</label>
                {(isAdmin || isSuperAdmin) &&
                    <label className="bg-red-600 text-white text-[0.6rem] px-[0.35rem] rounded-full">{(isAdmin && 'Admin') || (isSuperAdmin && 'S.Admin')}</label>
                }
            </li>
        )
    }

    function OrgContainerRow({ children, title, className }) {
        return (
            <div className={`flex flex-col space-y-3 w-full ${className}`}>
                <div className="flex flex-row justify-between -mb-3">
                    <div className="questrial font-bold tracking-wider">{title}</div>
                    <div className="w-20 relative overflow-visible">
                        <button className="absolute right-0 min-w-max underline text-sm py-1 px-2 text-gray-500 hover:bg-gray-800 hover:text-white rounded-lg">show all</button>
                    </div>
                </div>
                <div className="flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden">
                    {children}
                </div>
            </div>
        )
    }


    function OrganizationTile({ orgBg, orgIcon, title, desc, isRecruiting, href, className }) {
        const hideImage = () => {
            this.style.display = "none";
        };

        return (
            <Link href={href} className={`w-min space-y-2 hover:cursor-pointer group p-3 hover:scale-[1.06] flex flex-col justify-center items-center transition-all duration-300 ease-in-out transOptimize h-max select-none ${className}`}>
                <div className="h-52 md:h-72 aspect-[5/8] relative">
                    <img src={orgBg} className="object-cover h-full rounded-lg shadow-sm" alt={orgBg} onError={hideImage} />
                    {isRecruiting && <div className="absolute left-1/2 -translate-x-1/2 top-3 text-[0.6rem] px-2 py-[0.15rem] rounded-[0.25rem] bg-[#EF9B1E]/90 inter font-extrabold text-white shadow-sm shadow-black/50">Now&nbsp;Recruiting</div>}
                    <img src={orgIcon} className="absolute right-2 bottom-2 bg-[#EEEEEE] size-14 rounded-full object-cover" />
                    <div className="transition-all hidden md:flex flex-col justify-center duration-200 ease-in-out absolute inset-0 bg-black/0 overflow-y-auto group-hover:bg-black/70 invisible group-hover:visible group-hover:delay-100 rounded-lg text-white/0 group-hover:text-white/100 p-3 tracking-wide transOptimize">
                        <p className="poppins tracking-normal md:tracking-wide text-sm md:text-lg">{title}</p>
                        <p className="quicksand font-extralight text-sm overflow-hidden overflow-ellipsis">{desc}</p>
                    </div>
                </div>
                {/* hover replacement */}
                <div className="space-y-1">
                    <div className="w-full line-clamp-2 poppins text-sm font-bold tracking-wide">{title}</div>
                    <div className="w-full text-xs line-clamp-2">{desc}</div>
                    <div className="w-full text-xs line-clamp-1 text-gray-600 truncate">#### Followers</div>
                </div>
            </Link>
        )
    }
}

export default Organizations
