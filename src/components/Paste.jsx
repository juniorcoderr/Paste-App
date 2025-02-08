import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/paste/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard");
  }

  return (
    <div className="container mx-auto p-4">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        type="text"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              className="border p-4 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              key={paste._id}
            >
              <div className="text-xl font-bold mb-2">{paste.title}</div>
              <div className="mb-4">{paste.content}</div>
              <div className="flex flex-row gap-4 place-content-evenly">
                <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg">
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg">
                  <a href={`/pastes/${paste?._id}`}>View</a>
                </button>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-lg"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-lg"
                >
                  Share
                </button>
              </div>
              <div className="text-gray-500 mt-2">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-5">No paste found</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
