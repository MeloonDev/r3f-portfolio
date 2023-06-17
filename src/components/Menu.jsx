function Menu(props) {
  const { section, onSectionChange, menuOpened, setMenuOpened } = props;

  const menuItems = [
    { index: 0, label: "About", onClick: () => onSectionChange(0) },
    { index: 1, label: "Skills", onClick: () => onSectionChange(1) },
    { index: 2, label: "Projects", onClick: () => onSectionChange(2) },
    { index: 3, label: "Contact", onClick: () => onSectionChange(3) },
  ];

  return (
    <>
      <button onClick={() => setMenuOpened(!menuOpened)} className="menu-btn">
        <div className={menuOpened ? "opened" : ""}></div>
        <div className={menuOpened ? "opened middle" : "middle"}></div>
        <div className={menuOpened ? "opened" : ""}></div>
      </button>
      <div className={menuOpened ? "opened menu-container" : "menu-container"}>
        <div className="menu">
          {/* <MenuItem label="About" onClick={() => onSectionChange(0)} />
          <MenuItem label="Skills" onClick={() => onSectionChange(1)} />
          <MenuItem label="Projects" onClick={() => onSectionChange(2)} />
          <MenuItem label="Contact" onClick={() => onSectionChange(3)} /> */}
          {menuItems.map((item) => (
            <MenuItem
              key={item.index}
              index={item.index}
              label={item.label}
              onClick={item.onClick}
              section={section}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Menu;

const MenuItem = (props) => {
  const { index, section, label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={section === index ? "menu-item active" : "menu-item"}
    >
      {section === index ? <span className="dot"></span> : ""}
      {label}
    </button>
  );
};
