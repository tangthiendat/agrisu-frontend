import Title from "antd/es/typography/Title";
import LoginForm from "../features/auth/LoginForm";

function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-200">
      <div className="card  mx-auto  min-w-[400px]">
        <Title level={2} className="text-center">
          ĐĂNG NHẬP
        </Title>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
