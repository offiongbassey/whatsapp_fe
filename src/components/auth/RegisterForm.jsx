import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation.js";
import AuthInput from "./AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/userSlice.js";


export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = async (data) => {
    let res;
      res = await dispatch(registerUser({ ...data, picture: "" }));
    if (res?.payload?.data?.user) navigate("/");
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
        </div>

        {/*form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="phone"
            type="text"
            placeholder={"Phone Number"}
            register={register}
            error={errors?.phone?.message}
          />
          <AuthInput
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
       
          {/*  If we have an error */}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          <button
            disabled={status === "loading" ? true : false}
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign Up"
            )}
          </button>
          {/* Sign in link  */}
          <div className="relative items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span className="">Already have an account ?  
            </span>
            <Link
              to="/login"
              className="hover:underline cursor-pointer px-2 transition ease-in duration-300 "
            >
               Sign In
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}
