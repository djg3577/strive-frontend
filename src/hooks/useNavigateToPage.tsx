import { useEffect } from "react";
import { To, useNavigate } from "react-router";

function useNavigateToPage(){
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (page: To) => {
    navigate(page);
  }
}

export default useNavigateToPage;