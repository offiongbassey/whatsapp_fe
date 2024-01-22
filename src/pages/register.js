import RegisterForm from "../components/auth/RegisterForm"
export default function Register() {
  return (
    <div className="min-h-screen darkBg bg-no-repeat bg-cover flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Register form */}
        <RegisterForm />
      </div>
    </div>
  )
}
