<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Database\Eloquent\Relations\Relation;
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

        if($category && $category !== "All") {
            $categories = [$category];
        }
        else {
            $categories = array_keys(Relation::morphMap());
        }

        $phpWord = new PhpWord();

        $paper = new Paper('Legal');

        $section = $phpWord->addSection(['pageSizeW' => $paper->getWidth(), 'pageSizeH' => $paper->getHeight(), 'orientation' => 'landscape']);

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
        
        foreach($categories as $category) {
            $section->addTextBreak();
            $section->addText(
                $category,
                [
                    'size' => 16,
                    'bold' => true,
                ],
                [
                    'alignment' => 'left',
                ]
            );

            $table = $section->addTable([
                'unit' => 'pct',
                'width' => 100 * 50,
                'layout' => 'autofit',
                'borderSize' => 2
            ]);

            $table->addRow();
            $table->addCell()->addText("Type", ["bold" => true]);
            
            switch($category) {
                case 'Motor Vehicle':
                    $table->addCell()->addText("Make/Brand", ["bold" => true]);
                    $table->addCell()->addText("Engine Number", ["bold" => true]);
                    $table->addCell()->addText("Chassis Number", ["bold" => true]);
                    $table->addCell()->addText("Plate Number", ["bold" => true]);
                    break;
    
                case 'Water Craft':
                    $table->addCell()->addText("Make/Brand", ["bold" => true]);
                    $table->addCell()->addText("Body Number", ["bold" => true]);
                    $table->addCell()->addText("Starboard Side", ["bold" => true]);
                    $table->addCell()->addText("Port Side", ["bold" => true]);
                    $table->addCell()->addText("Centerboard", ["bold" => true]);
                    break;
    
                case 'MPS Equipment':
                case 'MPS Equipment Non-Combat':
                    $table->addCell()->addText("Make/Brand", ["bold" => true]);
                    $table->addCell()->addText("Cal", ["bold" => true]);
                    $table->addCell()->addText("Serial Number", ["bold" => true]);
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
                    $table->addCell()->addText("Make/Brand", ["bold" => true]);
                    $table->addCell()->addText("Serial Number", ["bold" => true]);
                    break;
    
                case 'Work/Zoo Animals':
                    $table->addCell()->addText("Name", ["bold" => true]);
                    $table->addCell()->addText("Breed", ["bold" => true]);
                    $table->addCell()->addText("Sex", ["bold" => true]);
                    $table->addCell()->addText("Color", ["bold" => true]);
                    $table->addCell()->addText("Microchip", ["bold" => true]);
                    break;
    
                case 'Quarters':
                    $table->addCell()->addText("Make/Brand", ["bold" => true]);
                    break;
    
                case 'Buildings and Facilities':
                    $table->addCell()->addText("Building Code", ["bold" => true]);
                    $table->addCell()->addText("Description", ["bold" => true]);
                    $table->addCell()->addText("Occupying Office Unit", ["bold" => true]);
                    $table->addCell()->addText("Total Floor Area", ["bold" => true]);
                    $table->addCell()->addText("Building Ownership", ["bold" => true]);
                    break;
            }
            
            $table->addCell()->addText("Acquisition Date", ["bold" => true]);
            $table->addCell()->addText("Quantity", ["bold" => true]);
            $table->addCell()->addText("Location", ["bold" => true]);
            $table->addCell()->addText("Source", ["bold" => true]);
            $table->addCell()->addText("Status", ["bold" => true]);

            $items = Item::with('itemable')->where('itemable_type', $category)->get();

            foreach($items as $item) {
                $table->addRow();
                $table->addCell()->addText($item->type);
                
                switch($item->itemable_type) {
                    case 'Motor Vehicle':
                        $table->addCell()->addText($item->itemable->make);
                        $table->addCell()->addText($item->itemable->engine_num);
                        $table->addCell()->addText($item->itemable->chassis_num);
                        $table->addCell()->addText($item->itemable->plate_num);
                        break;
        
                    case 'Water Craft':
                        $table->addCell()->addText($item->itemable->make);
                        $table->addCell()->addText($item->itemable->body_num);
                        $table->addCell()->addText($item->itemable->starboard_side);
                        $table->addCell()->addText($item->itemable->port_side);
                        $table->addCell()->addText($item->itemable->centerboard);
                        break;
        
                    case 'MPS Equipment':
                    case 'MPS Equipment Non-Combat':
                        $table->addCell()->addText($item->itemable->make);
                        $table->addCell()->addText($item->itemable->cal);
                        $table->addCell()->addText($item->itemable->serial_num);
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
                        $table->addCell()->addText($item->itemable->make);
                        $table->addCell()->addText($item->itemable->serial_num);
                        break;
        
                    case 'Work/Zoo Animals':
                        $table->addCell()->addText($item->itemable->name);
                        $table->addCell()->addText($item->itemable->breed);
                        $table->addCell()->addText($item->itemable->sex);
                        $table->addCell()->addText($item->itemable->color);
                        $table->addCell()->addText($item->itemable->microchip);
                        break;
        
                    case 'Quarters':
                        $table->addCell()->addText($item->itemable->make);
                        break;
        
                    case 'Buildings and Facilities':
                        $table->addCell()->addText($item->itemable->building_code);
                        $table->addCell()->addText($item->itemable->description);
                        $table->addCell()->addText($item->itemable->occupying_office_unit);
                        $table->addCell()->addText($item->itemable->total_floor_area);
                        $table->addCell()->addText($item->itemable->building_ownership);
                        break;
                }
    
                $table->addCell()->addText($item->acquisition_date);
                $table->addCell()->addText($item->quantity);
                $table->addCell()->addText($item->location);
                $table->addCell()->addText($item->source);
                $table->addCell()->addText($item->status);
            }
        }

        $filename = 'IMS-' . $request->query('category') . '_items_list.docx';
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
