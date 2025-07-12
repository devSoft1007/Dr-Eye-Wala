# Authentication Setup with Supabase

This document explains the authentication system implemented for the Dr Eye Wala application.

## Features

- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ Form Validation with Zod
- ✅ Password Confirmation
- ✅ Email Verification
- ✅ Loading States
- ✅ Error Handling
- ✅ Success Messages
- ✅ TypeScript Support

## Files Modified/Created

### 1. `src/utils/supabase/client.ts`
- Added `signUpWithEmail()` function for user registration
- Added `signOut()` function for user logout
- Added `getCurrentUser()` function for getting current user
- Added environment variable validation

### 2. `src/app/admin-auth/login/page.tsx`
- Implemented complete authentication flow
- Added loading states and error handling
- Added success messages and redirects
- Fixed TypeScript errors with proper type checking

### 3. `src/hooks/admin/useLoginSignupForm.ts`
- Already had proper validation schemas
- Login schema: email + password (6+ chars)
- Signup schema: name + email + password (8+ chars) + confirm password

### 4. `src/contexts/AuthContext.tsx` (New)
- Created authentication context for global state management
- Handles user session management
- Provides auth state throughout the app

## Usage

### Environment Variables Required

Make sure you have these environment variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Authentication Flow

1. **Sign Up**: User fills form with name, email, password, and password confirmation
2. **Validation**: Client-side validation with Zod schemas
3. **Supabase Registration**: Calls `signUpWithEmail()` function
4. **Email Verification**: Supabase sends verification email
5. **Success**: User sees success message and form switches to login

6. **Sign In**: User fills form with email and password
7. **Validation**: Client-side validation
8. **Supabase Authentication**: Calls `signInWithEmail()` function
9. **Success**: User is redirected to `/admin` dashboard

### Using the AuthContext

To use the authentication context in your components:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.user_metadata?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Security Notes

- Passwords are hashed by Supabase
- Email verification is required for new accounts
- Session management is handled by Supabase
- All API calls are secured with Row Level Security (RLS)

## Next Steps

1. Set up email templates in Supabase dashboard
2. Configure RLS policies for your database tables
3. Add the AuthProvider to your app layout
4. Implement protected routes using the auth context
5. Add password reset functionality if needed
