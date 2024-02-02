import { createContext } from 'react';
import type { UserProfile } from '@/types/budgetbuddy';

export const ProfileContext = createContext<UserProfile | null>(null);

