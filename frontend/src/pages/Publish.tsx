import { useState } from "react";
import { BACKEND_URL } from "../../config";
import AppBar from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">
      <AppBar />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
          {/* Editor Card */}
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 flex flex-col justify-center min-h-[500px]">
            <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight drop-shadow-lg">Create a New Post</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              aria-describedby="helper-text-explanation"
              className="mb-6 bg-white/80 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-4 font-bold placeholder:font-normal shadow-sm"
              placeholder="Title of your story..."
            />
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              className="rounded-xl border border-gray-200 min-h-[350px] h-[350px] bg-white/90 shadow-inner"
              placeholder="Write your amazing story..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="mt-10 w-full inline-flex items-center justify-center px-6 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all"
            >
              Publish Post
            </button>
          </div>
          {/* Illustration / Branding / Tips */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center">
              <img src="https://illustrations.popsy.co/gray/web-design.svg" alt="Create Blog" className="w-80 mb-8 drop-shadow-xl rounded-2xl" />
              <div className="text-2xl font-semibold text-gray-700 mb-2 text-center">Share your story with the world</div>
              <div className="text-md text-gray-500 text-center max-w-xs">Craft beautiful articles, engage your audience, and grow your brand with our powerful publishing platform.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
