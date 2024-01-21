export default function QuarterDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Make:</span> {details.make}</span>
        </div>
    );
}
