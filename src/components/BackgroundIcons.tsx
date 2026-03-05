const icons = [
  // CV / Document
  { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", x: "8%", y: "12%" },
  // Target
  { d: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 4a6 6 0 106 6 6 6 0 00-6-6zm0 4a2 2 0 102 2 2 2 0 00-2-2z", x: "85%", y: "8%" },
  // Lightning
  { d: "M13 2L3 14h9l-1 10 10-12h-9l1-10z", x: "5%", y: "38%" },
  // Star
  { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", x: "92%", y: "32%" },
  // Envelope
  { d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", x: "78%", y: "55%" },
  // Trophy
  { d: "M8 21h8m-4-4v4M6 4h12M6 4a2 2 0 00-2 2v2a4 4 0 004 4h0a4 4 0 004-4V6a2 2 0 00-2-2M6 4V3m12 1V3", x: "12%", y: "65%" },
  // Star 2
  { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", x: "50%", y: "85%" },
  // Zap
  { d: "M13 2L3 14h9l-1 10 10-12h-9l1-10z", x: "88%", y: "78%" },
];

const BackgroundIcons = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    {icons.map((icon, i) => (
      <svg
        key={i}
        className="absolute"
        style={{ left: icon.x, top: icon.y, opacity: 0.08 }}
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(14, 53%, 51%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={icon.d} />
      </svg>
    ))}
  </div>
);

export default BackgroundIcons;
