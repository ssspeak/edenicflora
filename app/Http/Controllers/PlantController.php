<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlantController extends Controller
{
    public function show($slug)
    {
        // Extract plant ID from slug (e.g., "plant-1" -> 1)
        $id = (int) str_replace('plant-', '', $slug);

        // Mock data - Replace with actual database query
        $plant = [
            'id' => $id,
            'name' => "Plant {$id}",
            'price' => $id * 500,
            'discount' => 36,
            'description' => "A beautiful plant description for plant {$id}",
            'rating' => 5,
            'image' => "/images/plants/plant-{$id}.jpg",
            // Add more details as needed
            'care_instructions' => [
                'water' => 'Water twice a week',
                'sunlight' => 'Partial shade',
                'temperature' => '20-25°C'
            ],
            'features' => [
                'Height: 30-40cm',
                'Indoor/Outdoor',
                'Air Purifying'
            ]
        ];

        return Inertia::render('Plant/Show', [
            'plant' => $plant
        ]);
    }
}
