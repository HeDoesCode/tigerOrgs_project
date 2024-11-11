import { Link } from "@inertiajs/react";
import IconSocialInstagram from "./Icons/Social/IconInstagram";
import IconFacebookRoundFilled from "./Icons/Social/IconFacebookRoundFilled";
import IconInstagram from "./Icons/Social/IconInstagram";

function Footer() {
    return (
        <div
            className={`min-h-36 mt-5 -mx-4 pt-10 pb-4 inter font-extralight text-sm bg-[#EEEEEE] flex justify-center`}
        >
            <div className="flex space-x-2 mx-10 sm:mx-24 md:mx-52 border-gray-300 border-t-[1px] pt-3 pb-5 w-full max-w-[70rem] h-fit">
                <div className="flex-1">
                    <p className="leading-6">
                        {/* No Copyright 2024 © TigerOrgs Project <br /> */}
                        Property of the{" "}
                        <a
                            href="https://manila.ust.edu.ph/osawebapp/home"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            UST Office for Student Affairs.
                        </a>
                        <br />
                        <br />
                        <a
                            className="text-xs text-slate-400 underline"
                            href="https://www.google.com/maps/place/Tan+Yan+Kee+Student+Center/@14.6105927,120.9863906,17z/data=!4m10!1m2!2m1!1sRoom+212+2nd+Floor,+UST+Tan+Yan+Kee+Student+Center,+University+of+Santo+Tomas,+Espa%C3%B1a+Blvd.,+Sampaloc,+Manila+Philippines+1015.!3m6!1s0x3397b60071fcebb3:0xfdfb6b896ebe80db!8m2!3d14.61138!4d120.9883517!15sCoABUm9vbSAyMTIgMm5kIEZsb29yLCBVU1QgVGFuIFlhbiBLZWUgU3R1ZGVudCBDZW50ZXIsIFVuaXZlcnNpdHkgb2YgU2FudG8gVG9tYXMsIEVzcGHDsWEgQmx2ZC4sIFNhbXBhbG9jLCBNYW5pbGEgUGhpbGlwcGluZXMgMTAxNS6SAQ1zdHVkZW50X3VuaW9u4AEA!16s%2Fg%2F1tdyn9mg?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Room 212 2nd Floor, UST Tan Yan Kee Student Center,
                            University of Santo Tomas, España Blvd., Sampaloc,
                            Manila Philippines 1015.
                        </a>
                    </p>
                </div>
                <div className="flex flex-col w-min">
                    <ul>
                        <li>
                            <SocialLink
                                icon={<IconFacebookRoundFilled size="100%" />}
                                text={"USTOSAOfficial"}
                                href={
                                    "https://www.facebook.com/USTOSAOfficial/"
                                }
                            />
                        </li>
                        <li>
                            <SocialLink
                                icon={
                                    <img
                                        src="/OSA logo.png"
                                        className="rounded-full border border-slate-500"
                                    />
                                }
                                text={"ust.edu.ph"}
                                href={
                                    "https://www.ust.edu.ph/administrative-offices/office-for-student-affairs/"
                                }
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

    function SocialLink({ icon, text, href, customSize }) {
        return (
            <a
                className="space-x-2 flex items-center text-[#333333] py-2 px-3 hover:underline hover:bg-gray-300 rounded-xl"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={customSize || "size-6"}>{icon}</div>
                <span>{text}</span>
            </a>
        );
    }
}

export default Footer;
