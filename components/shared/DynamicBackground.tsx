interface Props {
  readonly color: [number, number, number];
  readonly children: React.ReactNode;
}

export default function DynamicBackground({ color, children }: Props) {
  const [r, g, b] = color;

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgb(${r},${g},${b}) 0%, #0e0e0e 40%)`,
        ["--profile-color" as string]: `${r},${g},${b}`,
      }}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
