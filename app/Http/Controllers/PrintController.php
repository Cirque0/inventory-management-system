<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Style\Paper;

class PrintController extends Controller
{
    //
    public function print(Request $request) {
        $category = $request->query('category') ?: 'All';
        $itemsQuery = Item::with(['itemable']);

        if($category && $category !== "All") {
            $itemsQuery->where('itemable_type', $category);
        }

        $items = $itemsQuery->get();

        $phpWord = new PhpWord();

        $paper = new Paper('Legal');

        $section = $phpWord->addSection(['pageSizeW' => $paper->getWidth(), 'pageSizeH' => $paper->getHeight(), 'orientation' => 'portrait']);

        $section->addText(
            "Inventory Management System",
            [
                'bold' => true,
                'allCaps' => true,
                'size' => 20,
            ],
            [
                'alignment' => 'center'
            ]
        );

        $section->addText(
            "List of " . $category . " items as of " . date("F j, Y"),
            [
                'size' => 16,
            ],
            [
                'alignment' => 'center'
            ]
        );

        $phpWord->addNumberingStyle(
            'multilevel',
            array(
                'type' => 'multilevel',
                'levels' => array(
                    array('format' => 'decimal', 'text' => '%1.', 'left' => 360, 'hanging' => 360, 'tabPos' => 360),
                    array('format' => 'bullet', 'text' => '%2.', 'left' => 720, 'hanging' => 360, 'tabPos' => 720),
                )
            )
        );
        
        foreach($items as $item) {
            $section->addListItem($item->type . ' (' . $item->itemable_type . ')', 0, [
                'bold' => true,
                'size' => 12,
            ], 'multilevel');
            
            switch($item->itemable_type) {
                case 'Motor Vehicle':
                    // $itemable = MotorVehicle::create($request->only(['make', 'engine_num', 'chassis_num', 'plate_num']));
                    $section->addListItem("Make/Brand: " . $item->itemable->make, 1, ['size' => 12]);
                    $section->addListItem("Engine Number: " . $item->itemable->engine_num, 1, ['size' => 12]);
                    $section->addListItem("Chassis Number: " . $item->itemable->chassis_num, 1, ['size' => 12]);
                    $section->addListItem("Plate Number: " . $item->itemable->plate_num, 1, ['size' => 12]);
                    break;
    
                case 'Water Craft':
                    // $itemable = WaterCraft::create($request->only(['make', 'body_num', 'starboard_side', 'port_side', 'centerboard']));
                    $section->addListItem("Make/Brand: " . $item->itemable->make, 1, ['size' => 12]);
                    $section->addListItem("Body Number: " . $item->itemable->body_num, 1, ['size' => 12]);
                    $section->addListItem("Starboard Side: " . $item->itemable->starboard_side, 1, ['size' => 12]);
                    $section->addListItem("Port Side: " . $item->itemable->port_side, 1, ['size' => 12]);
                    $section->addListItem("Centerboard: " . $item->itemable->centerboard, 1, ['size' => 12]);
                    break;
    
                case 'MPS Equipment':
                    // $itemable = MPSEquipment::create($request->only(['make', 'cal', 'serial_num']));
                    $section->addListItem("Make/Brand: " . $item->itemable->make, 1, ['size' => 12]);
                    $section->addListItem("Cal: " . $item->itemable->cal, 1, ['size' => 12]);
                    $section->addListItem("Serial Number: " . $item->itemable->serial_num, 1, ['size' => 12]);
                    $section->addListItem("Plate Number: " . $item->itemable->plate_num, 1, ['size' => 12]);
                    break;
    
                case 'Communications Equipment':
                case 'Technical Scientific Equipment':
                case 'ICT':
                case 'Office Equipment':
                case 'Furniture Fixture':
                case 'Medical Equipment':
                case 'Other Machinery and Equipment':
                case 'Disaster Response and Rescue Equipment':
                case 'Other Property Equipment':
                case 'Office Supplies':
                    // $itemable = DRREquipment::create($request->only(['make', 'serial_num']));
                    $section->addListItem("Make/Brand: " . $item->itemable->make, 1, ['size' => 12]);
                    $section->addListItem("Serial Number: " . $item->itemable->serial_num, 1, ['size' => 12]);
                    break;
    
                case 'Work/Zoo Animals':
                    // $itemable = Animal::create($request->only(['name', 'breed', 'sex', 'color', 'microchip']));
                    $section->addListItem("Name: " . $item->itemable->name, 1, ['size' => 12]);
                    $section->addListItem("Breed: " . $item->itemable->breed, 1, ['size' => 12]);
                    $section->addListItem("Sex: " . $item->itemable->sex, 1, ['size' => 12]);
                    $section->addListItem("Color: " . $item->itemable->color, 1, ['size' => 12]);
                    $section->addListItem("Microchip: " . $item->itemable->microchip, 1, ['size' => 12]);
                    break;
    
                case 'Quarters':
                    // $itemable = Quarter::create($request->only(['make']));
                    $section->addListItem("Make/Brand: " . $item->itemable->make, 1, ['size' => 12]);
                    break;
    
                case 'Buildings and Facilities':
                    // $itemable = Facility::create($request->only(['building_code', 'description', 'occupying_office_unit', 'total_floor_area', 'repair_date', 'repair_cost', 'building_ownership']));
                    $section->addListItem("Building Code: " . $item->itemable->building_code, 1, ['size' => 12]);
                    $section->addListItem("Description: " . $item->itemable->description, 1, ['size' => 12]);
                    $section->addListItem("Occupying Office Unit: " . $item->itemable->occupying_office_unit, 1, ['size' => 12]);
                    $section->addListItem("Total Floor Area: " . $item->itemable->total_floor_area, 1, ['size' => 12]);
                    $section->addListItem("Repair Date: " . $item->itemable->repair_date, 1, ['size' => 12]);
                    $section->addListItem("Repair Cost: " . number_format($item->itemable->repair_cost, 2, ".", ","), 1, ['size' => 12]);
                    $section->addListItem("Building Ownership: " . $item->itemable->building_ownership, 1, ['size' => 12]);
                    break;
            }

            $section->addListItem("Acquired " . $item->acquisition_date . " @ " . "Php " . number_format($item->acquisition_cost, 2, ".", ","), 1, ['size' => 12]);
            $section->addListItem($item->quantity . " in stock - Php " . number_format($item->value, 2, ".", ","), 1, ['size' => 12]);
            $section->addListItem("Location: " . $item->location, 1, ['size' => 12]);
            $section->addListItem("Source: " . $item->source, 1, ['size' => 12]);
            $section->addListItem("Status: " . $item->status, 1, ['size' => 12]);
        }

        $filename = 'IMS-' . $category . '_items_list.docx';
        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save(public_path($filename));

        return response()->download(public_path($filename));
        // return Response::download(public_path($filename), $filename, [
        //     "Content-Description" => "File Transfer",
        //     "Content-Disposition" => '"attachment; filename="' . $filename . '"',
        //     'Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //     "Content-Transfer-Encoding" => "binary",
        //     "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
        //     "Expire" => "0"
        // ]);

        // header("Content-Description: File Transfer");
        // header('Content-Disposition: attachment; filename="' . $filename . '"');
        // header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        // header('Content-Transfer-Encoding: binary');
        // header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        // header('Expires: 0');
        // $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
        // $xmlWriter->save("php://output");

        // return back();
    }
}
