import { z } from "zod";

export const ApiResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const ActionReponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
});

export type ActionResponse = z.infer<typeof ActionReponseSchema>;
