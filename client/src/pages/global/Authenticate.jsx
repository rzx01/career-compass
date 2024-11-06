import React, { useState } from "react";
import Login from "../../components/Login.jsx";
import Signup from "../../components/Signup.jsx";


const Authenticate = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleClick = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col justify-center  dark:bg-slate-900 items-center h-screen">
      <div className=" ">
        {isLogin ? <Login /> : <Signup />}
        <div className="text-center mt-4" onClick={handleClick}>
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
