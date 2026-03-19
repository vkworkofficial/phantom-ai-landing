import { useState, useEffect, useCallback } from 'react';

interface APIKey {
  id: string;
  name: string;
  key_fragment: string;
  last_used: string;
  created: string;
}

interface Workspace {
  id: string;
  name: string;
  members_count: number;
  api_keys: APIKey[];
}

/**
 * useWorkspace
 * 
 * Synchronizes workspace and API key state with the Phantom Substrate.
 */
export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspace = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/workspace/me');
      if (!res.ok) throw new Error('Substrate unreachable');
      const data = await res.json();
      setWorkspace(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateKey = async (name: string) => {
    try {
      const res = await fetch('/api/v1/workspace/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      await fetchWorkspace(); // Refresh list
      return data.key; // Return the full secret once
    } catch (err) {
      console.error('Failed to generate key substrate:', err);
      return null;
    }
  };

  const revokeKey = async (keyId: string) => {
    try {
      await fetch(`/api/v1/workspace/keys/${keyId}`, { method: 'DELETE' });
      await fetchWorkspace();
    } catch (err) {
      console.error('Failed to revoke key substrate:', err);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  return { workspace, loading, error, generateKey, revokeKey, refresh: fetchWorkspace };
}
