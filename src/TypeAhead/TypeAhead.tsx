import React, { ChangeEvent, useState } from "react";
import "./TypeAhead.scss";

interface Suggestion {
    title: string
}

interface TypeAheadProps {
    // styles applied to root element
    className?: string;
    // placeholder text
    placeholder?: string;
    // error message text
    error?: string;
    // suggestion 
    suggestionList: Suggestion[];
    // on input change
    onSearchKeyChange: (query: string) => void;
    // on select
    onSelect: (item: Suggestion) => void
    // loading status
    loading: boolean;
}

function TypeAhead({
    className,
    error,
    placeholder = "search...",
    suggestionList = [],
    onSearchKeyChange,
    onSelect,
    loading = false
}: TypeAheadProps) {

    const [searchKey, setSearchKey] = useState("");
    const [selected, setSelected] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);
    const [isOverlayOpen, setOverlayOpen] = useState(false);

    const searchKeyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value);
        setOverlayOpen(true);
        onSearchKeyChange(event.target.value);
    }

    const handleSelect = (item: Suggestion) => {
        setSearchKey(item.title);
        setSelected(true);
        onSelect(item);
        setOverlayOpen(false);
    }

    const handlerClear = () => {
        setSearchKey("");
        setSelected(false);
        setOverlayOpen(false);
        setFocusIndex(0);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "ArrowDown"){
            console.log("Arrow Down");
            setFocusIndex(prevIndex => prevIndex < suggestionList.length - 1 ? prevIndex + 1 : 0);
        }else if(event.key === "ArrowUp"){
            console.log("Arrow Up");
            setFocusIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : suggestionList.length - 1);
        }else if(event.key === "Enter"){
            console.log("Enter");
            if(focusIndex > 0 && suggestionList[focusIndex]){
                handleSelect(suggestionList[focusIndex]);
            }
        }else if(event.key === "Escape"){
            console.log("Escape");
            setOverlayOpen(false);
        }
    };

    return (<div className="elm-type-ahead-root">
        <div className="container">
            <input
                type="text"
                value={searchKey}
                onChange={searchKeyHandler}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
            />
            {!loading && searchKey && 
                <button
                    onClick={handlerClear}
                    className="close-btn"
                    aria-label="Clear"
                >
                    &#x2715;
                </button>
            }
            {loading && <div className="loader-container">
                <div className="loader"></div>
            </div>}
            {!loading && isOverlayOpen && !selected && suggestionList.length > 0 &&
                <ul className="overlay">
                    {suggestionList
                        ?.map((item, index) => 
                            <li 
                                key={index}
                                onClick={()=> handleSelect(item)}
                                onMouseEnter={() => setFocusIndex(index)}
                                className={focusIndex === index ? "highlight" : ""}
                                >
                                {item.title}
                            </li>)
                    }
                </ul>
            }
            {error && <div className="message">Error Message</div>}
        </div>
    </div>);
}

export default TypeAhead;