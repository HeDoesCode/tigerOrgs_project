import IconDotsVertical from "./Icons/IconDotsVertical";
function DotsVertical({ onClick, className }) {
    return (
        <div className={`grid content-center ${className}`} onClick={onClick}>
            <div className="justify-self-center">
                <div className="size-8 hover:bg-gray-300 flex justify-center items-center rounded-full">
                    <IconDotsVertical />
                </div>
            </div>
        </div>
    );
}

export default DotsVertical;
