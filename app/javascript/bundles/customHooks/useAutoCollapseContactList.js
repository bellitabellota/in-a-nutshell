import { useEffect, useState, useRef } from "react";

const useAutoCollapseContactList = (isDesktop)=> {
  const [listExpanded, setListExpanded] = useState(true);
  const isFirstLoadRef = useRef(true);
  useEffect(() => {
    if(!isDesktop) return;
    if(!isFirstLoadRef.current) return;

    isFirstLoadRef.current = false;
    const timer = setTimeout(() => setListExpanded(false), 250);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  return {listExpanded}
}

export default useAutoCollapseContactList;