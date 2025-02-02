import "./Sidebar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">User Name</p>
      </div>
    </div>
  );
}

export default SideBar;
