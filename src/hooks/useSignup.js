import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (fullName, email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      }
    );

    const json = await res.json();

    //res.ok ===false
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      //Update auth context
      dispatch({ type: "LOGIN", payload: json });

      //Save user in to local storage
      localStorage.setItem("user", JSON.stringify(json));

      setLoading(false);
    }
  };

  return { signup, error, loading };
};
