import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const photoUrl = searchParams.get("photo") ?? "";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#000" }}>
        {photoUrl && (
          <img src={photoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
