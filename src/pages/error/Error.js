import { Link } from "react-router-dom";
import "../../css/Error.css";
const Error = () => {
  return (
    <>
      <div className="error-container">
        <p>
          Careful lad. You have lost your way! click the button to return on
          your way.
        </p>
        <Link to="/" className="btn-error">
          Get back!
        </Link>
      </div>
    </>
  );
};

export default Error;
