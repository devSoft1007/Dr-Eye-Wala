'use client';
import { useEffect } from 'react'
import { signInWithEmail } from '@/utils/supabase/client';

const ClientComponent = () => {
    useEffect(() => {
        const signIn = async () => {
          const { data, err } = await signInWithEmail('bilal@epikdoc.com', '7EMnpg.nT6rTnvD');
          if (data?.session) {
            console.log('Access Token:', data.session.access_token);
          }
          if (err) {
            console.error('Error signing in:', err);
          }
        };
        signIn();
      }, []); // This is just a placeholder. You can remove it if not needed.
    return (
        <div>ClientComponent</div>
    )
}

export default ClientComponent