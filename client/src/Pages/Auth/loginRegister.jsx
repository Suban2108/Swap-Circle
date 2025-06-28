import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Main_logo from '../../assets/Main-logo(1).png';
import { Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/authContext'; 


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

    const { PORT } = useAuth();

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modeParam = params.get('mode');
        setMode(modeParam || 'signin');
    }, [location.search]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [mode]);

    const isLogin = mode === 'signin';
    const isRegister = mode === 'signup';
    const isForgotPassword = mode === 'forgot-password';
    const isResetPassword = mode === 'reset-password';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegister) {
                if (formValues.password !== formValues.confirmPassword) {
                    toast.error("Passwords do not match");
                    return;
                }

                const res = await axios.post(`${PORT}/api/auth/register`, {
                    email: formValues.email,
                    password: formValues.password,
                    name: formValues.fullName,
                });

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);

                toast.success('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }

            if (isLogin) {
                const res = await axios.post(`${PORT}/api/auth/login`, {
                    email: formValues.email,
                    password: formValues.password,
                });

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);

                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            toast.error(errorMessage);
            console.error('Auth Error:', err);
        }
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
                            <div className="mb-6">
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        try {
                                            const res = await axios.post(`${PORT}/api/auth/google`, {
                                                token: credentialResponse.credential,
                                            });
                                            localStorage.setItem('token', res.data.token);
                                            localStorage.setItem('profileImage', res.data.user.picture);
                                            toast.success('Logged in with Google!');
                                            setTimeout(() => {
                                                window.location.href = '/';
                                            }, 1500);
                                        } catch (err) {
                                            toast.error('Google login failed');
                                            console.error('Google Login failed:', err);
                                        }
                                    }}

                                />
                            </div>
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
