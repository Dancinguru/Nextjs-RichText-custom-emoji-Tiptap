import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";

const modules = {
  toolbar: {
    container: [["bold", "italic"], ["emoji"]],
  },
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true,
};

export default ({message, setMessage}) => {
  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
    },
    true
  );

  const customBoldHandler = () => {
    console.log("clicked...");
  };

  return (
    <ReactQuill
      modules={{
        toolbar: {
          container: [
            [
              { header: "1" },
              { header: "2" },
              { header: [3, 4, 5, 6] },
              { font: [] },
            ],
            [{ size: [] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["emoji"],
            ["clean"],
            ["code-block"],
          ],
        },
        "emoji-toolbar": true,
        "emoji-shortname": true,
      }}
      theme="snow"
      value={message}
      onChange={setMessage}
    />
  );
};
