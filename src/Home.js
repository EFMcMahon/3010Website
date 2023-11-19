import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 force-text-center">
            <h1>Welcome Hunter</h1>
            <p>
              This is soon to be a monster hunter fan page. We will add more as
              time goes to help you become a master rank hunter.
            </p>
            <h3>Coming Soon...</h3>
            <p>Hunter Tips</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid text-center">
          <ul>
            <li>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Home;
