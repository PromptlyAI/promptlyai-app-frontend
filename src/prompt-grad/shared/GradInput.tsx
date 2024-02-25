import React from "react";

export default function FileInput() {
  // Function to handle file selection

  return (
    <div className="bg-primary-design w-full h-64 flex justify-center items-center">
      <div className="h-52 w-10/12 bg-white p-4">
        <h4>Hello</h4>
        <input
          type="text"
          className="w-full h-2/5 border-0 focus:outline-none p-1 bg-primary-design mb-4"
        />
        <h4>File</h4>

        <div className="flex w-full flex-row  justify-between  items-end">
          <div>
            <div className="rounded-sm	w-10 h-10 bg-primary-design flex justify-center items-center">
              <p className="text-[10px] text-center text-greyText ">
                Select file
              </p>
            </div>
          </div>
          <div className="rounded-sm	w-12 h-5 bg-primary-design flex justify-center items-center">
            <p className="text-[8px] text-center text-greyText ">
            Buttån
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
