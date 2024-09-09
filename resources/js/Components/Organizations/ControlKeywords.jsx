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
import { useState } from "react"

function ControlKeywords({ keywords, className }) {
    // keywordList = 1;
    // const availableKeywordsList = { 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'};
    const [activeKeywords, setActiveKeywords] = useState({});
    const [keywordBank, setKeywordBank] = useState({ keywords });
    const [keywordFilter, setKeywordFilter] = useState('');
    const handleSearchChange = (e) => {
        setKeywordFilter(e.target.value);
        console.log(keywordFilter)
    };
    // console.log(keywordBank)
    return (
        <div className={`w-full flex flex-wrap gap-2 max-h-20 min-h-10 border-[1px] rounded-md border-gray-500 p-2 relative text-xs overflow-clip group ${className}`}>
            <Dialog>
                <DialogTrigger className="absolute size-full inset-0">
                    <div className="size-full flex items-center justify-center invisible group-hover:visible group-hover:!bg-gray-800 text-black/0 group-hover:!text-white transition-all duration-200 ease-in-out">
                        {keywords && 'Edit' || 'Add'}&nbsp;Keyword Filters
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[32rem] !h-[90%] w-[90%] sm:h-auto max-h-screen overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Add/Remove Keyword Filters
                        </DialogTitle>
                        <DialogDescription>
                            Filter organizations by adding or removing keywords. Save changes when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <input className="w-full rounded-md" type="text" placeholder="Search Keywords..." name="keyword_filter" onChange={handleSearchChange} />
                    </div>
                    <div className="w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-800 p-2 relative text-xs overflow-clip">
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
                    <div className="w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-300 p-2 relative text-xs">
                        {/* {keywordBank.map((item) => (
                            <EditableKeywordTile name={item.keyword} add />
                        ))} */}
                        {Object.entries(keywords).map(([keyID, keyword]) => (
                            <EditableKeywordTile key={keyID} keyID={keyID} name={keyword} add />
                        ))}
                        {/* <EditableKeywordTile name='Tile&nbsp;1' add />
                        <EditableKeywordTile name='Tile&nbsp;a#1' add />
                        <EditableKeywordTile name='Ti&nbsp;#1' add />
                        <EditableKeywordTile name='Tiasd&nbsp;#1' add /> */}
                    </div>
                    {/* <DialogFooter>
                        <Button type="submit" className='bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black'>Save changes</Button>
                    </DialogFooter> */}
                    <DialogClose asChild>
                        {/* <Button type="button" variant="secondary">
                            Close
                        </Button> */}
                        <div className="w-full flex justify-end">
                            <Button type="button" className='bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black w-fit'>Update</Button>
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
        return <div className="w-min px-2 py-1 bg-[#ffb700] border border-gray-300 h-fit rounded-md cursor-pointer">{name}</div>
    }

    function EditableKeywordTile({ name, remove, add }) {
        return (
            <button className={`w-min px-2 py-1 ${add && 'bg-gray-200'} ${remove && 'bg-[#ffb700]'} border border-gray-300 h-8 rounded-md space-x-2 flex items-center ${add && 'hover:bg-gray-300'} ${remove && 'hover:bg-[#e6a70b]'} group`}>
                <span className="whitespace-nowrap">{name}</span>
                <div className="h-5 aspect-square text-gray-400">
                    {remove && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x text-black/70">
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

export default ControlKeywords
