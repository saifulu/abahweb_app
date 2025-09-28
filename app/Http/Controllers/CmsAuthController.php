<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\User;

class CmsAuthController extends Controller
{
    /**
     * Show the CMS login form
     */
    public function showLoginForm()
    {
        return view('cms.login');
    }

    /**
     * Handle CMS login request
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        
        // Check if user exists and is admin
        $user = User::where('email', $credentials['email'])->first();
        
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }

        // Check if user is admin
        if ($user->role !== 'admin') {
            return back()->withErrors([
                'email' => 'Akses ditolak. Hanya admin yang dapat mengakses CMS.',
            ]);
        }

        // Login the user
        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        return redirect()->intended('/cms');
    }

    /**
     * Handle CMS logout
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login-cms');
    }

    /**
     * Check if user is authenticated and is admin
     */
    public function checkAuth()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['authenticated' => false], 401);
        }

        return response()->json([
            'authenticated' => true,
            'user' => Auth::user()
        ]);
    }
}
