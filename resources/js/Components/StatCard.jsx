const StatCard = ({ children, className = "" }) => {
    return (
        <div
            className={
                "flex flex-col p-4 gap-2 bg-white font-bold border-l-4 border-cyan-700 rounded-lg shadow " +
                className
            }
        >
            {children}
        </div>
    );
};

const Header = ({ children, className }) => {
    return <span className={"text-cyan-700 " + className}>{children}</span>;
};

const Content = ({ children, className }) => {
    return <span className={"text-xl " + className}>{children}</span>;
};

StatCard.Header = Header;
StatCard.Content = Content;

export default StatCard;
