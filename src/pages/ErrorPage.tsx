import { Button } from "antd";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage: React.FC = () => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  let errorMessage: string;

  if (isRouteErrorResponse(routeError)) {
    errorMessage = routeError.data;
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
  } else if (typeof routeError === "string") {
    errorMessage = routeError;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src="/sth-went-wrong.png"
        alt="Something went wrong"
        width={300}
        height={300}
      />

      <p className="my-4">{errorMessage}</p>

      <Button
        className="btn-primary"
        size="large"
        type="primary"
        onClick={() => navigate("/")}
      >
        Trở về trang chủ
      </Button>
    </div>
  );
};

export default ErrorPage;
