import React from "react";

export function useClipboard(
    styles?: React.CSSProperties
): [React.ComponentType, (toCopy: string) => void] {
    const clipboardRef = React.useRef<HTMLTextAreaElement>();
    const copy = React.useCallback(
        (toCopy: string) => {
            if (clipboardRef.current) {
                clipboardRef.current.textContent = toCopy;
                clipboardRef.current.select();
                clipboardRef.current.setSelectionRange(0, 99999);
                document.execCommand("copy");
            }
        },
        [clipboardRef]
    );
    return [() => <textarea style={styles} ref={clipboardRef} />, copy];
}
