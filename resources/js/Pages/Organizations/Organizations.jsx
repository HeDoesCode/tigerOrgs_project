import IconSearch from "@/Components/Icons/IconSearch";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import ControlContainer from "@/Components/Organizations/ControlContainer";
import ControlKeywords from "@/Components/Organizations/ControlKeywords";
import OrganizationJoined from "@/Components/Organizations/OrganizationJoined";
import OrganizationContainerRow from "@/Components/Organizations/OrganizationContainerRow";
import OrganizationTile from "@/Components/Organizations/OrganizationTile";

function Organizations() {
    return (
        <div className="w-full">
            <Head title="Browse Organizations" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Browse <span className="text-[#ffb700]">Organizations</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* control panel */}
                    <div className="flex flex-col w-full md:w-64 space-y-5">
                        <ControlContainer className="relative" name="Search">
                            <input
                                type="text"
                                className="peer p-3 bg-transparent outline-gray-800 text-gray-600 focus:text-black rounded-lg border-gray-500 h-12 pl-10 focus:pl-3 transition-all duration-200"
                            />
                            <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                                <IconSearch size="22" />
                            </div>
                        </ControlContainer>

                        <ControlContainer name="Keywords">
                            <ControlKeywords />
                        </ControlContainer>

                        <ControlContainer name="Category">
                            <Select>
                                <SelectTrigger className="w-full h-12 border-gray-500 bg-transparent">
                                    <SelectValue placeholder="-- Browse Categories --" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand"
                                    ref={(ref) => {
                                        if (!ref) return;
                                        ref.ontouchstart = (e) => e.preventDefault();
                                    }}
                                >
                                    <SelectItem
                                        value="light"
                                        className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        University-Wide
                                    </SelectItem>
                                    <SelectItem
                                        value="dark"
                                        className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        CICS
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </ControlContainer>

                        <ControlContainer>
                            <ul className="bg-transparent flex flex-col py-3 rounded-md space-y-4">
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                                    title="Office for Student Affairs"
                                    isSuperAdmin
                                    link={route("superadmin.status")}
                                />
                            </ul>
                        </ControlContainer>

                        <ControlContainer name="Your&nbsp;Organizations">
                            <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-1">
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                                    title="Fotomasino"
                                    isAdmin
                                    link={route("admin.editpage")}
                                />
                                <OrganizationJoined
                                    icon="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                                    title="UST Mountaineering Club"
                                />
                            </ul>
                        </ControlContainer>
                    </div>

                    {/* orgs panel */}
                    <div className="md:flex-1 space-y-3 overflow-x-hidden">
                        <OrganizationContainerRow title="Suggested based on your interests">
                            <Test />
                        </OrganizationContainerRow>
                        <OrganizationContainerRow title="Suggested based on your interests">
                            <Test />
                        </OrganizationContainerRow>
                        <OrganizationContainerRow title="Suggested based on your interests">
                            <OrganizationTile
                                orgBg={
                                    "https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg"
                                }
                                orgIcon={
                                    "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                                }
                                title="Fotomasino 1"
                                desc="The Thomasian Photographers Guild"
                                href="#Fotomasino"
                            />
                            <OrganizationTile
                                orgBg={
                                    "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                                }
                                orgIcon={
                                    "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                                }
                                title="UST Mountaineering Club"
                                desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                                isRecruiting
                            />
                        </OrganizationContainerRow>
                    </div>
                </div>
            </UserLayout>
        </div>
    );

    function Test() {
        return (
            <>
                <OrganizationTile
                    orgBg={
                        "https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/379249269_872028557643589_7767519284231773085_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFZKMicf1CYVeO4tuXfLyje4vxiXiyaS5Pi_GJeLJpLkxoQdpaGhxXY4SmR3UK6qiMMC1rZpt805xAUxbdgvAMc&_nc_ohc=waaGroD6R1cQ7kNvgHtcHoo&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYAs3lfS3aOKI2arEPVOaRvbB6MUXpd7KTxLuOGdcKaJgA&oe=66C28011"
                    }
                    title="Fotomasino 1"
                    desc="The Thomasian Photographers Guild"
                    href={route('organizations.home', ['test'])}
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />
                <OrganizationTile
                    orgBg={
                        "https://i0.wp.com/www.up.edu.ph/wp-content/uploads/2018/07/page26-27-UPM-members-were-ready-to-take-the-ascent-going-to-the-Saulay-campsite-in-Mt.-Sicapoo2-photo-credit-to-Joyce-Belle-Dinglasan.jpg?resize=640%2C480&ssl=1"
                    }
                    orgIcon={
                        "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/304859676_483387727130522_6601973512956713736_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGFy0kra513HRBsdmazTlo6sOVdYkvlqTGw5V1iS-WpMb6gIP1OH-rT4NoBwfDEb7qyuyvhgUhx6ZUt5lPxUiNr&_nc_ohc=pcExyta6blMQ7kNvgHCXjUw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYD2e_GFVEEWc2AMJkj5Yaf0EtE70uaiZzT-dB3qBRB1Bg&oe=66C2AC44"
                    }
                    title="UST Mountaineering Club"
                    desc="With over 50 years of existence, The UST Mountaineering Club invites you in scaling the heights to conquer mountains and difficulties with your fellow mountaineers!"
                    isRecruiting
                />

            </>
        )
    }
}

export default Organizations;
