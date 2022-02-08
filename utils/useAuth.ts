import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useAuth = (checkAuth?: boolean) => {
  const token = useSelector((state: RootState) => state.authState.token);
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    if (!token && checkAuth) {
      router.push("/auth");
    } else {
      setAuthChecked(true);
      setAuthChecking(false);
    }
  }, []);
  return { authChecking, authChecked, token };
};
