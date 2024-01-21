export default function MPSEquipmentDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Make:</span> {details.make}</span>
            <span className="text-lg"><span className="font-bold">Cal:</span> {details.cal}</span>
            <span className="text-lg"><span className="font-bold">Serial Number:</span> {details.serial_num}</span>
        </div>
    );
}
