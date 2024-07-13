import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import supabase from "@/lib/supabaseClient";

// Use the Supabase connection string
const connectionString = process.env.DATABASE_URL as string;

// Create a Postgres client
const client = postgres(connectionString);

// Create the Drizzle instance
export const db = drizzle(client);

// Export supabase client if needed elsewhere
export { supabase };
