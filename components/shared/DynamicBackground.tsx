"use client";

import { useEffect, useState } from "react";

interface Props {
  imageUrl: string;
  children: React.ReactNode;
}

function getDominantColor(img: HTMLImageElement): [number, number, number] {
  const canvas = document.createElement("canvas");
  const size = 50; // sample small for performance
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [14, 14, 14];

  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

export default function DynamicBackground({ imageUrl, children }: Props) {
  const [gradient, setGradient] = useState<string>(
    "linear-gradient(to bottom, #1a1a2e 0%, #0e0e0e 40%)"
  );

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const [r, g, b] = getDominantColor(img);
        setGradient(
          `linear-gradient(to bottom, rgb(${r},${g},${b}) 0%, #0e0e0e 40%)`
        );
      } catch {
        // keep default
      }
    };

    // Add cache-busting param to help with CORS on some CDNs
    img.src = imageUrl.includes("?")
      ? `${imageUrl}&cb=${Date.now()}`
      : `${imageUrl}?cb=${Date.now()}`;
  }, [imageUrl]);

  return (
    <div
      style={{ background: gradient }}
      className="min-h-screen transition-colors duration-700"
    >
      {children}
    </div>
  );
}