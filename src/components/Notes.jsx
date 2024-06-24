import { getNodeText } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaNoteSticky, FaTrash } from "react-icons/fa6";

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
      <div className="p-6 py-5 h-full bg-yellow-900">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <FaNoteSticky size={35} color="#FFDB58" />
            <p className="text-[#FFDB58] text-4xl font-semibold bebas tracking-wide">
              Notes
            </p>
          </div>
          {isForm ? (
            <RiCloseCircleLine
              size={30}
              color="red"
              className="cursor-pointer"
              onClick={() => setForm(false)}
            />
          ) : (
            <RiAddCircleLine
              size={30}
              color="green"
              className="cursor-pointer"
              onClick={() => setForm(true)}
            />
          )}
        </div>
        {isForm ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-8">
              <div className="mb-4">
                <label
                  htmlFor="noteTextarea"
                  className="block text-white font-semibold text-lg mb-2"
                >
                  Add Note
                </label>
                <textarea
                  id="noteTextarea"
                  rows={2}
                  className={`w-full p-2 rounded focus:outline-blue-600`}
                  {...register("note", { required: "Note cannot be empty" })}
                />
                {errors.note && (
                  <p className="text-[#FFDB58] text-md mt-1 font-bold ">
                    {errors.note.message} !
                  </p>
                )}
              </div>
              <button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-600"
              >
                Add
              </button>
              {uploading && (
                <div className="flex items-center gap-2 mt-4 justify-center">
                  <span className="text-white text-md font-semibold">
                    Uploading Note
                  </span>
                  <Hourglass
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#FFDB58", "#FFDB58"]}
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
                    className="flex justify-between bg-[#fcf5c7] p-2 rounded-lg"
                    key={note.noteId}
                  >
                    <p className="text-md">{note.note}</p>{" "}
                    <FaTrash
                      className="flex-shrink-0 cursor-pointer"
                      color="red"
                      size={20}
                      onClick={() => deleteNote(note.noteId)}
                    />
                  </div>
                </>
              ))}
              {deleting && (
                <div className="mt-2 flex gap-4 items-center">
                  <p className="text-md font-medium text-amber-200">
                    Deleting note{" "}
                  </p>
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#FFE082"
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
