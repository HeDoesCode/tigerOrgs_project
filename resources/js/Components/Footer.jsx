import { Link } from "@inertiajs/react";
import IconSocialInstagram from "./Icons/Social/IconInstagram";
import IconFacebookRoundFilled from "./Icons/Social/IconFacebookRoundFilled";
import IconInstagram from "./Icons/Social/IconInstagram";

function Footer() {
    return (
        <div className={`min-h-36 mt-5 -mx-4 pt-10 pb-4 inter font-extralight text-sm bg-[#EEEEEE] flex justify-center`}>
            <div className="flex space-x-2 mx-10 sm:mx-24 md:mx-52 border-gray-300 border-t-[1px] pt-3 pb-5 w-full max-w-[70rem] h-fit">
                <div className="flex-1">
                    <p className="leading-6">No Copyright 2024 © TigerOrgs Project <br />
                        In partnership with the <Link><span className="underline">University of Santo Tomas</span></Link>.</p>
                </div>
                <div className="flex flex-col w-min">
                    <ul>
                        <li>
                            <SocialLink
                                icon={<IconFacebookRoundFilled size='100%' />}
                                text={'@ust.edu.ph'}
                                href={'facebook.com'}
                            />
                        </li>
                        <li>
                            <SocialLink
                                icon={<IconInstagram size='100%' />}
                                text={'@ust.edu.ph'}
                                href={'instagram.com'}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

    function SocialLink({ icon, text, href, customSize }) {
        return (
            <a className="space-x-2 flex items-center text-[#333333] py-2 px-3 hover:underline hover:bg-gray-300 rounded-xl" href={href}>
                <div className={customSize || "size-6"}>
                    {icon}
                </div>
                <span>{text}</span>
            </a>
        )
    }
}

export default Footer
