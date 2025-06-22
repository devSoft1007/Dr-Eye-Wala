# Supabase Edge Functions Development Guide

## Overview
This guide covers developing, testing, and deploying Supabase Edge Functions locally in your Dr. EyeWala project. Edge Functions are server-side TypeScript functions that run close to your users at the edge.

## 🚀 Getting Started

### Prerequisites
- Supabase CLI installed (we use `npx supabase` in this project)
- Your Supabase project credentials
- Deno extension for VS Code (recommended)

### Project Structure
```
supabase/
├── functions/
│   ├── fetch-categories-with-subcategories/
│   │   └── index.ts
│   ├── category/
│   │   └── index.ts
│   └── [other-functions]/
│       └── index.ts
├── config.toml
└── .gitignore
```

## 🔧 Available Functions

### 1. fetch-categories-with-subcategories
**Endpoint:** `GET /functions/v1/fetch-categories-with-subcategories`

**Description:** Fetches all categories with their associated subcategories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Eyeglasses",
    "description": "Description here",
    "image_url": "https://...",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z",
    "subcategories": [
      {
        "id": "uuid",
        "name": "Reading Glasses",
        "parent_id": "parent-uuid"
      }
    ]
  }
]
```

### 2. category
**Endpoints:** 
- `POST /functions/v1/category` - Create category
- `PUT /functions/v1/category/{id}` - Update category
- `DELETE /functions/v1/category/{id}` - Delete category
- `GET /functions/v1/category/{id}` - Get single category

**Create/Update Request Body:**
```json
{
  "name": "Category Name",
  "description": "Optional description",
  "image_url": "https://...",
  "is_active": true,
  "parent_id": null // or parent category ID for subcategories
}
```

## 🛠️ Development Workflow

### 1. Link Your Project (First Time Setup)
```bash
# Replace YOUR_PROJECT_REF with your actual Supabase project reference
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Start Local Development
```bash
# Start the local Supabase stack
npm run supabase:start

# In another terminal, serve functions locally
npm run supabase:serve
```

This will:
- Start a local Postgres database
- Start the local Supabase API
- Serve your Edge Functions at `http://127.0.0.1:54321/functions/v1/`

### 3. Test Functions Locally

**Test fetch-categories:**
```bash
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/fetch-categories-with-subcategories' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json'
```

**Test create category:**
```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/category' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Test Category","description":"Test description"}'
```

### 4. Create New Edge Functions
```bash
# Create a new function
npx supabase functions new your-function-name

# This creates: supabase/functions/your-function-name/index.ts
```

## 🚀 Deployment

### Deploy All Functions
```bash
npm run supabase:deploy
```

### Deploy Specific Functions
```bash
# Deploy categories function
npm run supabase:deploy:categories

# Deploy category management function
npm run supabase:deploy:category
```

### Deploy Individual Function
```bash
npx supabase functions deploy function-name
```

## 🔗 Integration with Your Frontend

### Update RTK Query Services
Once deployed, update your RTK Query base URL to use the live functions:

```typescript
// src/store/services/categories.ts
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://YOUR_PROJECT_REF.supabase.co/functions/v1',
    prepareHeaders: (headers) => {
      headers.set('apikey', SUPABASE_ANON_KEY as string)
      headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`)
      return headers
    },
  }),
  // ... rest of your configuration
})
```

### Environment Variables
Ensure these are set in your environment:

**.env.local (for development):**
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
```

**.env.production (for production):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🧪 Testing Functions

### Unit Testing
Create test files for your functions:

```typescript
// supabase/functions/tests/category.test.ts
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts"

Deno.test("Category function returns valid response", async () => {
  // Your test logic here
})
```

Run tests:
```bash
deno test supabase/functions/tests/
```

### Integration Testing
Test with your actual database:

```bash
# Start local stack with your actual schema
npx supabase start
npx supabase db reset
npx supabase db push
```

## 📋 Best Practices

### 1. Error Handling
Always include proper error handling:

```typescript
try {
  // Your function logic
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
} catch (error) {
  return new Response(JSON.stringify({ error: error.message }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 400,
  })
}
```

### 2. CORS Headers
Always include CORS headers for frontend integration:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders })
}
```

### 3. Environment Variables
Use environment variables for configuration:

```typescript
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)
```

### 4. Type Safety
Define interfaces for your data:

```typescript
interface CategoryData {
  id?: string
  name: string
  description?: string
  image_url?: string
  is_active?: boolean
  parent_id?: string | null
}
```

## 🔍 Debugging

### View Function Logs
```bash
# View logs in real-time
npx supabase functions logs function-name --follow

# View recent logs
npx supabase functions logs function-name
```

### Debug Locally
Add console.log statements to your functions and check the terminal where you're running `npm run supabase:serve`.

### Common Issues

1. **Function not found**: Ensure function is deployed
2. **CORS errors**: Check CORS headers are properly set
3. **Database errors**: Verify RLS policies and permissions
4. **Auth errors**: Ensure proper Authorization header

## 🛡️ Security

### Row Level Security (RLS)
Ensure your database tables have proper RLS policies:

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" 
ON categories FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to manage categories" 
ON categories FOR ALL 
USING (auth.role() = 'authenticated');
```

### Function Security
- Always validate input data
- Use proper authentication
- Implement rate limiting if needed
- Sanitize user inputs

## 📚 Additional Resources

- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [Deno Runtime APIs](https://deno.land/api)
- [TypeScript in Deno](https://deno.land/manual/typescript)

## 🚨 Quick Commands Reference

```bash
# Development
npm run supabase:start        # Start local stack
npm run supabase:serve        # Serve functions locally
npm run supabase:stop         # Stop local stack

# Deployment
npm run supabase:deploy       # Deploy all functions
npm run supabase:deploy:categories  # Deploy specific function

# Utilities
npm run supabase:status       # Check status
npx supabase functions list   # List all functions
npx supabase functions delete function-name  # Delete function
```

## 🎯 Next Steps

1. **Test the existing functions** with your actual data
2. **Create additional functions** for products, brands, etc.
3. **Set up automated deployment** with GitHub Actions
4. **Implement comprehensive testing**
5. **Add monitoring and logging**

Remember to update your frontend API calls to use the new Edge Function endpoints once deployed! 