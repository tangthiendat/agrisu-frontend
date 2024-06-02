import { Button } from "antd";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
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
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  );
};

export default ErrorPage;
