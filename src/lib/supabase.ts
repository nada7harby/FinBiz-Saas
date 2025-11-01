// تهيئة مُلكية Supabase (stub)
// ضع مفاتيحك في متغيرات البيئة: VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY
// إذا لم تستخدم Supabase، احتفظ بهذا الملف كمثال فقط.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
