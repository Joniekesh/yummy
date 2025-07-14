import { useState } from "react";

const Contact = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject: "",
    details: "",
  });

  const { name, email, subject, details } = inputs;
  const isContactFormIncomplete = !email || !name || !subject || !details;

  console.log(inputs);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[url('/pizza-bg4.jpg')] bg-cover bg-center my-5 py-5 px-4 md:px-8 min-h-[100vh]">
      <div className="flex text-white items-center justify-center flex-col w-full h-full">
        <h1 className="text-2xl md:text-4xl font-semibold mb-8">Contact Us</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-[10px] bg-white text-black p-[10px] w-[96vw] sm:w-[60vw]"
        >
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Eenter your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Subject</label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              type="text"
              name="subject"
              value={subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Details</label>
            <textarea
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              rows={5}
              cols={5}
              value={details}
              name="details"
              onChange={handleChange}
              placeholder="Enter details"
            ></textarea>
          </div>
          <button
            disabled={isContactFormIncomplete}
            className={`cursor-pointer w-full py-2 rounded text-white ${
              isContactFormIncomplete ? "bg-gray-300" : "bg-[#D99703]"
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
