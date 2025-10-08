<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/feature_1.png');
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();

        return Inertia::render('Messages', [
            'bannerImage' => $bannerImage,
            'messages' => $messages,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $message = ContactMessage::findOrFail($id);
            
            $message->update([
                'read' => $request->boolean('read', true)
            ]);

            return redirect()->back()->with('success', 'Message marqué comme lu!');
            
        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour message: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Erreur lors de la mise à jour.']);
        }
    }

    public function destroy($id)
    {
        try {
            $message = ContactMessage::findOrFail($id);
            $message->delete();

            return redirect()->back()->with('success', 'Message supprimé avec succès!');
            
        } catch (\Exception $e) {
            \Log::error('Erreur suppression message: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Erreur lors de la suppression.']);
        }
    }
}