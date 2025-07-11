import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import makeRequest from "../utils/makeRequest";
import { toast } from "sonner";
import { auth, provider, signInWithPopup } from "../firebase";
import getUser from "../utils/getUser";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search.split("=")[1];

  const isSignupFormIncomplete =
    !fullName || !registerEmail || !confirmPassword || !registerPassword;

  const isSigninFormIncomplete = !email || !password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegister) {
      if (
        !registerEmail ||
        !registerPassword ||
        !confirmPassword ||
        !fullName
      ) {
        return toast.error("all fields are required.");
      }

      if (registerPassword !== confirmPassword) {
        return toast.error("Passwords do not match.");
      }

      const data = {
        email: registerEmail,
        password: registerPassword,
        fullName,
      };
      setLoading(true);
      try {
        const res: any = await makeRequest.post("/auth", data);

        if (res.status === 201) {
          toast.success(res.data);
          setIsRegister(false);
        }
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data);
        setLoading(false);
      }
    } else {
      if (!email || !password) {
        return toast.error("email and password are required.");
      }
      setLoading(true);

      try {
        const res: any = await makeRequest.post("/auth/login", {
          email,
          password,
        });

        if (res.status === 200) {
          if (redirect) {
            navigate(redirect);
          } else {
            navigate(`/${res.data.role}`);
          }

          toast.success("login successful");
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        setLoading(false);

        console.log(res);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data);
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (googleLoading) return;

    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success(`Welcome ${user.displayName}`);
      console.log("User:", user);

      // localStorage.setItem("user", JSON.stringify(user));
      // navigate("/"); // Navigate after success
    } catch (error: any) {
      if (error.code === "auth/cancelled-popup-request") {
        toast.warning("Sign-in cancelled due to another request.");
      } else {
        toast.error("Google Sign-In failed");
        console.error(error);
      }
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-red-300">
      <div className="h-[max-content] bg-white m-[10px] rounded-lg w-[90vh] p-[16px] flex flex-col gap-2">
        <div className="w-full flex items-center justify-center">
          <Link
            className="py-1 px-2 font-bold rounded-sm bg-red-500 text-white"
            to="/"
          >
            Yummy
          </Link>
        </div>

        <div className="text-center text-2xl">
          {isRegister ? "Register" : "Login"}
        </div>
        <div className="flex items-center justify-between gap-[20px]">
          <div
            className={`${
              isRegister ? "bg-red-500 text-white" : ""
            } font-base px-4 py-0.5 cursor-pointer ring ring-[#ddd] rounded-2xl`}
            onClick={() => setIsRegister(true)}
          >
            Sign Up
          </div>
          <div
            className={`${
              !isRegister ? "bg-red-500 text-white" : ""
            } font-base px-4 py-0.5 cursor-pointer ring ring-[#ddd] rounded-2xl`}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </div>
        </div>
        {isRegister ? (
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Full Name</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="text"
                placeholder="Enter email"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="email"
                placeholder="Enter email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="password"
                placeholder="Enter password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Confirm Password</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="password"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className={`bg-red-500 text-white p-[10px] cursor-pointer rounded-[5px] ${
                isSignupFormIncomplete && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={isSignupFormIncomplete}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <div className="text-center">or</div>
            <div
              className="ring text-center ring-red-500  rounded-[5px] cursor-pointer p-[10px]
            "
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className={`bg-red-500 text-white p-[10px] cursor-pointer rounded-[5px] ${
                isSigninFormIncomplete && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={isSigninFormIncomplete}
            >
              {loading ? "Loading..." : "  Sign In"}
            </button>
            <div className="text-center">or</div>
            <div
              className="ring text-center ring-red-500  rounded-[5px] cursor-pointer p-[10px]"
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
