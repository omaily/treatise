'use client'
import React, {useEffect, useRef} from 'react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-go"

// const loadLanguages = require('prismjs/components/');
// loadLanguages(['puthon']);

export default function Code({
    language,
    code,
} : {
    language: string,
    code: string,
}) {
    const ref = useRef<HTMLPreElement>(null)
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className='Code'>
            <pre ref={ref}>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}