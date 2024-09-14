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
import Pre from "../Pre";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

function KeywordSelect({ keywords, className, activeUserKeywords }) {

    keywords = handleSortKeywords(keywords);
    // console.log(activeUserKeywords)

    // const sortedKeywords = handleSortKeywords(keywords);

    function handleSortKeywords(array) {
        return array.sort((a, b) => a.keyword.localeCompare(b.keyword));
    }

    const [activeKeywords, setActiveKeywords] = useState([]);
    const [keywordBank, setKeywordBank] = useState([]);
    const [updateButtonVisible, setUpdateButtonVisible] = useState(false);

    useEffect(() => {
        resetKeywords();
        // setUpdateButtonVisible(activeKeywords !== activeUserKeywords);
    }, []);

    useEffect(() => {
        setUpdateButtonVisible(activeKeywords !== activeUserKeywords);
    }, [activeKeywords])

    const resetKeywords = () => {
        setActiveKeywords(activeUserKeywords);

        const filteredKeywords = keywords.filter(
            keywordObj => !activeUserKeywords.some(
                activeKeywordObj => activeKeywordObj.keyword === keywordObj.keyword
            )
        );

        setKeywordBank(filteredKeywords);
    }

    const [keywordFilter, setKeywordFilter] = useState('');

    // Every type in search sorts keywordBank
    const handleSearchChange = (e) => {
        setKeywordFilter(e.target.value);

        if (e.target.value === '' || e.target.value === null) {
            setKeywordBank(handleSortKeywords(keywordBank));
            return;
        }

        const filteredKeywords = keywordBank
            .filter(item =>
                item.keyword.toLowerCase().includes(e.target.value.toLowerCase())
            )
            .sort((a, b) => {
                const keywordFilterLower = e.target.value.toLowerCase();
                const aKeyword = a.keyword.toLowerCase();
                const bKeyword = b.keyword.toLowerCase();

                const aStartsWith = aKeyword.startsWith(keywordFilterLower) ? 0 : 1;
                const bStartsWith = bKeyword.startsWith(keywordFilterLower) ? 0 : 1;

                if (aStartsWith !== bStartsWith) {
                    return aStartsWith - bStartsWith;
                }

                return aKeyword.indexOf(keywordFilterLower) - bKeyword.indexOf(keywordFilterLower) ||
                    aKeyword.localeCompare(bKeyword);
            });

        const nonMatchingKeywords = keywordBank.filter(item =>
            !item.keyword.toLowerCase().includes(e.target.value.toLowerCase())
        ).sort((a, b) => a.keyword.localeCompare(b.keyword));

        setKeywordBank([...filteredKeywords, ...nonMatchingKeywords]);
    };

    const enableKeyword = (item) => {
        // add to active
        const sortedItems = handleSortKeywords([...activeKeywords, item]);

        setActiveKeywords(sortedItems);

        // remove from bank
        setKeywordBank((prevKeywordBank) => {
            return prevKeywordBank.filter(prevItem => prevItem.keyID !== item.keyID)
        });
    }

    const disableKeyword = (item) => {
        // return to bank
        const tempKeywordBank = [item, ...keywordBank];
        setKeywordBank(handleSortKeywords(tempKeywordBank));

        // remove from active
        setActiveKeywords((prevKeywordBank) => {
            return prevKeywordBank.filter(prevItem => prevItem.keyID !== item.keyID)
        });
    }

    const updateUserKeywords = () => {
        router.patch(route('update.user.keywords'), {
            activeKeywords
        });
    }

    return (
        <div className={`w-full flex flex-wrap gap-2 min-h-10 border-[1px] rounded-md p-2 relative text-xs overflow-clip group ${className}`}>
            <Dialog>
                <DialogTrigger className="absolute size-full inset-0">
                    <div className="size-full flex items-center justify-center invisible group-hover:visible group-hover:!bg-gray-800/70 text-black/0 group-hover:!text-white transition-all duration-200 ease-in-out">
                        {activeKeywords && 'Edit' || 'Add'}&nbsp;Keyword Filters
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[32rem] !h-fit max-h-[90%] w-[90%] sm:h-auto overflow-y-auto select-none">
                    <DialogHeader>
                        <DialogTitle>
                            Add/Remove Keyword Filters
                        </DialogTitle>
                        <DialogDescription className='!-mb-3'>
                            Filter organizations by adding or removing keywords. Save changes when you're done.
                            <span className={`text-red-500 font-bold ${updateButtonVisible ? 'visible' : 'invisible'}`}><br />You have unsaved changes.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-x-3">
                        <input className="w-full rounded-md" type="text" autoComplete="off" placeholder="Find Keywords..." name="keyword_filter" onChange={handleSearchChange} value={keywordFilter} />
                        <button onClick={resetKeywords} className="h-full px-3 border border-black rounded-md hover:bg-gray-800 hover:text-white transition-all">Reset</button>
                    </div>
                    <div className="w-full flex flex-wrap justify-center sm:justify-start gap-2 border-[1px] rounded-md border-gray-800 p-2 relative text-xs overflow-clip">
                        {activeKeywords.length !== 0 && activeKeywords.map((item, index) => (
                            <EditableKeywordTile key={index} name={item.keyword} remove onClick={() => disableKeyword(item)} />
                        ))}
                        {activeKeywords.length === 0 && (
                            <div className="pl-1 h-8 flex items-center">(No Keywords Selected)</div>
                        )}
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
                        {keywordBank.map((item, index) => (
                            <EditableKeywordTile key={index} name={item.keyword} add onClick={() => enableKeyword(item)} />
                        ))}
                    </div>
                    {updateButtonVisible && (
                        <DialogClose asChild>
                            <div className="w-full flex justify-end space-x-3">
                                <div className="text-red-500 font-bold my-auto">
                                    You have unsaved changes.
                                </div>
                                <Button
                                    type="button"
                                    className='bg-transparent hover:!bg-gray-800 text-black hover:!text-white border border-black w-fit'
                                    onClick={updateUserKeywords}
                                >
                                    Update
                                </Button>
                            </div>
                        </DialogClose>
                    )}
                </DialogContent>
            </Dialog>
            {activeUserKeywords.length !== 0
                ? activeUserKeywords.map((item, index) => (
                    <KeywordTile key={index} name={item.keyword} />
                ))
                :
                <div className="text-gray-500 my-auto flex items-center">
                    (None Selected. We'll use this to recommend organizations to you.)
                </div>
            }
        </div>
    )

    function KeywordTile({ name }) {
        return <div className="w-min px-2 py-1 bg-[#ffb700] border border-gray-300 h-fit rounded-md cursor-pointer whitespace-nowrap">{name}</div>
    }

    function EditableKeywordTile({ name, remove, add, ...props }) {
        return (
            <button {...props} className={`select-none w-min px-2 py-1 ${add && 'bg-gray-200'} ${remove && 'bg-[#ffb700]'} border border-gray-300 h-8 rounded-md space-x-2 flex items-center ${add && 'hover:bg-gray-300'} ${remove && 'hover:bg-[#e6a70b]'} group`}>
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

export default KeywordSelect
