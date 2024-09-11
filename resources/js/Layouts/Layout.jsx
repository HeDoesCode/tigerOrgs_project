import Footer from "@/Components/Footer";
import Logo from "@/Components/Logo";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";

function Layout({
    children,
    sidebar,
    headerContent,
    bgImage,
    footer,
    noPadding,
}) {
    const { toast } = useToast()
    const { flash } = usePage().props
    useEffect(() => {
        if (flash.toast) {
            toast(flash.toast)
        }
    }, [flash.toast])

    const bgStyle = {
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <>
            <div
                className={`${sidebar && "pl-0 sm:pl-16"
                    } flex mx-auto select-none max-w-[1920px]`}
            >
                <Header />
                <div className="z-50">{sidebar}</div>
                <main
                    className={`w-full overflow-x-clip overflow-y-auto h-screen ${noPadding ? "pt-16" : "pt-[4.5rem]"
                        } ${noPadding || "px-4"} select-text flex flex-col`}
                    style={bgImage ? bgStyle : {}}
                >
                    {children}
                    {footer && <Footer />}
                </main>
            </div>
            <Toaster className='z-[+1]' />
        </>
    );

    function Header() {
        return (
            <div className="relative">
                <div
                    className={`fixed left-0 right-0 top-0 flex flex-row items-center justify-between space-x-2 h-16 ${sidebar && 'pl-16'
                        }
                     bg-[#EEEEEE] px-4 border-gray-400 border-b-[1px] z-40`}
                >
                    <Link className="contents" href="/">
                        <Logo className={sidebar && "ml-2"} />
                    </Link>
                    {headerContent}
                </div>
            </div>
        );
    }
}

export default Layout;
