import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await res.json();

    // res.ok === false
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      //Update auth context
      dispatch({ type: "LOGIN", payload: json });

      //Save user in to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      setLoading(false);
    }
  };

  return { login, error, loading };
};
