
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Avoid redirecting to the same page
    if (window.location.pathname === "/index") {
      navigate("/");
    }
  }, [navigate]);
  
  return null;
};

export default Index;
