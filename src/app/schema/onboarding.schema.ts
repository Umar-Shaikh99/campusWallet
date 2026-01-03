import { z } from 'zod';

// Regex patterns
const namePattern = /^[a-zA-Z\s]+$/;
const collegeNamePattern = /^[a-zA-Z\s.,&'-]+$/;

// Final Details / Onboarding completion schema
export const finalDetailsSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .min(2, 'Name must be at least 2 characters')
    .regex(namePattern, 'Name can only contain letters and spaces'),
  collegeName: z
    .string()
    .min(1, 'College/University name is required')
    .min(2, 'College name must be at least 2 characters')
    .regex(collegeNamePattern, 'College name can only contain letters, spaces, and common punctuation'),
  budgetAmount: z
    .string()
    .min(1, 'Budget amount is required')
    .refine((val) => parseInt(val, 10) >= 100, {
      message: 'Budget must be at least ₹100',
    }),
});

export type FinalDetailsFormData = z.infer<typeof finalDetailsSchema>;

