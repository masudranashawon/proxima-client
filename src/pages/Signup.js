import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, loading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    //Signup user
    await signup(fullName, email, password);
  };

  return (
    <form
      onSubmit={handleSignup}
      className='signup-form flex flex-col gap-5 py-20 max-w-sm mx-auto'
    >
      <h2 className='text-4xl font-semibold text-sky-400 mb-5'>Sign up</h2>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='full-name'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Full name
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type='text'
          id='full-name'
          placeholder='e.g Jhon Doe'
          className='py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300'
        />
      </div>
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
          placeholder='Write a strong password'
          className='py-3 px-5 rounded-md bg-transparent border border-slate-500 outline-none focus:border-sky-400 duration-300'
        />
      </div>
      <button
        disabled={loading}
        type='submit'
        className='bg-sky-400 py-3 text-slate-900 rounded-md mt-3 hover:bg-sky-500 duration-300'
      >
        Sign up
      </button>

      {error && (
        <p className='bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500'>
          {error}
        </p>
      )}
    </form>
  );
};

export default Signup;
