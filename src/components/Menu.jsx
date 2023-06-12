function Menu(props) {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button onClick={() => setMenuOpened(!menuOpened)} className="menu-btn">
        <div className={menuOpened ? "opened" : ""}></div>
        <div className={menuOpened ? "opened middle" : "middle"}></div>
        <div className={menuOpened ? "opened" : ""}></div>
      </button>
      <div className={menuOpened ? "opened menu-container" : "menu-container"}>
        <div className="menu">
          <MenuItem label="About" onClick={() => onSectionChange(0)} />
          <MenuItem label="Skills" onClick={() => onSectionChange(1)} />
          <MenuItem label="Projects" onClick={() => onSectionChange(2)} />
          <MenuItem label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
}
export default Menu;

const MenuItem = (props) => {
  const { label, onClick } = props;
  return (
    <button onClick={onClick} className="menu-item">
      {label}
    </button>
  );
};
