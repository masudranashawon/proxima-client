import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className='login-form flex flex-col gap-5 py-20 max-w-sm mx-auto'>
      <h2 className='text-4xl font-medium text-sky-400 mb-10'>Login</h2>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='email'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          id='email'
          placeholder='e.g jhon@gmail.com'
          className='py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300'
        />
      </div>
      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='password'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          id='password'
          placeholder='Enter your password'
          className='py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300'
        />
      </div>
      <button
        type='submit'
        className='bg-sky-400 py-3 text-slate-900 rounded-md mt-3 hover:bg-sky-500 duration-300'
      >
        Log in
      </button>
    </form>
  );
};

export default Login;
