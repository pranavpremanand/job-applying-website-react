import React, { useContext, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../API/API";
import { SpinnerContext } from "../Contexts/SpinnerContext";
import { setUser } from "../Redux/userSlice";

const UserInfo = () => {
  const maleRef = useRef();
  const femaleRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const { setSpinner } = useContext(SpinnerContext);
  const [userInfo, setUserInfo] = useState({
    name: userData && userData.name ? userData.name : "",
    email: userData && userData.email ? userData.email : "",
    phone: userData && userData.phone ? userData.phone : "",
    gender: userData && userData.gender ? userData.gender : "",
    job_title: " ",
  });
  const [err, setErr] = useState({
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    genderErr: "",
  });

  //Create user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.gender === "" && !userData) {
      setErr({ ...err, genderErr: "This field is required" });
    } else {
      setErr({ ...err, genderErr: "" });
      try {
        if (userData) {
          setSpinner();
          const response = await API.post("/update.php", {
            id: userData.id,
            ...userInfo,
          });
          setSpinner();
          if (response.data.success) {
            const userDetails = { ...userInfo, id: userData.id };
            dispatch(setUser(userDetails));
            localStorage.setItem("user", JSON.stringify(userDetails));
            navigate("/job-title");
          }
        } else {
          setSpinner();
          const response = await API.post("/create.php", userInfo);
          setSpinner();
          if (response.status === 200) {
            const userDetails = { ...userInfo, id: response.data.id };
            dispatch(setUser(userDetails));
            localStorage.setItem("user", JSON.stringify(userDetails));
            navigate("/job-title");
          }
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
      <h3 className="text-2xl font-semibold">Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div>
            <input
              defaultValue={userData?.name}
              required
              onChange={(e) => {
                const nameReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
                if (e.target.value.length <= 2) {
                  setErr({ ...err, nameErr: "Enter a valid name" });
                } else if (e.target.value.length === 0) {
                  setErr({ ...err, nameErr: "This field is required" });
                } else {
                  if (!nameReg.test(e.target.value)) {
                    setErr({ ...err, nameErr: "Enter a valid name" });
                  } else {
                    setUserInfo({ ...userInfo, name: e.target.value });
                    setErr({ ...err, nameErr: "" });
                  }
                }
              }}
              type="text"
              name="name"
              placeholder="Name"
              className="border w-full placeholder-gray-600 focus:outline-none
                  focus:border-gray-800 p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-500 rounded-md"
            />
            {err.nameErr && (
              <small style={{ color: "red" }}>{err.nameErr}</small>
            )}
          </div>
          <div>
            <input
              defaultValue={userData?.email}
              required
              type="text"
              name="email"
              onChange={(e) => {
                const regEmail = /^[a-z0-9]+@[a-z]+\.[a-z.]+$/;
                if (
                  e.target.value.length > 0 &&
                  !regEmail.test(e.target.value)
                ) {
                  setErr({
                    ...err,
                    emailErr: "Enter a valid email address",
                  });
                } else {
                  setUserInfo({ ...userInfo, email: e.target.value });
                  setErr({ ...err, emailErr: "" });
                }
                if (e.target.value.length === 0) {
                  setErr({
                    ...err,
                    emailErr: "This field is required",
                  });
                }
              }}
              placeholder="Email Address"
              className="border w-full placeholder-gray-600 focus:outline-none
                  focus:border-gray-800 p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-500 rounded-md"
            />
            {err.emailErr && (
              <small style={{ color: "red" }}>{err.emailErr}</small>
            )}
          </div>
          <div>
            <input
              defaultValue={userData?.phone}
              required
              onChange={(e) => {
                const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
                if (!phoneRegex.test(e.target.value)) {
                  setErr({ ...err, phoneErr: "Enter valid phone number" });
                } else if (e.target.value.length === 0) {
                  setErr({ ...err, phoneErr: "This field is required" });
                } else {
                  setUserInfo({ ...userInfo, phone: e.target.value });
                  setErr({ ...err, phoneErr: "" });
                }
              }}
              type="tel"
              name="phone"
              placeholder="Phone"
              className="border w-full placeholder-gray-600 focus:outline-none
                  focus:border-gray-800 p-3 mt-1 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-500 rounded-md"
            />
            {err.phoneErr && (
              <small style={{ color: "red" }}>{err.phoneErr}</small>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Select Gender</h4>
            <div className="flex">
              <div className="flex p-4 px-6 border rounded-md border-gray-500 items-center mr-4">
                <input
                  defaultChecked={userData?.gender === "Male"}
                  onChange={(e) => {
                    setErr({ ...err, genderErr: "" });
                    femaleRef.current.checked = null;
                    maleRef.current.checked = true;
                    setUserInfo({ ...userInfo, gender: e.target.value });
                  }}
                  ref={maleRef}
                  type="checkbox"
                  value="Male"
                  className="w-4 h-4 cursor-pointer accent-green-400 rounded dark:ring-offset-gray-800 dark:bg-gray-700"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">
                  Male
                </label>
              </div>
              <div className="flex p-4 border rounded-md border-gray-500 items-center mr-4">
                <input
                  defaultChecked={userData?.gender === "Female"}
                  ref={femaleRef}
                  onChange={(e) => {
                    setErr({ ...err, genderErr: "" });
                    maleRef.current.checked = null;
                    femaleRef.current.checked = true;
                    setUserInfo({ ...userInfo, gender: e.target.value });
                  }}
                  type="checkbox"
                  value="Female"
                  className="w-4 h-4 cursor-pointer accent-green-400 rounded dark:ring-offset-gray-800 dark:bg-gray-700"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">
                  Female
                </label>
              </div>
            </div>
            {err.genderErr && (
              <small style={{ color: "red" }}>{err.genderErr}</small>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="uppercase bg-emerald-400 text-white font-medium rounded-md py-3 px-20"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
