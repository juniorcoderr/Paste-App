import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);

  if (!paste) {
    return <div className="text-center text-red-500">Paste not found</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{paste.title}</h1>
        <p className="mb-4">{paste.content}</p>
        <p className="text-gray-500">
          {new Date(paste.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ViewPaste;
