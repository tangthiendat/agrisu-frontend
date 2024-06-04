import { Button } from "antd";

interface ErrorFallBackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallBack: React.FC<ErrorFallBackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src="/sth-went-wrong.png"
        alt="Something went wrong"
        width={300}
        height={300}
      />

      <p>ERROR BOUNDARY</p>
      <p className="my-4">{error.message}</p>

      <Button
        className="btn-primary"
        size="large"
        type="primary"
        onClick={resetErrorBoundary}
      >
        Trở về trang chủ
      </Button>
    </div>
  );
};

export default ErrorFallBack;
