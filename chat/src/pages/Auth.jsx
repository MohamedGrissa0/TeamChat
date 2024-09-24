import Login from "../Components/Login/Login";
import Register from "../Components/Register.jsx/Register";

export default function Auth() {
  return (
    <div className="container mx-auto w-full h-screen rounded-md flex justify-center items-center relative">
      <div className="absolute inset-0 rounded-md bg-[#354A5F] my-12"></div> {/* Blurred background */}
      <div className="relative z-10 rounded-md w-full py-10 h-full text-white text-4xl grid grid-cols-12 px-10">
        
        {/* Register Component */}
        <div className="col-span-5 flex justify-center items-center">
          <Register />
        </div>

        {/* Separator */}
        <div className="col-span-2 flex justify-center items-center">
          <div className="w-[1px] h-4/5 bg-gray-400"></div> {/* Vertical line */}
        </div>

        {/* Login Component */}
        <div className="col-span-5 flex justify-center items-center">
          <Login />
        </div>
        
      </div>
    </div>
  );
}
