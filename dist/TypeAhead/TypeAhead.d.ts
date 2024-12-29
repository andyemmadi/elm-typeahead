import React from "react";
import "./TypeAhead.scss";
interface Suggestion {
    title: string;
}
interface TypeAheadProps {
    className?: string;
    placeholder?: string;
    error?: string;
    suggestionList: Suggestion[];
    onSearchKeyChange: (query: string) => void;
    onSelect: (item: Suggestion) => void;
    loading: boolean;
}
declare function TypeAhead({ className, error, placeholder, suggestionList, onSearchKeyChange, onSelect, loading }: TypeAheadProps): React.JSX.Element;
export default TypeAhead;
