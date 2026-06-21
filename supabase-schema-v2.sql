-- جدول المندوبين
CREATE TABLE IF NOT EXISTS couriers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  governorate TEXT DEFAULT '',
  vehicle_type TEXT DEFAULT '',
  has_profile BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- إضافة المدير
INSERT INTO couriers (username, password, name, has_profile, is_active)
VALUES ('admin', 'admin123', 'المدير', true, true)
ON CONFLICT (username) DO NOTHING;

-- إضافة حقل courier_id للطلبات
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_id TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_name TEXT DEFAULT '';
