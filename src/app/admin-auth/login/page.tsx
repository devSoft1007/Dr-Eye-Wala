'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { useLoginSignUpForm, LoginFormData, SignupFormData } from '@/hooks/admin/useLoginSignupForm';
import { signInWithEmail, signUpWithEmail } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, reset } = useLoginSignUpForm(isLogin);

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    setIsLoading(true);
    setAuthError(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        // Handle login
        const loginData = data as LoginFormData;
        const { data: authData, err } = await signInWithEmail(loginData.email, loginData.password);
        
        if (err) {
          setAuthError(err.message);
        } else if (authData.user) {
          setSuccessMessage('Login successful! Redirecting...');
          // Redirect to admin dashboard
          setTimeout(() => {
            router.push('/admin');
          }, 1000);
        }
      } else {
        // Handle signup
        const signupData = data as SignupFormData;
        const { data: authData, err } = await signUpWithEmail(
          signupData.email, 
          signupData.password, 
          signupData.name
        );
        
        if (err) {
          setAuthError(err.message);
        } else if (authData.user) {
          setSuccessMessage('Account created successfully! Please check your email to verify your account.');
          // Optionally switch to login mode after successful signup
          setTimeout(() => {
            setIsLogin(true);
            reset();
          }, 2000);
        }
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
    setSuccessMessage(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-white/70">
            {isLogin ? 'Sign in to your account to continue' : 'Sign up to get started with your account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Global Auth Error */}
          {authError && (
            <Alert className="bg-red-500/20 border-red-500/30">
              <AlertDescription className="text-red-200">{authError}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {successMessage && (
            <Alert className="bg-green-500/20 border-green-500/30">
              <AlertDescription className="text-green-200">{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name')}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                {!isLogin && 'name' in errors && errors.name && (
                  <Alert className="bg-red-500/20 border-red-500/30">
                    <AlertDescription className="text-red-200">{errors.name.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              {errors.email && (
                <Alert className="bg-red-500/20 border-red-500/30">
                  <AlertDescription className="text-red-200">{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <Alert className="bg-red-500/20 border-red-500/30">
                  <AlertDescription className="text-red-200">{errors.password.message}</AlertDescription>
                </Alert>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-white/50 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!isLogin && 'confirmPassword' in errors && errors.confirmPassword && (
                  <Alert className="bg-red-500/20 border-red-500/30">
                    <AlertDescription className="text-red-200">{errors.confirmPassword.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Social + toggle */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/70">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Chrome className="w-4 h-4 mr-2" /> Google
            </Button>
          </div>

          <div className="text-center">
            <p className="text-white/70">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-purple-300 hover:text-purple-200 font-semibold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}