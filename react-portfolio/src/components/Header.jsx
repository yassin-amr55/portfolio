const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </>
    ),
  },
  {
    key: "about",
    label: "About",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </>
    ),
  },
  {
    key: "services",
    label: "Services",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </>
    ),
  },
  {
    key: "projects",
    label: "Projects",
    icon: (
      <>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>,
  },
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Header({
  onNavigate,
  signatureTrans,
  headerTrans,
  headerTransTwo,
  headerTransThree,
  btnTrans,
  btnTransTwo,
}) {
  const headerClassName = cx(headerTrans && "trans", headerTransTwo && "transtwo", headerTransThree && "transthree");
  const btnClassName = cx(btnTrans && "trans", btnTransTwo && "transtwo");

  return (
    <header className={headerClassName || undefined}>
      <div className={cx("signature-container", signatureTrans && "trans")}>
        <img src="/icons/signature.png" className="signimg" alt="Yassin Amr signature logo" />
        <div className="Lthree">
          <span className="lineone"></span>
          <span className="linetwo"></span>
        </div>
        <div className="Lfour">
          <span className="lineone"></span>
          <span className="linetwo"></span>
        </div>
      </div>

      {NAV_ITEMS.map((item) => (
        <button key={item.key} className={btnClassName || undefined} onClick={() => onNavigate(item.key)}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {item.icon}
          </svg>{" "}
          <span className="btn-label">{item.label}</span>
        </button>
      ))}
    </header>
  );
}
