const ArrowIcon = ({ color }: { color?: "white" | "black" }) => (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 8L8 0.5L9.05 1.55L2.6 8L9.05 14.45L8 15.5L0.5 8Z" fill={color || "#333333"} />
    </svg>
);

export default ArrowIcon;