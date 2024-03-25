import React from "react";
import { map } from "zod";

interface ColumnsAdjustProps {
  columns: object;
}

const ColumnsAdjust: React.FC<ColumnsAdjustProps> = ({ columns }) => {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Adjust table columns</h3>
          <div className="content-area p-4 bg-base-200 rounded-lg">
            {" "}
            {/* Padding and background for content area */}
            {columns?.map(
              (
                column:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <>
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    {" "}
                    {/* Add some margin for spacing */}
                    <label style={{ display: "flex", alignItems: "center" }}>
                      {column}
                      <input
                        type="checkbox"
                        value="synthwave"
                        className="toggle theme-controller"
                        style={{ marginLeft: "auto" }}
                      />
                    </label>
                  </div>
                  <hr className="my-2" />
                </>
              )
            )}
            <div className="flex justify-end gap-2">
              <button className="btn btn-neutral">Save</button>
              <button className="btn btn-ghost">Reset</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ColumnsAdjust;
