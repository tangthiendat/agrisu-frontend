import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
}

export default Error;
