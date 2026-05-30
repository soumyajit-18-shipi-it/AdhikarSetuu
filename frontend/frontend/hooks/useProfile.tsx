"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ProfilePayload } from '@/services/api';

type MatchResult = any;

type ProfileContextType = {
  profile: ProfilePayload | null;
  setProfile: (p: ProfilePayload | null) => void;
  matchResult: MatchResult | null;
  setMatchResult: (m: MatchResult | null) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'adhikar.profile.v1';

export const ProfileProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [profile, setProfileState] = useState<ProfilePayload | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { profile?: ProfilePayload; matchResult?: MatchResult };
        return parsed.profile ?? null;
      }
    } catch (e) {
      // ignore
    }
    return null;
  });

  const [matchResult, setMatchResult] = useState<MatchResult | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { profile?: ProfilePayload; matchResult?: MatchResult };
        return parsed.matchResult ?? null;
      }
    } catch (e) {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, matchResult }));
    } catch (e) {
      // ignore
    }
  }, [profile, matchResult]);

  const setProfile = (p: ProfilePayload | null) => setProfileState(p);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, matchResult, setMatchResult }}>
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
