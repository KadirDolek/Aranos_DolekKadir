<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\UserCartCoupon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CouponController extends Controller
{
    /**
     * Afficher tous les coupons (Admin)
     */
    public function index()
    {
        $coupons = Coupon::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Products/Coupons', [
            'coupons' => $coupons
        ]);
    }

    /**
     * Créer un nouveau coupon (Admin)
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:20|unique:coupons,code',
            'percent' => 'required|integer|min:1|max:100'
        ]);

        Coupon::create([
            'code' => strtoupper($request->code),
            'percent' => $request->percent
        ]);

        return back()->with('success', 'Coupon créé');
    }

    /**
     * Supprimer un coupon (Admin)
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return back()->with('success', 'Coupon supprimé');
    }

public function checkCoupon(Request $request)
{
    $request->validate([
        'code' => 'required|string',
        'total' => 'required|numeric|min:0'
    ]);

    $coupon = Coupon::where('code', strtoupper($request->code))->first();

    if (!$coupon) {
        return back()->with('error', 'Code coupon invalide');
    }

    $userId = Auth::id();
    
    // Supprimer l'ancien coupon
    UserCartCoupon::where('user_id', $userId)->delete();

    // Calculer la réduction
    $discount = $coupon->calculateDiscount($request->total);
    $finalTotal = $request->total - $discount;

    // Sauvegarder dans la table user_cart_coupons
    UserCartCoupon::create([
        'user_id' => $userId,
        'coupon_id' => $coupon->id,
        'original_total' => $request->total,
        'discount_amount' => $discount,
        'final_total' => $finalTotal
    ]);

    return back()->with('success', "Coupon {$coupon->code} appliqué !");
}}