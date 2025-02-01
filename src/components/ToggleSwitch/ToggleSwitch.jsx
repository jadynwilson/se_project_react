import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit.jsx";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    CurrentTempUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text_F ">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}
