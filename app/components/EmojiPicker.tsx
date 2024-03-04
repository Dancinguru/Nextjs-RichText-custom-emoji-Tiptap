import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Modal from "./modal";
import { useState } from "react";

interface EmojiMartProps {
  show: boolean;
  addEmoji: (any) => void;
  setShowEmojis: (boolean) => void;
}

const EmojiPicker: React.FC<EmojiMartProps> = ({
  show,
  addEmoji,
  setShowEmojis,
}) => {
  // Initialize frequently emoji
  const emojiPicker = (e) => {
    addEmoji(e);
  };

  return (
    <>
      <Modal show={show} setShow={setShowEmojis}>
        <Picker
          id="emojiPicker"
          data={data}
          perLine={8}
          onEmojiSelect={emojiPicker}
          onClickOutside={(e) => {
            e.preventDefault();
            setShowEmojis(false);
          }}
        />
      </Modal>
    </>
  );
};

React.createElement("div", {}, "Children");

export default EmojiPicker;
