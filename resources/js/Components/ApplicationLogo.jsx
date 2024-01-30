export default function ApplicationLogo({ className = "", ...props }) {
    return (
        <img
            src="/amazon.jpg"
            alt="Logo"
            className={
                "aspect-square object-cover object-center rounded-lg " +
                className
            }
            {...props}
        />
    );
}
