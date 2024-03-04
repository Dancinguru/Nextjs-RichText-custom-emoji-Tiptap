import "./css/richtext.css";
import "./css/material3.css";
import "./css/bootstrap.min.css";
import * as React from "react";
import { addClass, removeClass, Browser } from "@syncfusion/ej2-base";
import {
  RichTextEditorComponent,
  Toolbar,
  Inject,
  Image,
  Link,
  HtmlEditor,
  Count,
  QuickToolbar,
  Table,
  EmojiPicker,
  Video,
  Audio,
  FormatPainter,
} from "@syncfusion/ej2-react-richtexteditor";
import { FileManager } from "@syncfusion/ej2-react-richtexteditor";
import { createElement } from "@syncfusion/ej2-base";

import * as CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

function RichText({ editable, children }) {
  let rteObj;
  // Rich Text Editor items list
  const items = [
    "Bold",
    "Italic",
    "Underline",
    "StrikeThrough",
    "SuperScript",
    "SubScript",
    "|",
    "FontName",
    "FontSize",
    "FontColor",
    "BackgroundColor",
    "|",
    // "LowerCase",
    // "UpperCase",
    // "|",
    "Formats",
    "Alignments",
    "|",
    "NumberFormatList",
    "BulletFormatList",
    "|",
    "Outdent",
    "Indent",
    "|",
    "CreateLink",
    "Image",
    "Video",
    "Audio",
    "CreateTable",
    "|",
    // "FormatPainter",
    // "ClearFormat",
    // "|",
    "EmojiPicker",
    // "Print",
    // "|",
    // "SourceCode",
    // "FullScreen",
    "|",
    "Undo",
    "Redo",
  ];

  const quickToolbarSettings = {
    table: [
      "TableHeader",
      "TableRows",
      "TableColumns",
      "TableCell",
      "-",
      "BackgroundColor",
      "TableRemove",
      "TableCellVerticalAlign",
      "Styles",
    ],
  };
  //Rich Text Editor ToolbarSettings
  const toolbarSettings = {
    items: items,
  };
  let textArea;
  let myCodeMirror;
  function mirrorConversion(e) {
    const textArea = rteObj.contentModule.getEditPanel();
    let id = rteObj.getID() + "mirror-view";
    let mirrorView = rteObj.element.querySelector("#" + id);
    let charCount = rteObj.element.querySelector(".e-rte-character-count");
    if (e.targetItem === "Preview") {
      textArea.style.display = "block";
      mirrorView.style.display = "none";
      textArea.innerHTML = myCodeMirror.getValue();
      charCount.style.display = "block";
    } else {
      if (!mirrorView) {
        mirrorView = createElement("div", { className: "e-content" });
        mirrorView.id = id;
        textArea.parentNode.appendChild(mirrorView);
      } else {
        mirrorView.innerHTML = "";
      }
      textArea.style.display = "none";
      mirrorView.style.display = "block";
      renderCodeMirror(mirrorView, rteObj.value);
      charCount.style.display = "none";
    }
  }
  function renderCodeMirror(mirrorView, content) {
    const myCodeMirror = CodeMirror(mirrorView, {
      value: content,
      lineNumbers: true,
      mode: "text/html",
      lineWrapping: true,
    });
  }
  function handleFullScreen(e) {
    let sbCntEle = document.querySelector(".sb-content.e-view");
    let sbHdrEle = document.querySelector(".sb-header.e-view");
    let leftBar;
    let transformElement;
    if (Browser.isDevice) {
      leftBar = document.querySelector("#right-sidebar");
      transformElement = document.querySelector(
        ".sample-browser.e-view.e-content-animation",
      );
    } else {
      leftBar = document.querySelector("#left-sidebar");
      transformElement = document.querySelector("#right-pane");
    }
    if (e.targetItem === "Maximize") {
      if (Browser.isDevice && Browser.isIos) {
        addClass([sbCntEle, sbHdrEle], ["hide-header"]);
      }
      addClass([leftBar], ["e-close"]);
      removeClass([leftBar], ["e-open"]);
      if (!Browser.isDevice) {
        transformElement.style.marginLeft = "0px";
      }
      transformElement.style.transform = "inherit";
    } else if (e.targetItem === "Minimize") {
      if (Browser.isDevice && Browser.isIos) {
        removeClass([sbCntEle, sbHdrEle], ["hide-header"]);
      }
      removeClass([leftBar], ["e-close"]);
      if (!Browser.isDevice) {
        addClass([leftBar], ["e-open"]);
        transformElement.style.marginLeft = leftBar.offsetWidth + "px";
      }
      transformElement.style.transform = "translateX(0px)";
    }
  }
  function actionCompleteHandler(e) {
    if (
      e.targetItem &&
      (e.targetItem === "SourceCode" || e.targetItem === "Preview")
    ) {
      rteObj.sourceCodeModule.getPanel().style.display = "none";
      mirrorConversion(e);
    } else {
      setTimeout(() => {
        rteObj.toolbarModule.refreshToolbarOverflow();
      }, 1000);
    }
  }
  return (
    <div className="control-pane">
      <div className="control-section" id="rteTools">
        <div className="rte-control-section">
          <RichTextEditorComponent
            id="toolsRTE"
            ref={(richtexteditor) => {
              rteObj = richtexteditor;
            }}
            showCharCount={true}
            actionBegin={handleFullScreen.bind(this)}
            actionComplete={actionCompleteHandler.bind(this)}
            toolbarSettings={toolbarSettings}
            // fileManagerSettings={fileManagerSettings}
            quickToolbarSettings={quickToolbarSettings}
          >
            {children}
            <Inject
              services={[
                Toolbar,
                Image,
                Link,
                HtmlEditor,
                Count,
                QuickToolbar,
                Table,
                FileManager,
                EmojiPicker,
                Video,
                Audio,
                FormatPainter,
              ]}
            />
          </RichTextEditorComponent>
        </div>
      </div>
    </div>
  );
}
export default RichText;
