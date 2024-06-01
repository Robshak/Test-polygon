import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import styles from "./MyEditor.module.scss";

const MyEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleEditorChange = (newState: React.SetStateAction<EditorState>) => {
        setEditorState(newState);
    };

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const onToggleInlineStyle = (inlineStyle: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const onToggleBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const importHTML = () => {
        const html = prompt("Введите HTML-код:");
        if (html) {
            const contentState = stateFromHTML(html);
            setEditorState(EditorState.createWithContent(contentState));
        }
    };

    const exportHTML = () => {
        const contentState = editorState.getCurrentContent();
        const html = stateToHTML(contentState);
        alert("Экспортированный HTML:\n" + html);
    };

    return (
        <div>
            <div className={styles.toolbar}>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle("BOLD"); }}>Bold</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle("ITALIC"); }}>Italic</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleInlineStyle("UNDERLINE"); }}>Underline</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType("header-one"); }}>H1</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType("blockquote"); }}>Quote</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType("unordered-list-item"); }}>UL</button>
                <button onMouseDown={(e) => { e.preventDefault(); onToggleBlockType("ordered-list-item"); }}>OL</button>
                <button onClick={importHTML}>Импорт HTML</button>
                <button onClick={exportHTML}>Экспорт HTML</button>
            </div>
            <div className={styles.editorContainer}>
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={handleEditorChange}
                    placeholder="Начните вводить текст..."
                />
            </div>
        </div>
    );
};

export default MyEditor;
