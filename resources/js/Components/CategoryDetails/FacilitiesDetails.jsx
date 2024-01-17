export default function FacilitiesDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Building Code:</span> {details.building_code}</span>
            <span className="text-lg"><span className="font-bold">Type:</span> {details.type}</span>
            <span className="text-lg"><span className="font-bold">Description:</span> {details.description}</span>
            <span className="text-lg"><span className="font-bold">Occupying Office Unit:</span> {details.occupying_office_unit}</span>
            <span className="text-lg"><span className="font-bold">Total Floor Area:</span> {details.total_floor_area}</span>
            <span className="text-lg"><span className="font-bold">Date of Repair:</span> {details.repair_date || "N/A"}</span>
            <span className="text-lg"><span className="font-bold">Cost of Repair:</span> {details.repair_cost || "N/A"}</span>
            <span className="text-lg"><span className="font-bold">Building Ownership:</span> {details.building_ownership}</span>
        </div>
    );
}
