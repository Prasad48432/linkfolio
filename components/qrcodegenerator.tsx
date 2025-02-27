"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect } from "react";

export default function QRCodeGenerator({
  link,
  color,
}: {
  link: string;
  color: string;
}) {
  const qrCode = new QRCodeStyling({
    width: 150,
    height: 150,
    type: "svg",
    data: link,
    image: "/transparent.png",
    dotsOptions: {
      color: color,
      type: "square",
    },
    backgroundOptions: {
      color: "transparent",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 15,
    },
  });

  useEffect(() => {
    // @ts-expect-error
    qrCode.append(document.getElementById("qrCodeContainer"));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div id="qrCodeContainer" className="relative">
        <svg
          width="25"
          height="25"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-[40%] right-[33%] -translate-x-1/2"
        >
          <path
            style={{
              strokeWidth: 5,
              fill: color,
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              stroke: color,
            }}
            transform="translate(-100, -50)"
            d="M 334.676727 410.000061 C 334.676605 421.294403 334.676605 432.088745 334.676605 443.225769 C 310.618317 443.225769 287.056915 443.225769 263.152832 443.225769 C 263.152832 390.927399 263.152832 338.817078 263.152832 286.202759 C 247.75795 286.202759 232.690353 286.202759 217.315033 286.202759 C 217.315033 262.309784 217.315033 238.919769 217.315033 215.195312 C 232.33783 215.195312 247.280853 215.195312 263.033081 215.195312 C 263.033081 213.132767 263.03299 211.393127 263.033081 209.653473 C 263.034058 192.820435 262.947662 175.986832 263.054352 159.154465 C 263.276154 124.15535 285.923798 96.178719 320.089233 88.615311 C 322.681732 88.041389 325.349518 87.491165 327.984985 87.478241 C 347.455322 87.38279 366.9263 87.426582 386.774292 87.426582 C 386.774292 110.869362 386.774292 134.239716 386.774292 158.161942 C 379.748413 158.161942 372.800934 158.149002 365.853516 158.164413 C 346.066254 158.208344 334.845581 169.306793 334.689606 189.051178 C 334.622711 197.516693 334.678406 205.98317 334.678406 214.839539 C 352.183807 214.839539 369.288086 214.839539 386.770447 214.839539 C 386.770447 238.926071 386.770447 262.618652 386.770447 286.774536 C 369.547241 286.774536 352.45575 286.774536 334.676849 286.774536 C 334.676849 327.988129 334.676849 368.74408 334.676727 410.000061 z"
          />
          <path
            style={{
              strokeWidth: 5,
              fill: color,
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              stroke: color,
            }}
            transform="translate(-100, -50)"
            d="M 186.212906 359.000153 C 186.212906 387.308319 186.212906 415.116486 186.212906 443.215454 C 162.329514 443.215454 138.764526 443.215454 115.033585 443.215454 C 115.033585 324.924133 115.033585 206.835541 115.033585 88.456879 C 138.586517 88.456879 162.001114 88.456879 186.212906 88.456879 C 186.212906 178.421494 186.212906 268.460815 186.212906 359.000153 z"
          />
        </svg>
      </div>
    </div>
  );
}
