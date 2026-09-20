import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3ede8",
          color: "#d64634",
          fontSize: 118,
          fontWeight: 800,
        }}
      >
        H
      </div>
    ),
    size,
  );
}
