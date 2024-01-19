import LoginForm from "../components/auth/LoginForm";
export default function Login() {
  return (
    <div className="h-screen bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat flex items-center justify-center py-[19px] overflow-hidden">
    {/* Container */}
    <div className="flex w-[1600px] mx-auto h-full">
      <LoginForm />
    </div>
  </div>
  )
}
