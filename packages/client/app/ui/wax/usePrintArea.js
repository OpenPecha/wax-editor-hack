import { useState, useEffect } from 'react'



const usePrintArea = ({printRef, beforePrint, afterPrint }) => {

    const [isPrinting, toggleStatus] = useState(false);

    const printMq = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('print');
 
    let printRestore = null

    const defaultBeforePrint = () => {
        if (printRef.current) {
            const { body } = document;
            printRestore = body.children;

            printRestore.parentElement.removeChild(printRestore)
            document.body.innerHTML = 
            body.html(printContent.clone());
        }
        

    }

    const defaultAfterPrint = () => {

    }

    useEffect(() => {
        const printFn = mql => {
            toggleStatus(!!mql.matches);

            if (mql.matches) {
                beforePrint ? beforePrint() : defaultBeforePrint();
            } else {
                afterPrint ? afterPrint(): defaultAfterPrint();
            }
        }

        printMq.addListener(printFn);

        return () => printMq.removeEventListener(printFn)
    }, [])

    return isPrinting
}

export default usePrintArea
