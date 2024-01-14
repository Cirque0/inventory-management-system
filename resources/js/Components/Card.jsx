const Card = ({ children, className = "" }) => {
    return (
        <div className={"flex flex-col bg-white rounded-lg p-4 gap-4 shadow " + className}>
            {children}
        </div>
    );
};

const Header = ({ children, className = "" }) => {
    return (
        <header>
            <h2 className={"text-lg font-medium text-gray-900 " + className}>
                {children}
            </h2>
        </header>
    );
};

Card.Header = Header;

export default Card;
