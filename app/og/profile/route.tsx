import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const photoUrl = searchParams.get("photo") ?? "";

  const image = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(71.91deg, #000000 24.5%, #030934 96.93%)",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 100px",
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            style={{ width: 360, height: 460, borderRadius: 36, objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: 360, height: 460, borderRadius: 36, backgroundColor: "#1a1a2e", display: "flex" }} />
        )}

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
          <svg width="90" height="90" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="4.31776" y1="6.90909" x2="30.6587" y2="34.5455" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8325FF" />
                <stop offset="0.5" stopColor="#6B40FF" />
                <stop offset="1" stopColor="#4993FF" />
              </linearGradient>
            </defs>
            <rect width="38" height="38" rx="10" fill="url(#grad)" />
            <path d="M28.5675 25.8572C26.3624 28.4745 22.2318 28.8222 19.665 26.1872L20.9313 24.6847C22.57 26.536 25.4662 26.5097 27.07 24.606C28.3683 23.0655 28.3687 20.827 27.07 19.286L25.8138 17.796C26.055 16.8547 26.0975 15.8747 25.9425 14.9197L28.5675 18.0347C30.4775 20.3009 30.4775 23.591 28.5675 25.8572ZM23.6012 12.1422C21.1962 9.28844 16.8075 9.28343 14.3987 12.1422C12.9691 13.8376 12.0652 17.1949 14.3987 19.9635L17.0713 23.1347L18.3462 21.621L15.8962 18.7134C14.5955 17.1714 14.5988 14.9342 15.8962 13.3934C17.4729 11.5217 20.3291 11.4454 21.9993 13.2733C23.1192 14.4989 23.6913 16.8304 22.1037 18.7134C21.995 18.8424 17.1007 24.6499 17.0687 24.6847C15.3977 26.5069 12.5337 26.5097 10.93 24.606C9.63125 23.0647 9.63125 20.8272 10.93 19.286L12.1862 17.7959C11.945 16.8547 11.9025 15.8747 12.0575 14.9197L9.4325 18.0347C7.5225 20.3009 7.5225 23.5909 9.4325 25.8572C11.7412 28.596 15.8775 28.711 18.335 26.1872C18.5299 25.99 18.114 26.4741 23.6012 19.9634C25.8874 17.2509 25.0806 13.8965 23.6012 12.1422Z" fill="white" />
          </svg>
          <span style={{ color: "white", fontSize: 72, fontWeight: 900, letterSpacing: -2 }}>linkup</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );

  image.headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");
  return image;
}
