import { Button, Form, Input } from "antd";

function LoginForm() {
  const [loginForm] = Form.useForm();
  return (
    <Form form={loginForm} layout="vertical">
      <Form.Item label="Tên đăng nhập" name="username">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Mật khẩu" name="password">
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item>
        <Button className="btn-primary mt-4 " type="primary" block size="large">
          ĐĂNG NHẬP
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
