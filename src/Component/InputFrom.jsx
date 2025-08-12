import { IoIosArrowRoundUp } from "react-icons/io";

const InputFrom = ({ handleSend, input, setInput }) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative p-4 flex gap-2"
      >
        <textarea
          className="textarea flex-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ease-in-out"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        {input.trim() && (
          <button
            type="submit"
            onClick={handleSend}
            className="bg-black btn right-6 bottom-6 mt-2 absolute text-white p-2 rounded-full transition-all duration-300 transform opacity-0 animate-fade-slide-up"
          >
            <span className="text-3xl">
              <IoIosArrowRoundUp />
            </span>
          </button>
        )}
      </form>
    </div>
  );
};

export default InputFrom;
