# Supabase Edge Functions Setup

## Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
# Production Supabase (when not using local development)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Local Development Supabase (when using npm run supabase:start)
# Uncomment these when developing locally:
# NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Your Supabase Project Reference (for linking)
SUPABASE_PROJECT_REF=your_project_ref_here
```

## Quick Start

1. **Link your project:**
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

2. **Start local development:**
   ```bash
   npm run supabase:start
   npm run supabase:serve
   ```

3. **Deploy functions:**
   ```bash
   npm run supabase:deploy
   ```

## Available Functions

### `fetch-categories-with-subcategories`
- **Method:** GET
- **URL:** `/functions/v1/fetch-categories-with-subcategories`
- **Description:** Fetches all categories with subcategories

### `category`
- **Methods:** POST, PUT, DELETE, GET
- **URL:** `/functions/v1/category` (with optional ID for specific operations)
- **Description:** Full CRUD operations for categories

## Local Testing

Test functions locally at: `http://127.0.0.1:54321/functions/v1/`

Example:
```bash
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/fetch-categories-with-subcategories' \
  --header 'Authorization: Bearer YOUR_ANON_KEY'
```

For complete documentation, see: `docs/SUPABASE_EDGE_FUNCTIONS.md` 