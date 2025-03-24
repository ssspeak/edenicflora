<?php

namespace App\Http\Controllers;

use App\Models\Slide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Inertia\Response;


use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\JpegEncoder;
use Intervention\Image\Encoders\PngEncoder;

use Illuminate\Support\Facades\Storage;

class SlideController extends Controller {
    public function index() {
        $slides = Slide::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Slider', ['slides' => $slides]);
    }

    public function store(Request $request)
    {
        //Log::info('Received store request', $request->all()); // Log request data

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:30',
            'button_link' => 'nullable|url|max:255',
            'order' => 'required|integer',
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        //Log::info('Validation passed', $validatedData);

        try {
        // Create ImageManager instance
        $manager = new ImageManager(new Driver());

        // Get uploaded image
        $image = $request->file('image');
        $extension = $image->getClientOriginalExtension();
        $imagePath = 'slides/' . uniqid() . '.' . $extension;

        //Log::info('Processing image', ['path' => $imagePath]);

        // Choose encoder based on file type
        $encoder = $extension === 'png' ? new PngEncoder(90) : new JpegEncoder(90);

        // Resize and encode image
        $resizedImage = $manager->read($image)
            ->resize(1200, 400)
            ->encode($encoder);

        // Save image to storage
        Storage::disk('public')->put($imagePath, $resizedImage->toString());


        //Log::info('Image stored successfully', ['path' => $imagePath]);

        $slide = Slide::create([
            'title' => $request->title,
            'description' => $request->description,
            'button_text' => $request->button_text,
            'button_link' => $request->button_link,
            'image' => $imagePath,
            'order' => $request->order, // Auto-increment order
        ]);

        //Log::info('Slide created successfully', ['slide' => $slide]);

        return redirect()->route('slider.index')->with('success', 'Slide added successfully.');
        } catch (\Exception $e) {
            //Log::error('Error in storing slide', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    public function destroy($id)
    {
        $slide = Slide::findOrFail($id);

        // Delete image from storage
        if ($slide->image && Storage::disk('public')->exists($slide->image)) {
            Storage::disk('public')->delete($slide->image);
        }

        // Delete slide record from database
        $slide->delete();

        return redirect()->route('slider.index')->with('success', 'Slide deleted successfully.');
    }

    public function updateOrder(Request $request) {
        foreach ($request->slides as $slide) {
            Slide::where('id', $slide['id'])->update(['order' => $slide['order']]);
        }
        return response()->json(['message' => 'Slide order updated successfully']);
    }

    public function update(Request $request, Slide $slide)
    {
        //Log::debug('Received update request', $request);
        $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'nullable|string|max:200',
            'button_text' => 'nullable|string|max:30',
            'button_link' => 'nullable|url|max:255',
            'order' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        try {
            if ($request->hasFile('image')) {
                // Delete old image if it exists
                if ($slide->image) {
                    Storage::disk('public')->delete($slide->image);
                }

                // Create ImageManager instance
                $manager = new ImageManager(new Driver());

                // Get uploaded image
                $image = $request->file('image');
                $extension = $image->getClientOriginalExtension();
                $imagePath = 'slides/' . uniqid() . '.' . $extension;

                // Choose encoder based on file type
                $encoder = $extension === 'png' ? new PngEncoder(90) : new JpegEncoder(90);

                // Resize and encode image
                $resizedImage = $manager->read($image)
                    ->resize(1200, 400)
                    ->encode($encoder);

                // Save image to storage
                Storage::disk('public')->put($imagePath, $resizedImage->toString());

                // Assign new image path to slide
                $slide->image = $imagePath;
            }

            // Update other slide details
            $slide->title = $request->title;
            $slide->description = $request->description;
            $slide->button_text = $request->button_text;
            $slide->button_link = $request->button_link;
            $slide->order = $request->order;

            // Save slide with updated image and details
            $slide->save();

            return redirect()->route('slider.index')->with('success', 'Slide updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }




}
