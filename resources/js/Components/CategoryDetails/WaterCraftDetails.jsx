export default function WaterCraftDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Type:</span> {details.type}</span>
            <span className="text-lg"><span className="font-bold">Make:</span> {details.make}</span>
            <span className="text-lg"><span className="font-bold">Body Number:</span> {details.body_num}</span>
            <span className="text-lg"><span className="font-bold">Starboard Side:</span> {details.starboard_side}</span>
            <span className="text-lg"><span className="font-bold">Port Side:</span> {details.port_side}</span>
            <span className="text-lg"><span className="font-bold">Centerboard:</span> {details.centerboard}</span>
        </div>
    );
}
