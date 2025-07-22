import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeRequest from "../utils/makeRequest";
import { toast } from "sonner";
import { auth, provider, signInWithPopup } from "../firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../redux/reducers/authReducers";
import Logo from "../components/Logo";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  // form fields
  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const { loading: loadingLogin } = useAppSelector((state) => state.auth);
  const isSignupFormIncomplete =
    !fullName || !registerEmail || !confirmPassword || !registerPassword;

  const isSigninFormIncomplete = !email || !password;

  const handleLogin = async () => {
    dispatch(loginRequest());
    try {
      const res: any = await makeRequest.post("/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      toast.success("Login successful");
      navigate(`/${res.data.role}`);
    } catch (error: any) {
      dispatch(loginFailure(error?.response?.data?.message || "Login failed"));
      toast.error("Login failed");
    }
  };

  const handleRegister = async () => {
    if (registerPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
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
        toast.success("Registration successful!");
        setIsRegister(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // 🔄 Handle login or register
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  //  Google Sign-In
  const handleGoogleSignIn = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      // Send to backend to create/login user
      const res: any = await makeRequest.post("/auth/google", {
        email: user.email,
        fullName: user.displayName,
        googleId: user.uid,
      });

      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
        toast.success(`Welcome ${res.data.fullName}`);
        navigate(`/${res.data.role}`);
      }
    } catch (error: any) {
      if (error.code === "auth/cancelled-popup-request") {
        toast.warning("Google login cancelled.");
      } else {
        toast.error(error.response.data);
        console.error(error);
      }
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#D99703]">
      <div className="bg-white p-6 rounded-lg shadow w-[90%] max-w-md">
        <div className="flex justify-center item-center mb-4">
          <Logo />
        </div>

        <div className="text-center text-2xl mb-4">
          {isRegister ? "Register" : "Login"}
        </div>

        <div className="flex justify-between mb-4">
          <button
            className={`cursor-pointer w-1/2 py-2 rounded-l ${
              isRegister ? "bg-[#D99703] text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsRegister(true)}
          >
            Sign Up
          </button>
          <button
            className={`cursor-pointer w-1/2 py-2 rounded-r ${
              !isRegister ? "bg-[#D99703] text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister ? (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <button
                type="submit"
                disabled={isSignupFormIncomplete || loading}
                className={`cursor-pointer w-full py-2 rounded text-white ${
                  isSignupFormIncomplete ? "bg-gray-300" : "bg-[#D99703]"
                }`}
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[#D99703] w-full"
              />
              <button
                type="submit"
                disabled={isSigninFormIncomplete || loadingLogin}
                className={`cursor-pointer w-full py-2 rounded text-white ${
                  isSigninFormIncomplete ? "bg-gray-300" : "bg-[#D99703]"
                }`}
              >
                {loadingLogin ? "Signing In..." : "Sign In"}
              </button>
            </>
          )}
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="cursor-pointer w-full mt-3 py-2 border border-[#D99703] text-[#D99703] rounded hover:bg-red-50"
        >
          {googleLoading ? "Connecting..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
