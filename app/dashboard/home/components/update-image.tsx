import React from "react";
import Image from "next/image";

const UpdateImage = ({
  image,
  setModal,
  handleFileChange,
  loading,
  fetchLoading,
}: {
  image: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileChange: any;
  loading: boolean;
  fetchLoading: boolean;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="mb-0.5 text-lg font-bold text-primary-text/80">
        Image Update
      </h2>
      <p className="text-sm  text-primary-text/60 mb-5">
        Update the publicly visible display image
      </p>
      <div className="relative inline-flex group items-center justify-center">
        {fetchLoading ? (
          <div
            className={`animate-pulse bg-gray-600 rounded-full w-[6rem] h-[6rem]`}
          />
        ) : (
          <Image
            alt="User profile"
            width={600}
            height={600}
            src={image || "/avatars/annie.png"}
            className="w-[6rem] h-[6rem] rounded-full ring-2 ring-secondary-border p-1 inline-block object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {/* mobile button */}
        <button
          onClick={() => setModal(true)}
          type="submit"
          className="h-[2rem] ml-5 flex sm:hidden items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-500 transition duration-150 ease-in-out"
        >
          Update Image
        </button>
        {/* desktop button */}
        <div className="absolute inset-0 z-20 justify-center items-center rounded-full bg-transparent group-hover:bg-secondary-bg/30 duration-200 cursor-pointer hidden sm:flex">
          <button
            onClick={() => setModal(true)}
            className="btn btn-square btn-sm  bg-neutral/50 border-neutral/0 group-hover:bg-neutral group-hover:border-neutral "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              className="w-5 h-5 block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              ></path>
            </svg>
          </button>
        </div>
        <input
          type="file"
          name="picture"
          id="fileInput"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UpdateImage;
