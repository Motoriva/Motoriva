import { useEffect, useState } from 'react';

export default function useInView(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit,
) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen || !ref.current || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setSeen(true);
      observer.disconnect();
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, seen, options]);

  return seen;
}
