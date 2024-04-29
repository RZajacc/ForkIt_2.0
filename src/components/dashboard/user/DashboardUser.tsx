import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import "./dashboard-user.scss";

function DashboardUser() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="user-image-container">
        <img src={user?.photoURL ? user.photoURL : ""} />
      </div>
      <div>
        <p>
          <strong>Username: </strong>{" "}
          {user?.displayName ? user.displayName : "No user name assigned"}
        </p>
        <p>
          <strong>Email: </strong>{" "}
          {user?.email ? user.email : "Data not available"}
        </p>
        <p>
          <strong>Active since: </strong>{" "}
          {user ? user.metadata.creationTime : "No data"}
        </p>
        <p>
          <strong>Last login: </strong>{" "}
          {user ? user.metadata.lastSignInTime : "No data"}
        </p>
      </div>
    </>
  );
}

export default DashboardUser;
