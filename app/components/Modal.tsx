import React from "react";

interface Props {
  show: boolean;
  title?: string;
  setShow: (boolean) => void;
  children: any;
  type?: any;
  submit?: () => void;
  cancel?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  show,
  setShow,
  children,
  type,
  submit,
  cancel,
}) => {
  const submitButton = () => {
    if (submit) submit();
    setShow(false);
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {title && (
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h6
                      className={classNames(
                        "text-3xl font-semibold text-gray-800",
                      )}
                    >
                      {title}
                    </h6>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShow(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                )}

                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
                {/*footer*/}
                {(submit || cancel) && (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    {submit && (
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={submitButton}
                      >
                        OK
                      </button>
                    )}
                    {cancel && (
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={submitButton}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
