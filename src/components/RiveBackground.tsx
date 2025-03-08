"use client";
import { Fit, Alignment, useRive, Layout } from "rive-react";
type RiveBackgroundProps = {
    onClick: (x: number, y: number) => void; // Passes the clicked position
  };
  const RiveBackground = ({ onClick }: RiveBackgroundProps) => {
    const STATE_MACHINE_NAME = "State Machine 1";
    /*  const { RiveComponent } = useRive({
    src: "/background.riv", // Make sure this file is in `public/`
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover, // Ensure the animation covers the entire screen
      alignment: Alignment.Center,
    }),
  });*/
  const { rive, RiveComponent } = useRive({
    src: "/background.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
  });
 // ✅ Capture mouse click coordinates
 const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // X position relative to the Rive canvas
    const y = event.clientY - rect.top; // Y position relative to the Rive canvas
    onClick(x, y);
  };
  return (
    <div className="absolute inset-0 z-0 w-full h-full" onClick={handleClick}>
      <RiveComponent className="w-full h-full object-cover" />
    </div>
  );
};

export default RiveBackground;