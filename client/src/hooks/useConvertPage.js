import { useNavigate } from "react-router-dom";

export const useConvertPage = (path) => {
  const navigate = useNavigate();

  return () => {

    navigate(path);
  }

}