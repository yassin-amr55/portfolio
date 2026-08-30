function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function LoadingScreen({ loadingDone, behindDone }) {
  return (
    <>
      <div className={cx("loading-screen", loadingDone && "done")}>
        <p>
          Welcome with <span className="highlite-one">Yassin Amr</span>
          <span className="dots">...</span>
        </p>
      </div>
      <div className={cx("behind-screen", behindDone && "done")}></div>
    </>
  );
}
