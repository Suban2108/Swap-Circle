import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Main_logo from '../../assets/Main-logo(1).png';
import { Link, useLocation } from 'react-router-dom';

const AuthForms = () => {
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mode, setMode] = useState("signin");

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modeParam = params.get('mode');
        setMode(modeParam || 'signin');
    }, [location.search]);
    
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Smooth scroll
}, [mode]);

    const isLogin = mode === 'signin';
    const isRegister = mode === 'signup';
    const isForgotPassword = mode === 'forgot-password';
    const isResetPassword = mode === 'reset-password';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${mode} form submitted:`, formValues);
    };

    const handleGoogleAuth = () => {
        console.log('Google auth clicked');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-white to-orange-700 flex items-center justify-center py-[100px]">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <img src={Main_logo} className="w-[73px] h-[73px]" alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isLogin && 'Welcome Back'}
                        {isRegister && 'Create Account'}
                        {isForgotPassword && 'Forgot Password'}
                        {isResetPassword && 'Reset Password'}
                    </h1>
                    <p className="text-gray-600">
                        {isLogin && 'Sign in to your account'}
                        {isRegister && 'Join us today'}
                        {isForgotPassword && 'We’ll email you a reset link'}
                        {isResetPassword && 'Set a new password for your account'}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                    {(isLogin || isRegister) && (
                        <>
                            <button
                                onClick={handleGoogleAuth}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium hover:border-blue-300 hover:shadow-md transition-all duration-200 mb-6"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">or</span>
                                </div>
                            </div>
                        </>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isRegister && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-800 capitalize">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formValues.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-4 py-3 border-2 rounded-xl border-gray-200 text-black focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {(isLogin || isRegister || isForgotPassword || isResetPassword) && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 border-2 rounded-xl border-gray-200 text-black focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {(isLogin || isRegister || isResetPassword) && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formValues.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-10 py-3 border-2 rounded-xl border-gray-200 text-black focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {(isRegister || isResetPassword) && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 capitalize">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formValues.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="w-full pl-10 pr-10 py-3 border-2 rounded-xl border-gray-200 text-black focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg"
                        >
                            {isLogin && 'Sign In'}
                            {isRegister && 'Create Account'}
                            {isForgotPassword && 'Send Reset Link'}
                            {isResetPassword && 'Reset Password'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        {isLogin && (
                            <>
                                <p>
                                    Don’t have an account?{' '}
                                    <Link to="/login?mode=signup" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Sign up
                                    </Link>
                                </p>
                                <p className="mt-2">
                                    <Link to="/login?mode=forgot-password" className="text-orange-600 hover:underline font-medium">
                                        Forgot Password?
                                    </Link>
                                </p>
                            </>
                        )}

                        {isRegister && (
                            <p>
                                Already have an account?{' '}
                                <Link to="/login?mode=signin" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        )}

                        {(isForgotPassword || isResetPassword) && (
                            <p>
                                Remember your password?{' '}
                                <Link to="/login?mode=signin" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Back to Sign in
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForms;
