import React, { memo, useEffect, useRef } from 'react';
import { Surface2D } from "modules";
import "./app.css";

export const App = memo(() => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!ref.current || isMounted.current) return;

    new Surface2D(ref.current);
    isMounted.current = true;
  }, [ref]);

  return (
    <div ref={ref} className="app" />
  );
});
