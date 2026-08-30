const THEME_COLORS = ["red", "orange", "lightblue", "lightgreen", "purple"];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function ThemeControls({
  lightMode,
  onToggleLightMode,
  settingsOpen,
  onToggleSettings,
  onChangeAccentColor,
  sideTrans,
}) {
  return (
    <>
      <button
        className={cx("upperbutton", "settings", sideTrans && "trans", settingsOpen && "push")}
        style={{ zIndex: 100 }}
        onClick={onToggleSettings}
      >
        <img src="/icons/setting.png" className="icon" style={{ animation: "rotate 2s linear infinite" }} alt="" />
      </button>

      <button
        className={cx("upperbutton", "lightmode", sideTrans && "trans", settingsOpen && "push")}
        style={{ zIndex: 100 }}
        onClick={onToggleLightMode}
      >
        {lightMode ? (
          <img src="/icons/moon.png" className="icon active" style={{ filter: "invert(1) brightness(2)" }} alt="" />
        ) : (
          <img src="/icons/sun.png" className="icon" style={{ filter: "invert(0) brightness(0.8)" }} alt="" />
        )}
      </button>

      <div className={cx("settings-panel", sideTrans && "trans", settingsOpen && "active")}>
        <p>Theme Color</p>
        <div className="button-container">
          {THEME_COLORS.map((color) => (
            <button key={color} style={{ backgroundColor: color }} onClick={() => onChangeAccentColor(color)}></button>
          ))}
        </div>
      </div>
    </>
  );
}
