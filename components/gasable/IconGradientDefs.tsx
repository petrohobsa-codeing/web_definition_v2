/**
 * Renders SVG gradient definitions used to give lucide icons a mixed
 * navy -> red gradient stroke. Passing stroke="url(#fl-grad)" to any
 * lucide icon paints it with this gradient. Rendered once globally.
 */
export default function IconGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="fl-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0C2D6B" />
          <stop offset="55%" stopColor="#3A4E8C" />
          <stop offset="100%" stopColor="#0067E3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
