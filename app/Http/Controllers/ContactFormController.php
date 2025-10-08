<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactFormController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/feature_1.png');

        return Inertia::render('Contact', [
            'bannerImage' => $bannerImage,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'subject' => 'required|string|max:255',
                'message' => 'required|string|min:10',
            ]);

            ContactMessage::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'read' => false,
            ]);

            return redirect()->back()->with('success', 'Votre message a été envoyé avec succès!');
            
        } catch (\Exception $e) {
            \Log::error('Erreur envoi message contact: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Erreur lors de l\'envoi du message.']);
        }
    }
}