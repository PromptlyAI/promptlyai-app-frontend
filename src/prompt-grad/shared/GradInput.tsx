import React from 'react';

export default function FileInput() {
  // Function to handle file selection
  const handleFileChange = (event:any) => {
    // Get the selected file from the event
    const file = event.target.files[0];
    // Do something with the file
    console.log(file.name);
  };

  return (
    <div className="bg-primary-design w-full h-64 flex justify-center items-center">
      <div className="h-52 w-10/12 bg-white p-4">
        <h4>Hello</h4>
        <input
          type="text"
          className="w-full border-0 focus:outline-none p-1 bg-primary-design"
        />
        <div className="flex w-full flex-row justify-between mt-6">
          <div>
            <h4>File</h4>
            {/* Style adjustments made here */}
            <input
              type="file"
              className="w-full text-sm text-grey-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
