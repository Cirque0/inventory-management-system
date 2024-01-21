export default function AnimalDetails({ details }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg"><span className="font-bold">Name:</span> {details.name}</span>
            <span className="text-lg"><span className="font-bold">Breed:</span> {details.breed}</span>
            <span className="text-lg"><span className="font-bold">Sex:</span> {details.sex}</span>
            <span className="text-lg"><span className="font-bold">Color:</span> {details.color}</span>
            <span className="text-lg"><span className="font-bold">Microchip:</span> {details.microchip}</span>
        </div>
    );
}
