export default function Delete({ color = "#ffff", size = "30" }) {

    return <svg aria-hidden="true"
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
        <path d="M3 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
        <path d="M14 8h-4v8h4" />
        <path d="M10 12h2.5" />
        <path d="M17 8v8h4" />
    </svg>
}
