export default function Put({ color = "#ffff", size = "30" }) {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        stroke-width="1.50"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" />
        <path d="M17 8h4" />
        <path d="M19 8v8" />
        <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
    </svg>
}
