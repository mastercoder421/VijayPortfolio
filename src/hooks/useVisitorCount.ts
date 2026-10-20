import { useState, useEffect } from 'react';

/**
 * Live visitor counter configuration.
 * Single source of truth for the API base, namespace and key.
 */
export const VISITOR_COUNTER_CONFIG = {
  baseUrl: 'https://abacus.jasoncameron.dev',
  namespace: 'vijay-maheshwari-portfolio',
  key: 'visits',
  timeoutMs: 5000,
  storageKey: 'vm_visitor_count_cache',
};

// Module-level guards to guarantee ONE hit per full page load,
// safe against React 18 StrictMode double-mounting and re-renders.
let hasHitBeenSent = false;
let globalCountPromise: Promise<number | null> | null = null;
let currentVisitorCount: number | null = null;

const getCachedCount = (): number | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(VISITOR_COUNTER_CONFIG.storageKey);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return null;
};

export const useVisitorCount = () => {
  const [count, setCount] = useState<number | null>(() => currentVisitorCount ?? getCachedCount());
  const [isLoading, setIsLoading] = useState<boolean>(() => currentVisitorCount === null);

  useEffect(() => {
    let isMounted = true;

    // Only initiate the /hit fetch once per page session
    if (!hasHitBeenSent) {
      hasHitBeenSent = true;
      globalCountPromise = (async (): Promise<number | null> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), VISITOR_COUNTER_CONFIG.timeoutMs);

        try {
          const url = `${VISITOR_COUNTER_CONFIG.baseUrl}/hit/${VISITOR_COUNTER_CONFIG.namespace}/${VISITOR_COUNTER_CONFIG.key}`;
          const res = await fetch(url, {
            signal: controller.signal,
            headers: {
              Accept: 'application/json',
            },
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`Counter hit failed: HTTP ${res.status}`);
          }

          const data = await res.json();
          if (typeof data?.value === 'number') {
            currentVisitorCount = data.value;
            try {
              localStorage.setItem(VISITOR_COUNTER_CONFIG.storageKey, String(data.value));
            } catch {}
            return data.value;
          }
          return null;
        } catch {
          clearTimeout(timeoutId);
          // On permanent failure, do NOT invent numbers. Return cached value if available or null.
          return getCachedCount();
        }
      })();
    }

    if (globalCountPromise) {
      globalCountPromise.then((resolvedValue) => {
        if (isMounted) {
          setCount(resolvedValue);
          setIsLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, isLoading };
};
