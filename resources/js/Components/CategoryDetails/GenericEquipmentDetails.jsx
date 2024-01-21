export default function GenericEquipmentDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Make:</span> {details.make}</span>
            <span className="text-lg"><span className="font-bold">Serial Number:</span> {details.serial_num}</span>
        </div>
    );
}
