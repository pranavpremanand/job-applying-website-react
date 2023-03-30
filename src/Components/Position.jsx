import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../API/API";
import { SpinnerContext } from "../Contexts/SpinnerContext";
import { resetUser } from "../Redux/userSlice";
import "./Position.css";

const Position = () => {
  const [terms, setTerms] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleErr, setJobTitleErr] = useState("");
  const userData = useSelector((state) => state.user.data);
  const { setSpinner } = useContext(SpinnerContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Update job title
  const handleSubmit = async () => {
    if (!jobTitle && userData?.id) {
      setJobTitleErr("Please select one of the job positions");
    } else {
      setJobTitleErr("");
      try {
        setSpinner();
        const response = await API.post("/update.php", {
          id: userData?.id,
          job_title: jobTitle,
        });
        setSpinner();
        if (response.data.success) {
          const userDetails = { ...userData, job_title: jobTitle };
          localStorage.setItem("user", JSON.stringify(userDetails));
          navigate("/success");
          setTimeout(() => {
            localStorage.clear();
            dispatch(resetUser());
          }, 500);
        }
      } catch (err) {
        setSpinner();
        toast("Something went wrong", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  };
  return (
    <div className="mb-5 md:mb-0 w-5/6 pt-10 flex flex-col gap-5 pl-20">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span className="uppercase">Previous step</span>
      </div>
      <h3 className="text-2xl mb-1 font-semibold capitalize">
        Select job position
      </h3>
      <hr />
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            id="frontend-developer"
            type="radio"
            className="cursor-pointer accent-green-400 h-5 w-5 checked:bg-green-500 text-green-500 p-3"
            name="position"
            value="Frontend Developer"
          />
          <label htmlFor="frontend-developer" className="ml-2 text-gray-700">
            Frontend Developer
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            id="wordpress-developer"
            type="radio"
            className="cursor-pointer accent-green-400 h-5 w-5 checked:bg-green-500 text-green-500 p-3"
            name="position"
            value="Wordpress Developer"
          />
          <label htmlFor="wordpress-developer" className="ml-2 text-gray-700">
            Wordpress Developer
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            id="uiux-designer"
            type="radio"
            className="cursor-pointer accent-green-400 h-5 w-5 checked:bg-green-500 text-green-500 p-3"
            name="position"
            value="UI/UX Designer"
          />
          <label htmlFor="uiux-designer" className="ml-2 text-gray-700">
            UI/UX Designer
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            id="support-engineer"
            type="radio"
            className="cursor-pointer accent-green-400 h-5 w-5 checked:bg-green-500  text-green-500 p-3"
            name="position"
            value="Support Engineer"
          />
          <label htmlFor="support-engineer" className="ml-2 text-gray-700">
            Support Engineer
          </label>
        </div>
        <div className="flex items-center">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            id="graphic-designer"
            type="radio"
            className="cursor-pointer accent-green-400 h-5 w-5 checked:bg-green-500 text-green-500 p-3"
            name="position"
            value="Graphic Designer"
          />
          <label htmlFor="graphic-designer" className="ml-2 text-gray-700">
            Graphic Designer
          </label>
        </div>
        {jobTitleErr && <small style={{ color: "red" }}>{jobTitleErr}</small>}
      </div>
      <div className="flex mt-4 items-center">
        <input
          onChange={(e) => setTerms(e.target.checked)}
          type="checkbox"
          value="Female"
          className="w-5 h-5 cursor-pointer accent-green-400 rounded dark:ring-offset-gray-800 dark:bg-gray-700"
        />
        <label className="ml-2 capitalize text-sm font-medium text-gray-900 dark:text-gray-600">
          i accept the{" "}
          <span className="text-green-500">terms of conditions</span> and{" "}
          <span className="text-green-500">privacy policy</span>
        </label>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          disabled={!terms}
          className="mt-2 uppercase disabled:bg-emerald-800 text-white bg-emerald-400 textWhite font-medium rounded-md py-3 px-20"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Position;
