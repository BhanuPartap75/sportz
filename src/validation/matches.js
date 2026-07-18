import { z } from "zod";

// Match status constants
export const MATCH_STATUS = {
  SCHEDULED: "scheduled",
  LIVE: "live",
  FINISHED: "finished",
};

// List matches query schema
export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

// Match ID parameter schema
export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Helper function to validate ISO date strings
const isValidISODate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString() === value;
};

// Create match schema
export const createMatchSchema = z
  .object({
    sport: z.string().trim().min(1, "Sport is required"),
    homeTeam: z.string().trim().min(1, "Home team is required"),
    awayTeam: z.string().trim().min(1, "Away team is required"),

    startTime: z
      .string()
      .refine(isValidISODate, { message: "Invalid ISO date string" }),

    endTime: z
      .string()
      .refine(isValidISODate, { message: "Invalid ISO date string" }),

    homeScore: z.coerce.number().int().nonnegative().optional(),

    awayScore: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: "endTime must be after startTime",
      });
    }
  });

// Update score schema
export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
});