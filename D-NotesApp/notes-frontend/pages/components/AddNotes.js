import React from "react";

export default function AddNotes({
  darkMode,
  gettingNotes,

  totalNotesNo,
  total,
  actual,
  actualfunction,
}) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
  });

  function handleForm(e) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function sendNotes(val) {
    console.log(val);
    form.title && form.description
      ? gettingNotes(val.title, val.description)
      : null;
    setForm({
      title: "",
      description: "",
    });
  }

  return (
    <div
      className={`text-base flex flex-col items-center overflow-hidden w-3/4 sm:w-full  ${
        darkMode ? "bg-white/50" : "bg-amber-300/50"
      } gap-1 m-2 rounded-lg px-3 py-1.5 justify-start ease-linear duration-300`}
    >
      <span>Title💎</span>
      <input
        className={` w-full  m-1.5 rounded-md`}
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleForm}
        value={form.title}
      />
      <span>Description👾</span>
      <textarea
        className={` w-full text-start resize-none rounded-md h-48 `}
        type="text"
        name="description"
        placeholder="Description Here..."
        onChange={handleForm}
        value={form.description}
      />
      <button
        onClick={() => sendNotes(form)}
        className={` m-1 px-2 py-1 ${
          darkMode ? "bg-teal-600" : "bg-fuchsia-600 "
        } rounded-md text-white `}
      >
        Submit
      </button>

      <button
        onClick={() => {
          totalNotesNo(), actualfunction(); //running multiple functions on single click
        }}
        className={` m-1 px-2 py-1 ${
          darkMode ? "bg-teal-600" : "bg-fuchsia-600 "
        } rounded-md text-white `}
      >
        Get Total No. of Notes
      </button>
      {total == 0 ? null : (
        <>
          <span className={` m-1 px-2 py-1  rounded-md text-black text-center`}>
            {`You currently have ${actual} notes present`}
          </span>
          <span
            className={` m-1 px-2 py-1  rounded-md text-black text-center `}
          >
            {`You have made total ${total} notes till now`}
          </span>
        </>
      )}
    </div>
  );
}
