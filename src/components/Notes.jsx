import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaNoteSticky, FaTrash } from "react-icons/fa6";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

import { RiAddCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { Hourglass, ThreeDots } from "react-loader-spinner";

const Notes = () => {
  const [isForm, setForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [temp, setTemp] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addNote = async (note) => {
    setUploading(true);
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/note/add`,
      method: "post",
      data: { note },
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setForm(false);
        setTemp((p) => p + 1);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setUploading(false);
        reset();
      });
  };

  const getNotes = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/note/get`,
      method: "get",
      withCredentials: true,
    };
    axios(config)
      .then((res) => setNotes(res.data))
      .catch((e) => console.error(e));
  };

  const deleteNote = async (id) => {
    setDeleting(true);
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/note/delete`,
      method: "delete",
      data: { noteId: id },
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setTemp((p) => p - 1);
      })
      .catch((e) => console.error(e))
      .finally(() => setDeleting(false));
  };

  useEffect(() => {
    getNotes();
  }, [temp]);

  const onSubmit = (data) => {
    addNote(data.note);
  };

  return (
    <>
      <div className="p-6 py-5 h-full bg-[#FFFFF0] min-h-[50vh]">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <FaNoteSticky size={35} color="#007BA7" />
            {/* 5f65d4 */}
            <p className="text-[#007BA7] text-4xl font-semibold bebas tracking-wide">
              Notes
            </p>
          </div>
          {isForm ? (
            <IoCloseCircle
              size={35}
              color="red"
              onClick={() => {
                setForm(false);
              }}
              className="cursor-pointer"
            />
          ) : (
            <IoAddCircle
              size={35}
              color="green"
              onClick={() => {
                setForm(true);
              }}
              className="cursor-pointer"
            />
          )}
        </div>
        {isForm ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-8">
              <div className="mb-4">
                <label
                  htmlFor="noteTextarea"
                  className="block text-black font-semibold text-lg mb-2"
                >
                  Add Note
                </label>
                <textarea
                  id="noteTextarea"
                  rows={2}
                  className={`w-full p-2 rounded focus:outline-blue-600 border border-[#02182B]`}
                  {...register("note", { required: "Note cannot be empty" })}
                />
                {errors.note && (
                  <p className="text-black text-md mt-1 font-bold ">
                    {errors.note.message} !
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 font-medium text-white bg-[#003461] hover:bg-[#0055A0] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 w-fit block mx-auto duration-100"
              >
                Add
              </button>
              {uploading && (
                <div className="flex items-center gap-2 pt-4 justify-center">
                  <span className="text-[#007BA7] text-md font-semibold">
                    Uploading Note
                  </span>
                  <Hourglass
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#007BA7", "#007BA7"]}
                  />
                </div>
              )}
            </form>
          </>
        ) : (
          <>
            <div className="grid grid-cols gap-y-2 mt-4">
              {notes.map((note) => (
                <>
                  <div
                    className="flex justify-between bg-[#007BA7] p-2 rounded-lg border-[#02182B]"
                    key={note.noteId}
                  >
                    <p className="text-md text-white">{note.note}</p>{" "}
                    <FaTrash
                      className="flex-shrink-0 cursor-pointer"
                      color="#FDEE00"
                      size={20}
                      onClick={() => deleteNote(note.noteId)}
                    />
                  </div>
                </>
              ))}
              {deleting && (
                <div className="mt-2 flex gap-4 items-center">
                  <p className="text-md font-semibold text-[#007BA7]">
                    Deleting note{" "}
                  </p>
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#007BA7"
                    radius="4"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
