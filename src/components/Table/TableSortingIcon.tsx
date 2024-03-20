import React from 'react';

type SortingIconProps = {
    direction: 'asc' | 'desc' | null;
};

const SortingIcon: React.FC<SortingIconProps> = ({direction}) => {
    return (
        <>
            {direction === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 ml-1" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 10l-4-4m0 0l-4 4m4-4v12"/>
                </svg>
            ) : direction === 'desc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 ml-1" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 14l-4 4m0 0l-4-4m4 4V6"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 ml-1" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                </svg>
            )}
        </>
    );
};

export default SortingIcon;
