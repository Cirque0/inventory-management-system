export default function MotorVehicleDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Make:</span> {details.make}</span>
            <span className="text-lg"><span className="font-bold">Engine Number:</span> {details.engine_num}</span>
            <span className="text-lg"><span className="font-bold">Chassis Number:</span> {details.chassis_num}</span>
            <span className="text-lg"><span className="font-bold">Plate Number:</span> {details.plate_num}</span>
        </div>
    );
}
