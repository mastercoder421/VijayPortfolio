import { useState, useEffect } from 'react';
import { portfolioData, CompetitiveProgrammingProfile } from '../data/portfolio';

export interface LiveStatsData {
  cfRating: number;
  cfMaxRating: number;
  cfRank: string;
  ghRepos: number;
  ghFollowers: number;
  isLive: boolean;
  isLoading: boolean;
}

const CACHE_KEY = 'portfolio_live_stats_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export const useLiveStats = (): LiveStatsData => {
  // Static fallback values grounded in portfolio.ts
  const fallbackCfStat = portfolioData.cpStats.profiles.find(
    (cp: CompetitiveProgrammingProfile) => cp.platform.toLowerCase() === 'codeforces'
  );
  const staticCfRating = fallbackCfStat
    ? Number(fallbackCfStat.ratingValue) || 1409
    : 1409;
  const staticCfRank = fallbackCfStat?.rankTitle || 'Specialist';

  const [stats, setStats] = useState<LiveStatsData>({
    cfRating: staticCfRating,
    cfMaxRating: staticCfRating,
    cfRank: staticCfRank,
    ghRepos: 10,
    ghFollowers: 5,
    isLive: false,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      // 1. Check sessionStorage cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (isMounted) {
              setStats({
                cfRating: parsed.cfRating,
                cfMaxRating: parsed.cfMaxRating,
                cfRank: parsed.cfRank,
                ghRepos: parsed.ghRepos,
                ghFollowers: parsed.ghFollowers,
                isLive: true,
                isLoading: false,
              });
              return;
            }
          }
        }
      } catch {
        // Ignore cache parse errors
      }

      // 2. Fetch live endpoints in parallel
      try {
        const [cfResponse, ghResponse] = await Promise.allSettled([
          fetch('https://codeforces.com/api/user.info?handles=RoarX2', {
            headers: { Accept: 'application/json' },
          }),
          fetch('https://api.github.com/users/mastercoder421', {
            headers: { Accept: 'application/json' },
          }),
        ]);

        let liveRating = staticCfRating;
        let liveMaxRating = staticCfRating;
        let liveRank = staticCfRank;
        let liveRepos = 10;
        let liveFollowers = 5;
        let hasSuccess = false;

        // Parse Codeforces API
        if (cfResponse.status === 'fulfilled' && cfResponse.value.ok) {
          try {
            const cfData = await cfResponse.value.json();
            if (cfData.status === 'OK' && cfData.result?.[0]) {
              const user = cfData.result[0];
              liveRating = user.rating || liveRating;
              liveMaxRating = user.maxRating || liveMaxRating;
              liveRank = user.rank
                ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1)
                : liveRank;
              hasSuccess = true;
            }
          } catch {
            // Silently fall back
          }
        }

        // Parse GitHub API
        if (ghResponse.status === 'fulfilled' && ghResponse.value.ok) {
          try {
            const ghData = await ghResponse.value.json();
            if (typeof ghData.public_repos === 'number') {
              liveRepos = ghData.public_repos;
              liveFollowers = ghData.followers ?? 5;
              hasSuccess = true;
            }
          } catch {
            // Silently fall back
          }
        }

        if (isMounted) {
          const newStats: LiveStatsData = {
            cfRating: liveRating,
            cfMaxRating: liveMaxRating,
            cfRank: liveRank,
            ghRepos: liveRepos,
            ghFollowers: liveFollowers,
            isLive: hasSuccess,
            isLoading: false,
          };

          setStats(newStats);

          if (hasSuccess) {
            try {
              sessionStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  ...newStats,
                  timestamp: Date.now(),
                })
              );
            } catch {
              // Ignore cache write errors
            }
          }
        }
      } catch {
        // Silently fall back to static
        if (isMounted) {
          setStats((prev) => ({
            ...prev,
            isLive: false,
            isLoading: false,
          }));
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [staticCfRating, staticCfRank]);

  return stats;
};
