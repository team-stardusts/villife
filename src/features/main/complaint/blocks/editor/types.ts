export type ComplaintEditorProps = {
    titleRef: React.MutableRefObject<string>;
    contentRef: React.MutableRefObject<string>;
    mode: "register" | "modify";
};
