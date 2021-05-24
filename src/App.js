import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Sidebar from "react-sidebar";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import ClippedDrawer from "./components/ResponsiveDrawer";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <>
      <ClippedDrawer />
      {/* <div className="App">
        <div className="Header"></div>
        <div>
          <Sidebar
            sidebar={
              <ListGroup>
                <ListGroup.Item className="Main-List">
                  <text>Dashboard</text>
                </ListGroup.Item>
                <ListGroup.Item className="Main-List"> Patients</ListGroup.Item>
                <ListGroup.Item className="Sub-List">
                  My Patients
                </ListGroup.Item>
                <ListGroup.Item className="Sub-List">Alerts</ListGroup.Item>
                <ListGroup.Item className="Main-List">Profile</ListGroup.Item>
                <ListGroup.Item className="Sub-List">
                  Update Profile
                </ListGroup.Item>
              </ListGroup>
            }
            open={sideBarOpen}
            onSetOpen={setSideBarOpen}
            docked={true}
            styles={{ sidebar: { background: "white" } }}
          ></Sidebar>
        </div>
      </div> */}
    </>
  );
}

export default App;
