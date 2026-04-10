interface Props {
  readonly color: [number, number, number];
  readonly children: React.ReactNode;
  readonly mobile?: boolean;
}

export default function DynamicBackground({ color, children, mobile = false }: Props) {
  const [r, g, b] = color;

  const gradient = mobile
    ? `linear-gradient(to bottom, rgb(${r},${g},${b}) 0%, rgb(${Math.round(r*0.5)},${Math.round(g*0.5)},${Math.round(b*0.5)}) 70%, #090705 100%)`
    : `linear-gradient(to bottom, rgb(${r},${g},${b}) 0%, rgb(${Math.round(r*0.5)},${Math.round(g*0.5)},${Math.round(b*0.5)}) 20%, #090705 51%)`;

  return (
    <div
      style={{
        background: gradient,
        ["--profile-color" as string]: `${r},${g},${b}`,
      }}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}