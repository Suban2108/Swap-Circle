import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Main_logo from '../../assets/Main-logo(1).png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/authContext';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../../Components/ui/select';

const AuthForms = () => {
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        token: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mode, setMode] = useState('signin');

    const { PORT } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modeParam = params.get('mode');
        const tokenParam = params.get('token');
        setMode(modeParam || 'signin');
        if (modeParam === 'reset-password' && tokenParam) {
            setFormValues((prev) => ({ ...prev, token: tokenParam }));
        }
    }, [location.search]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [mode]);

    const isLogin = mode === 'signin';
    const isRegister = mode === 'signup';
    const isForgotPassword = mode === 'forgot-password';
    const isResetPassword = mode === 'reset-password';

    useEffect(() => {
        if (isResetPassword) {
            toast('This reset page may have opened in a new tab.', {
                duration: 5000,
                position: 'top-center',
            });
        }
    }, [isResetPassword]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const instance = axios.create({
                baseURL: PORT,
                withCredentials: true, // ✅ important
            });

            if (isRegister) {
                if (!formValues.role) return toast.error("Please select a role");
                if (formValues.password !== formValues.confirmPassword) return toast.error("Passwords do not match");

                await instance.post('/api/auth/register', {
                    email: formValues.email,
                    password: formValues.password,
                    name: formValues.fullName,
                    role: formValues.role,
                });

                toast.success("Registration successful!");
                setTimeout(() => (window.location.href = "/"), 1500);
            }

            if (isLogin) {
                if (!formValues.role) return toast.error("Please select a role");

                await instance.post('/api/auth/login', {
                    email: formValues.email,
                    password: formValues.password,
                    role: formValues.role,
                });

                toast.success("Login successful!");
                setTimeout(() => navigate('/'), 1500);
            }

            if (isForgotPassword) {
                await instance.post('/api/auth/forgot-password', {
                    email: formValues.email,
                });
                toast.success("Reset email sent if user exists.");
            }

            if (isResetPassword) {
                if (formValues.password !== formValues.confirmPassword) {
                    return toast.error("Passwords do not match");
                }

                await instance.post('/api/auth/reset-password', {
                    token: formValues.token,
                    email: formValues.email,
                    password: formValues.password,
                    confirmPassword: formValues.confirmPassword,
                });

                toast.success("Password reset successful.");
                setTimeout(() => (window.location.href = "/login?mode=signin"), 1500);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
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
                                            const res = await axios.post(`${PORT}/api/auth/google`,
                                                { token: credentialResponse.credential, },
                                                { withCredentials: true });
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

                        {(isLogin || isRegister) && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-800 capitalize">Select Role</label>
                                <Select
                                    value={formValues.role}
                                    onValueChange={(val) => setFormValues((prev) => ({ ...prev, role: val }))}
                                >
                                    <SelectTrigger className="w-full border-2 rounded-xl border-gray-200 text-black">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

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
