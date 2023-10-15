"use client";
import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import cookie from "js-cookie";
import { useSpring } from "react-spring";

export default function Globe() {
  const [showModal, setShowModal] = useState(true);
  const canvasRef = useRef<any>();
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001,
    },
  }));

  const color = cookie.get("color") ?? "default";
  const theme = cookie.get("theme") ?? "chill";
  let glowColor =
    color === "default"
      ? [0.064, 0.245, 0.22]
      : color === "rose"
      ? [0.252, 0.148, 0.3]
      : color === "violet"
      ? [0.52, 0.48, 1]
      : color === "orange"
      ? [0.8, 0.48, 0.1]
      : color === "green"
      ? [0.2, 0.69, 0.2]
      : [0.2, 0.4, 0.7];

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.3,
      dark: theme === "light" ? 0 : 1,
      diffuse: 3,
      scale: 1.1,
      opacity: 0.89,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0.12,
      baseColor:
        theme === "light"
          ? [255 / 240, 255 / 240, 255 / 240]
          : [20 / 40, 22 / 40, 30 / 40],
      markerColor: glowColor as [number, number, number],
      glowColor: glowColor as [number, number, number],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.03 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.002;
        state.phi = phi + r.get();
        state.width = width;
        state.height = width;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  }, []);
  return (
    <>
      <div className="relative flex items-center w-full">
        <div className="w-full aspect-square relative m-auto">
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              canvasRef.current.style.cursor = "grab";
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 200,
                });
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 100,
                });
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              contain: "layout paint size",
            }}
          />
        </div>
      </div>
    </>
  );
}
