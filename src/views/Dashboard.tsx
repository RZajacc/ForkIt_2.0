import DashboardUser from "../components/dashboard/DashboardUser";
import DashboardFavs from "../components/dashboard/DashboardFavs";
import { useState } from "react";

import "../style/dashboard.scss";

function Dashboard() {
  const [displayToggle, setDisplayToggle] = useState(true);

  return (
    <>
      <main>
        <div className="user-dashboard">
          <section className="user-dashboard__nav">
            <button
              onClick={() => {
                setDisplayToggle(true);
              }}
            >
              Account details
            </button>
            <button
              onClick={() => {
                setDisplayToggle(false);
              }}
            >
              Saved recipes
            </button>
          </section>
          <section className="user-dashboard__content">
            {displayToggle ? <DashboardUser /> : <DashboardFavs />}
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
