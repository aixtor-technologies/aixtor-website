import Button from "@/components/ui/button";

const ThankYouIllustration = () => (
  <svg
    viewBox="0 0 620 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-lg mx-auto"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000018" />
      </filter>
    </defs>

    {/* Background circle */}
    <circle cx="370" cy="230" r="195" fill="#f3f4f6" />

    {/* Floating mini envelope — top left */}
    <g transform="translate(48,52) rotate(-12)" opacity="0.35">
      <rect width="68" height="46" rx="4" fill="#d1d5db" />
      <path d="M0,0 L34,23 L68,0" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M0,46 L34,23 L68,46" fill="#c4c9d2" />
    </g>

    {/* Floating mini envelope — top center */}
    <g transform="translate(283,22) rotate(6)" opacity="0.28">
      <rect width="56" height="38" rx="4" fill="#d1d5db" />
      <path d="M0,0 L28,19 L56,0" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M0,38 L28,19 L56,38" fill="#c4c9d2" />
    </g>

    {/* Floating mini envelope — top right */}
    <g transform="translate(540,72) rotate(15)" opacity="0.28">
      <rect width="50" height="34" rx="4" fill="#d1d5db" />
      <path d="M0,0 L25,17 L50,0" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M0,34 L25,17 L50,34" fill="#c4c9d2" />
    </g>

    {/* ── Main envelope ── */}
    <g filter="url(#dropShadow)">
      {/* Envelope body */}
      <rect x="215" y="148" width="310" height="232" rx="6" fill="#e5e7eb" />
      {/* Inside fold — bottom V */}
      <path d="M215,380 L370,298 L525,380 Z" fill="#d1d5db" />
      {/* Inside fold — left triangle */}
      <path d="M215,148 L215,380 L370,298 Z" fill="#dde0e4" />
      {/* Inside fold — right triangle */}
      <path d="M525,148 L525,380 L370,298 Z" fill="#dde0e4" />
    </g>

    {/* Envelope open flap (folded outward, behind card) */}
    <path d="M215,148 L370,238 L525,148 Z" fill="#e9eaed" />

    {/* ── Thank you card ── */}
    <g filter="url(#dropShadow)">
      <rect x="272" y="38" width="198" height="158" rx="10" fill="url(#cardGrad)" />
      <text
        x="371"
        y="110"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="20"
        fontWeight="700"
        fill="white"
      >
        Thank you for
      </text>
      <text
        x="371"
        y="137"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="20"
        fontWeight="700"
        fill="white"
      >
        contacting us.
      </text>
    </g>

    {/* ── Woman figure ── */}

    {/* Shoes */}
    <ellipse cx="117" cy="372" rx="19" ry="9" fill="#111827" />
    <ellipse cx="153" cy="372" rx="19" ry="9" fill="#111827" />

    {/* Legs — left */}
    <rect x="104" y="265" width="24" height="112" rx="7" fill="#1f2937" />
    {/* Legs — right */}
    <rect x="138" y="265" width="24" height="112" rx="7" fill="#1f2937" />

    {/* Body (lavender top) */}
    <path
      d="M84,192 C84,185 90,180 97,180 L169,180 C176,180 182,185 182,192 L182,270 L84,270 Z"
      fill="#a78bfa"
    />

    {/* Neck */}
    <rect x="118" y="166" width="30" height="20" rx="5" fill="#fbbf9a" />

    {/* Head */}
    <ellipse cx="133" cy="146" rx="31" ry="33" fill="#fbbf9a" />

    {/* Hair — back/top (dark) */}
    <ellipse cx="133" cy="124" rx="34" ry="22" fill="#1f2937" />

    {/* Hair — left side */}
    <path
      d="M102,136 Q94,162 97,192"
      stroke="#1f2937"
      strokeWidth="16"
      strokeLinecap="round"
    />

    {/* Hair — right side */}
    <path
      d="M164,136 Q172,160 168,188"
      stroke="#1f2937"
      strokeWidth="12"
      strokeLinecap="round"
    />

    {/* Eyes */}
    <ellipse cx="122" cy="148" rx="4" ry="4.5" fill="#374151" />
    <ellipse cx="144" cy="148" rx="4" ry="4.5" fill="#374151" />
    {/* Eye shine */}
    <circle cx="124" cy="146" r="1.5" fill="white" />
    <circle cx="146" cy="146" r="1.5" fill="white" />

    {/* Smile */}
    <path
      d="M123,162 Q133,171 144,162"
      stroke="#d97b6c"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Hair accessory (pink) */}
    <circle cx="102" cy="134" r="7" fill="#fce7f3" />
    <circle cx="102" cy="134" r="4" fill="#f472b6" />

    {/* Left arm — raised toward card direction */}
    <path
      d="M84,212 Q52,220 46,252"
      stroke="#fbbf9a"
      strokeWidth="17"
      strokeLinecap="round"
    />
    {/* Left hand */}
    <circle cx="46" cy="256" r="13" fill="#fbbf9a" />

    {/* Right arm */}
    <path
      d="M182,212 Q210,232 214,265"
      stroke="#a78bfa"
      strokeWidth="17"
      strokeLinecap="round"
    />
    {/* Phone in right hand */}
    <rect x="205" y="257" width="22" height="36" rx="4" fill="#374151" />
    <rect x="208" y="260" width="16" height="28" rx="2" fill="#93c5fd" />
  </svg>
);

type FormSuccessProps = {
  scheduleCallUrl?: string;
};

const FormSuccess = ({ scheduleCallUrl = "#" }: FormSuccessProps) => (
  <div className="flex flex-col items-center text-center py-6 px-4">
    <ThankYouIllustration />
    <p className="text-sm text-gray-500 mt-6 max-w-sm leading-relaxed">
      We value our time, and our team will get back to you as soon as possible.
      <br />
      Meanwhile, let&apos;s set up a time to discuss your business needs.
    </p>
    <Button
      href={scheduleCallUrl}
      variant="outline"
      size="default"
      rounded="default"
      className="mt-6"
    >
      Schedule a call
    </Button>
  </div>
);

export default FormSuccess;
