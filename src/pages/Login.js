import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
// import { useServerStatus } from "../hooks/useServerStatus";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverReady, setServerReady] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, error, loading } = useLogin();
  // const {
  //   status,
  //   error: serverError,
  //   isChecking,
  //   initialCheckDone,
  //   checkServerStatus,
  // } = useServerStatus();

  const checkServerStatus = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/health`
      );

      if (response.ok) {
        setIsLoading(false);
        setServerReady(true);
      } else {
        setIsLoading(false);
        setServerReady(false);
        throw new Error("Server is not responding");
      }
    } catch (error) {
      setIsLoading(false);
      setServerError(true);
      console.error("Server health check failed:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    checkServerStatus();

    if (isLoading !== true && serverError !== true && serverReady === true) {
      await login(email, password);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="login-form flex flex-col gap-5 py-20 max-w-sm mx-auto"
    >
      <h2 className="text-4xl font-semibold text-sky-400 mb-5">Log in</h2>
      <div className="form-ctrl flex flex-col gap-2">
        <label
          htmlFor="email"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="e.g jhon@gmail.com"
          className="py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300"
        />
      </div>
      <div className="form-ctrl flex flex-col gap-2">
        <label
          htmlFor="password"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Enter your password"
          className="py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300"
        />
      </div>
      <button
        disabled={loading || isLoading}
        type="submit"
        className="bg-sky-400 py-3 text-slate-900 rounded-md mt-3 hover:bg-sky-500 duration-300"
      >
        Log in
      </button>

      {error && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}

      {serverError && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          Something went wrong !
        </p>
      )}

      {isLoading === true ||
        (serverReady === false && (
          <div className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
            <h1>Please wait, the server is waking up...</h1>
            <p>This may take up to 30 seconds for the first request.</p>
            {isLoading && <p>Checking server status...</p>}
          </div>
        ))}
    </form>
  );
};

export default Login;
