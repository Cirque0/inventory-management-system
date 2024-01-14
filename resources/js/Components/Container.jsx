export default function Container({ children, className = '' }) {
    return (
        <div className={"flex flex-col py-12 lg:px-24 px-4 gap-4 " + className}>
            {children}
        </div>
    );
}
