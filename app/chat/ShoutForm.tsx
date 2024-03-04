"use client";

import { useFormState } from "react-dom";
import { FormState, createTodoAction } from "./action";
import { LoadMoreButton } from "../components/loadMoreButton";
import { lazy, useRef, useState } from "react";

// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import RichText from "../components/RichText";
// const factoryEmojiPicker = () => import("../components/EmojiPicker");
// const EmojiPicker = lazy(factoryEmojiPicker);
// let value: string;
// let temop: string;
export function ShoutForm({ type, id }) {
  const form = useRef<HTMLFormElement | null>(null);

  const [showEmojis, setShowEmojis] = useState(false);

  let textVal = "";
  async function submit(previousState: FormState, formData) {
    if (form.current) {
      form.current.reset();
    }
    return await createTodoAction(previousState, formData);
  }
  const setTextAreaPost = (postion) => {
    if (form.current) {
      form.current.selectionStart = postion;
      form.current.selectionEnd = postion;
      form.current.focus();
    }
  };
  const setComment = (val) => {
    if (form.current) {
      let myField: any = document.getElementById("comment");
      myField.value = val;
    }
  };

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

  const [formState, wrappedCreateTodoAction] = useFormState(submit, {
    text: "",
    errors: {
      text: undefined,
    },
  } as FormState);

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
      {/* <div className="md:ml-2 mt-3">
        <button
          className="flex items-center justify-center text-white sm:px-1 md:px-4 py-1 flex-shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowEmojis(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              opacity=".45"
              fill="#263238"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            ></path>
          </svg>
        </button>
      </div> */}
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
    </div>
  );
}
