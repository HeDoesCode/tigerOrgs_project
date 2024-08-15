import IconSearch from "@/Components/Icons/IconSearch";
import UserLayout from "@/Layouts/UserLayout"
import { Link, Head } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"


function Organizations() {
    return (
        <div className="w-full">
            <Head title="Browse Organizations" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">Browse <span className="text-[#ffb700]">Organizations</span></div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col w-60 space-y-5">
                        <ControlContainer className='relative' name='Search'>
                            <input type="text" className="peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-12 pl-10 focus:pl-3 transition-all duration-200" />
                            <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                                <IconSearch size='22' />
                            </div>
                        </ControlContainer>

                        <ControlContainer name='Keywords'>
                            <div className="w-full h-36 flex flex-initial gap-2 o">
                                <span className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-fit">Tile&nbsp;1</span>
                                <span className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-fit">Tile&nbsp;a#1</span>
                                <span className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-fit">Ti&nbsp;#1</span>
                                <span className="w-min px-2 py-1 bg-gray-200 border border-gray-300 h-fit">Tiasd&nbsp;#1</span>
                            </div>
                        </ControlContainer>


                        <ControlContainer name='Category'>
                            <Select>
                                <SelectTrigger className="w-full h-12 border-gray-500 bg-transparent">
                                    <SelectValue placeholder="Choose Category" />
                                </SelectTrigger>
                                <SelectContent className='border-gray-500 bg-[#EEEEEE] quicksand'>
                                    <SelectItem value="light" className='hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10'>University-Wide</SelectItem>
                                    <SelectItem value="dark" className='hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10'>CICS</SelectItem>
                                </SelectContent>
                            </Select>
                        </ControlContainer>



                        <div>organizations joined</div>
                    </div>
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

    function OrgContainerRow({ children, title }) {
        return (
            <div className="flex flex-col space-y-3 w-full">
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


    function OrganizationTile({ orgBg, orgIcon, title, desc, isRecruiting, href }) {
        const hideImage = () => {
            this.style.display = "none";
        };

        return (
            <Link href={href} className="w-min space-y-2 hover:cursor-pointer group p-3 hover:scale-[1.06] flex flex-col justify-center items-center transition-all duration-300 ease-in-out transOptimize h-max select-none">
                <div className="h-52 md:h-72 aspect-[5/8] relative">
                    <img src={orgBg} className="object-cover h-full rounded-lg shadow-sm" alt={orgBg} onError={hideImage} />
                    {isRecruiting && <div className="absolute left-1/2 -translate-x-1/2 top-3 text-[0.6rem] px-2 py-[0.15rem] rounded-[0.25rem] bg-[#EF9B1E]/90 inter font-extrabold text-white shadow-sm shadow-black/50">Now&nbsp;Recruiting</div>}
                    <img src={orgIcon} className="absolute right-2 bottom-2 bg-[#EEEEEE] size-14 rounded-full object-cover" />
                    <div className="transition-all flex flex-col justify-center duration-200 ease-in-out absolute inset-0 bg-black/0 overflow-y-auto group-hover:bg-black/70 invisible group-hover:visible group-hover:delay-100 rounded-lg text-white/0 group-hover:text-white/100 p-3 tracking-wide transOptimize">
                        <p className="poppins tracking-wide">{title}</p>
                        <p className="quicksand font-extralight text-sm">{desc}</p>
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
