import React from 'react';

interface AccordionProps {
    children: React.ReactNode;
}

export const Accordion = ({ children }: AccordionProps) => {
    return <div className="w-full">{children}</div>;
};

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
}

export const AccordionItem = ({ title, children, isOpen, onToggle }: AccordionItemProps) => {
    return (
        <div className="overflow-hidden">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full p-4 text-left font-medium bg-slate-700 hover:bg-slate-600 transition-colors border-b border-solid border-slate-600"
            >
                <span className="text-lg">{title}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="">{children}</div>
            </div>
        </div>
    );
};