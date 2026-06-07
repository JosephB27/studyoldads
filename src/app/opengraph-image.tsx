import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "study old ads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const inter = await readFile(join(process.cwd(), "src/app/_assets/Inter.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: "-0.04em",
            color: "#050505",
          }}
        >
          study old ads
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
