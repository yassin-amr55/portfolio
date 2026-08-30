import { useCallback, useEffect, useRef, useState } from "react";

// Ports the sidebar -> horizontal-bar header transition from the original
// scripts/sectionPositioning.js / main.js scroll handler. The original
// staged a sequence of classList changes with setTimeout; this keeps the
// exact same stage timings (100ms / 500ms / 700ms open, 500ms close) but
// drives them through React state instead of direct DOM class toggles.
export function useHeaderTransition() {
  const isTransitioningRef = useRef(false);
  const timeoutsRef = useRef([]);
  // Mirrors the current "is the header in its scrolled/trans state" flag so
  // the scroll handler can read it synchronously, the same way the original
  // read `header.classList.contains("trans")` directly off the DOM.
  const headerTransRef = useRef(false);

  const [signatureTrans, setSignatureTrans] = useState(false);
  const [headerTrans, setHeaderTrans] = useState(false);
  const [headerTransTwo, setHeaderTransTwo] = useState(false);
  const [headerTransThree, setHeaderTransThree] = useState(false);
  const [btnTrans, setBtnTrans] = useState(false);
  const [btnTransTwo, setBtnTransTwo] = useState(false);
  const [sideTrans, setSideTrans] = useState(false);
  const [homeTrans, setHomeTrans] = useState(false);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const transHeader = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    headerTransRef.current = true;

    setSignatureTrans(true);

    timeoutsRef.current.push(
      setTimeout(() => {
        setHeaderTrans(true);
        setBtnTrans(true);
      }, 100)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setHeaderTransTwo(true);
        setSideTrans(true);
        setHomeTrans(true);
        isTransitioningRef.current = false;
      }, 500)
    );

    timeoutsRef.current.push(
      setTimeout(() => {
        setBtnTransTwo(true);
      }, 700)
    );
  }, []);

  const reverseTrans = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    headerTransRef.current = false;

    setHomeTrans(false);
    setBtnTransTwo(false);
    setHeaderTransTwo(false);
    setHeaderTransThree(true);
    setSideTrans(false);

    timeoutsRef.current.push(
      setTimeout(() => {
        setHeaderTrans(false);
        setHeaderTransThree(false);
        setBtnTrans(false);
        setSignatureTrans(false);
        isTransitioningRef.current = false;
      }, 500)
    );
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 2) {
        if (!headerTransRef.current) transHeader();
      } else if (headerTransRef.current) {
        reverseTrans();
      }
    }

    function updateScrollHandler() {
      if (window.innerWidth >= 1000) {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
      } else {
        window.removeEventListener("scroll", handleScroll);
        if (headerTransRef.current) reverseTrans();
      }
    }

    updateScrollHandler();
    window.addEventListener("resize", updateScrollHandler);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollHandler);
      clearTimers();
    };
    // transHeader/reverseTrans are stable (useCallback, empty deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    signatureTrans,
    headerTrans,
    headerTransTwo,
    headerTransThree,
    btnTrans,
    btnTransTwo,
    sideTrans,
    homeTrans,
  };
}
