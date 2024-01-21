import Card from "@/Components/Card";
import AnimalDetails from "@/Components/CategoryDetails/AnimalDetails";
import FacilitiesDetails from "@/Components/CategoryDetails/FacilitiesDetails";
import GenericEquipmentDetails from "@/Components/CategoryDetails/GenericEquipmentDetails";
import MPSEquipmentDetails from "@/Components/CategoryDetails/MPSEquipmentDetails";
import MotorVehicleDetails from "@/Components/CategoryDetails/MotorVehicleDetails";
import QuarterDetails from "@/Components/CategoryDetails/QuarterDetails";
import WaterCraftDetails from "@/Components/CategoryDetails/WaterCraftDetails";

export default function ItemDetails({ item }) {
    return (
        <>
            <Card>
                <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wider">
                        {item.itemable_type}
                    </span>
                    <span className="text-2xl font-bold">{item.type}</span>
                    <span className="text-lg">
                        {item.itemable_type == "Buildings and Facilities" && "Constructed/"}Acquired{" "}
                        {new Date(item.acquisition_date).toLocaleDateString(
                            "en-US",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}{" "}
                        @ Php {item.acquisition_cost.toLocaleString()}
                    </span>
                    <span className="text-lg">Source: {item.source}</span>
                    <span className="text-lg">Status: {item.status}</span>
                    <span className="text-lg">Location: {item.location}</span>
                    <div className="flex flex-col mt-4">
                        <span className="text-lg font-bold">
                            {item.quantity} in stock
                        </span>
                        <span className="text-lg font-bold">
                            Php {item.value.toLocaleString()}
                        </span>
                    </div>
                </div>
            </Card>
            <Card>
                <Card.Header>Details</Card.Header>
                {(() => {
                    switch(item.itemable_type) {
                        case "Motor Vehicle":
                            return <MotorVehicleDetails details={item.itemable} />
                        case "Water Craft":
                            return <WaterCraftDetails details={item.itemable} />
                        case "MPS Equipment":
                            return <MPSEquipmentDetails details={item.itemable} />
                        case "Communications Equipment":
                        case "Technical Scientific Equipment":
                        case "ICT":
                        case "Office Equipment":
                        case "Furniture Fixture":
                        case "Medical Equipment":
                        case "Other Machinery and Equipment":
                        case "Disaster Response and Rescue Equipment":
                        case "Other Property Equipment":
                        case "Office Supplies":
                            return <GenericEquipmentDetails details={item.itemable} />
                        case "Work/Zoo Animals":
                            return <AnimalDetails details={item.itemable} />
                        case "Quarters":
                            return <QuarterDetails details={item.itemable} />
                        case "Buildings and Facilities":
                            return <FacilitiesDetails details={item.itemable} />
                    }
                })()}
            </Card>
        </>
    );
}
