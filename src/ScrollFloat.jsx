import { useEffect, useMemo, useRef, useState } from 'react';

export default function ScrollFloat({
  children,
  className = '',
  textClassName = '',
  stagger = 0.03,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const text = typeof children === 'string' ? children : '';

  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} className={`scroll-float ${visible ? 'is-visible' : ''} ${className}`}>
      <span className={`scroll-float-text ${textClassName}`}>
        {chars.map((char, index) => (
          <span className="char" style={{ '--stagger': `${index * stagger}s` }} key={`${char}-${index}`}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </h2>
  );
}
