import ReactSlider from "react-slider";
import "./slider.css";

import { useContext } from "react";
import SettingsContext from "./SettingsContext";

export default function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div style={{ textAlign: "left" }}>
      <label>work: {settingsInfo.workMinutes} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={60}
      />
      <label>break: {settingsInfo.breakMinutes} </label>
      <ReactSlider
        className={"slider break"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={60}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="btn btn-primary"
          onClick={() => settingsInfo.setShowSettings(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
