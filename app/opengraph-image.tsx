import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f3f4f6 52%, #fee2e2 100%)",
          color: "#000000",
          padding: "56px",
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 18px",
              border: "4px solid #000000",
              background: "#ffffff",
              boxShadow: "10px 10px 0 #000000",
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: "48px",
                height: "48px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                background: "#000000",
                color: "#ffffff",
                fontSize: "22px",
              }}
            >
              P
            </span>
            PlgCraft
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              border: "3px solid #000000",
              background: "#111111",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Plugins • Tools • Apps
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "92px",
              lineHeight: 0.92,
              fontWeight: 900,
              letterSpacing: "-0.08em",
            }}
          >
            Build software
            <br />
            people can find.
          </div>
          <div
            style={{
              maxWidth: "760px",
              fontSize: "30px",
              lineHeight: 1.2,
              color: "#374151",
              fontWeight: 600,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              maxWidth: "760px",
            }}
          >
            {[
              "SEO-ready",
              "JSON-LD",
              "RSS",
              "Performance",
              "Fast builds",
            ].map((item) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  padding: "12px 16px",
                  border: "3px solid #000000",
                  background: "#ffffff",
                  fontSize: "20px",
                  fontWeight: 800,
                  boxShadow: "6px 6px 0 #000000",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
