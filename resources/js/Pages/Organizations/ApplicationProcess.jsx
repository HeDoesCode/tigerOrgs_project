import IconClipboardText from "@/Components/Icons/IconClipboardText"
import IconChecklist from "@/Components/Icons/IconChecklist"
import OrganizationLayout from "@/Components/Organizations/OrganizationLayout"
import IconVideo from "@/Components/Icons/IconVideo"
import IconCopyCheck from "@/Components/Icons/IconCopyCheck"
import { Link } from "@inertiajs/react"

function ApplicationProcess({ pageLayoutData }) {
    pageLayoutData = [
        {
            type: "logo",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s",
        },
        {
            type: "coverPhoto",
            src: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/440157037_826883462808874_1884542927338964791_n.png?stp=dst-png_s960x960&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF-iHA5tGGTjllKkngWhNwzZBy86ZNOkCFkHLzpk06QIWlW9y_IZDIa9gnqO4TmlORRLq8_A0Bay2SPO8SKF0Om&_nc_ohc=wnM1T6HPwUQQ7kNvgHPD7_-&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYDCQrliXzWlGMjKz1N0123SJwpAXflH8hyNnkmRfjdB0Q&oe=66C65C2D",
        },
        {
            type: "metadata",
            metadata: {
                organizationName:
                    "Society of Information Technology Enthusiasts (SITE)",
                members: "210",
            },
        },
    ]


    return (
        <OrganizationLayout pageLayoutData={pageLayoutData}>
            <div className="flex flex-col max-w-xl mx-auto mt-12 space-y-9">
                <div className="poppins text-xl font-bold">Application Process Overview</div>
                <div className="flex flex-col relative gap-y-5">
                    <div className="absolute left-0 top-0 bottom-0 h-full w-20 flex justify-center py-[5%]">
                        <div className="h-full w-[0.15rem] bg-black"></div>
                    </div>
                    <Process icon={<IconClipboardText size='45' strokeWidth='1.3' />} title='Fill Application Form' details='Complete the application form, ensuring you read and follow all instructions.' status='done' />
                    <Process icon={<IconChecklist size='45' strokeWidth='1.3' />} title='Initial Review' details='(Optional) Administrators will review your submitted application form.' status='done' />
                    <Process icon={<IconVideo size='45' strokeWidth='1.3' />} title='Interview' details='(Optional) If required, you will receive an online meeting link for an interview.' status='skip'>
                        <button className="px-3 py-2 bg-[#04AA6D] text-white inter font-bold text-xs rounded-lg">View Meeting Link</button>
                    </Process>
                    <Process icon={<IconCopyCheck size='45' strokeWidth='1.3' />} title='Final Review' details='Your application will undergo a final screening process.' status='fail' >
                        <div className="px-3 py-2 bg-red-300 text-black inter font-bold text-xs rounded-lg">Unfortunately, you did not pass the final review. Thank you for your interest and effort.</div>
                    </Process>
                </div>
                <div className="w-full flex justify-center">
                    <Link className="px-4 py-2 inter font-bold text-sm rounded-full text-white bg-[#04AA6D]">Start Application Process</Link>
                </div>
            </div>
        </OrganizationLayout>
    )

    function Process({ title, details, status, children, icon }) {
        const statusColors = {
            done: 'bg-green-300',
            fail: 'bg-red-300',
        }

        return (
            <div className={`flex items-center space-x-5 ${status === 'skip' && 'text-gray-400'}`}>
                <div className={`size-20 min-w-20 rounded-full border-[0.15rem] ${status === 'skip' && 'border-gray-400' || 'border-black'} flex items-center justify-center z-10 ${status && statusColors[status] || 'bg-[#EEEEEE]'}`}>{icon}</div>
                <div className="flex flex-col">
                    <div className="questrial font-bold tracking-wide text-lg">{title}</div>
                    <div>{details}</div>
                    <div className="mt-1">{children}</div>
                </div>
            </div>
        )
    }

}

export default ApplicationProcess
