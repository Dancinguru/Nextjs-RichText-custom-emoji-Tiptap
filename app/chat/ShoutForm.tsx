"use client";

import { useFormState } from "react-dom";
import { FormState, createTodoAction } from "./action";
import { LoadMoreButton } from "../components/loadMoreButton";
import { lazy, useRef, useState } from "react";
import ReactDOMServer from 'react-dom/server';

// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import RichText from "../components/RichText";
const factoryEditModal = () => import("../components/EditModal");
const EditModal = lazy(factoryEditModal);
const factoryDeleteModal = () => import("../components/DeleteModal");
const DeleteModal = lazy(factoryDeleteModal);
// const factoryEmojiPicker = () => import("../components/EmojiPicker");
// const EmojiPicker = lazy(factoryEmojiPicker);
// let value: string;
// let temop: string;
export function ShoutForm({ type, id }) {
  const form = useRef<HTMLFormElement | null>(null);
  const [showEdit, setShowEditModal] = useState(false);
  const [showDelete, setShowDeleteModal] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  let textVal = "";
  async function submit(previousState: FormState, formData) {
    if (form.current) {
      debugger;
      form.current.reset();
    }
    return await createTodoAction(previousState, formData);
  }

  // const setTextAreaPost = (postion) => {
  //   if (form.current) {
  //     form.current.selectionStart = postion;
  //     form.current.selectionEnd = postion;
  //     form.current.focus();
  //   }
  // };
  // const setComment = (val) => {
  //   if (form.current) {
  //     let myField: any = document.getElementById("comment");
  //     myField.value = val;
  //   }
  // };

  // const addEmoji = (e) => {
  //   debugger;
  //   let sym = e.unified.split("-");
  //   let codesArray = [];
  //   // @ts-ignore comment
  //   sym.forEach((el) => codesArray.push("0x" + el));
  //   let emoji = String.fromCodePoint(...codesArray);
  //   //  SO here we have the event of the emoji being selected, just need to append to value in text area!

  //   let myField: any = document.getElementById("comment");
  //   if (document["selection"]) {
  //     debugger;
  //     myField.focus();
  //     let sel = document["selection"].createRange();
  //     sel.text = emoji;
  //   }
  //   //MOZILLA and others
  //   else if (myField["selectionStart"] || myField["selectionStart"] == "0") {
  //     debugger;
  //     var startPos = myField["selectionStart"];
  //     var endPos = myField["selectionEnd"];
  //     myField["value"] =
  //       myField["value"].substring(0, startPos) +
  //       emoji +
  //       myField["value"].substring(endPos, myField["value"].length);
  //     // Set cursor position after updating textarea value
  //     setTextAreaPost(startPos + emoji.length);
  //     myField.focus();
  //     myField.setSelectionRange(startPos + 2, startPos + 2);
  //   } else {
  //     debugger;
  //     myField["value"] += emoji;
  //   }
  // };
  const [comment, setComment] = useState(
    ReactDOMServer.renderToString(
    <div>
      <h1>this is h1...</h1>
      <h2>this is h2...</h2>
      <p>this is p...</p>
      <p><strong>this is bold...</strong></p>
    </div>
  ));

  const [formState, wrappedCreateTodoAction] = useFormState(submit, {
    text: "",
    errors: {
      text: undefined,
    },
  } as FormState);  

  const saveMessage = (message) => {
    setComment(message);
  }
  const removeMessage = (message) => {
    debugger;
    setComment(
      ReactDOMServer.renderToString(
        <>
        </>
      )
    )
  }
  return (
    <div>
      <form action={wrappedCreateTodoAction} ref={(f) => (form.current = f)}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="type" value={type} />
        {/* <textarea
          id="comment"
          name="comment"
          rows={3}
          className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-lg placeholder-gray-300 focus:border-current focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-900"
          placeholder={"Write a comment..."}
          defaultValue={""}
          required={true}
        ></textarea> */}
        <RichText />
        {formState.errors.text && (
          <div className="text-red-400">{formState.errors.text}</div>
        )}

        <LoadMoreButton text="Submit" />
      </form>
      <div className="md:ml-2 mt-3">
        <button
          className="flex items-center justify-center text-white sm:px-1 md:px-4 py-1 flex-shrink-0"
          onClick={(e) => {
            debugger;
            e.preventDefault();
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
          </div>
      <div className="md:ml-2 mt-3">
      
        <button
          className="flex items-center justify-center text-white sm:px-1 md:px-4 py-1 flex-shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteModal(true);
          }}
        >
          Remove
        </button>
      </div>
      {/* <div className="mt-3 md:ml-2"> */}
      {/* <button
          className="flex flex-shrink-0 items-center justify-center py-1 text-white sm:px-1 md:px-4"
          onClick={(e) => {
            e.preventDefault();
            // setShowEmojis(true);
          }}
        > */}
      {/* <EmojiPicker
        show={showEmojis}
        addEmoji={addEmoji}
        setShowEmojis={setShowEmojis}
      /> */}

      {/* </button> */}
      {/* </div> */}
      <EditModal show={showEdit} setShow={setShowEditModal} message={comment} saveMessage={saveMessage}/>
      <DeleteModal show={showDelete} setShow={setShowDeleteModal} message={comment} removeMessage={removeMessage}/>
    </div>
  );
}
