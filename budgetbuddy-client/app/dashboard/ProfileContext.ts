import { createContext } from 'react';
import type { TypeUserProfile } from '@/util/db/getUserProfile';

export const ProfileContext = createContext<TypeUserProfile | null>(null);

