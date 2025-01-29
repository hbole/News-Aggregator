import { useEffect, RefObject } from "react";

const useIntersectionObserver = (
  elementRef: RefObject<HTMLElement>,
  cb: () => void
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.intersectionRatio >= 0.5) {
          cb();
        }
      },
      { threshold: 0.5 }
    );

    intersectionObserver.observe(elementRef.current);

    // Cleanup function to disconnect observer when the component unmounts or ref changes
    return () => {
      intersectionObserver.disconnect();
    };
  }, [elementRef, cb]);
};

export default useIntersectionObserver;
