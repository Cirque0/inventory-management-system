export default function Item({ item }) {
    return (
        <div className="flex flex-col bg-gray-50 rounded-lg">
            <div className="flex">
                <div className="flex flex-col p-4">
                    <span className="text-xs uppercase tracking-wider">
                        {item.itemable_type}
                    </span>
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm">
                        Acquired{" "}
                        {new Date(item.acquisition_date).toLocaleDateString(
                            "en-US",
                            {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            }
                        )}{" "}
                        @ Php {item.acquisition_cost.toLocaleString()}
                    </span>
                    <span className="text-sm">Source: {item.source}</span>
                    <span className="text-sm">Status: {item.status}</span>
                    <div className="flex flex-col mt-4">
                        <span className="text-sm font-bold">{item.quantity} in stock</span>
                        <span className="text-sm font-bold">Php {item.value.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
