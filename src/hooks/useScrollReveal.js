// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el); // animate once
        }
      },
      { threshold: options.threshold || 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
