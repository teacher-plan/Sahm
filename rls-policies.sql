-- تشغيل RLS (عطلها أولاً ثم شغلها)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE senders ENABLE ROW LEVEL SECURITY;

-- ========== الطلبات (orders) ==========
-- أي مستخدم (anon) يقدر يقرأ الطلبات
CREATE POLICY "anon_select_orders" ON orders FOR SELECT USING (true);

-- أي مستخدم يقدر يضيف طلب (لأنه المرسل يضيف طلب بدون تسجيل)
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT WITH CHECK (true);

-- المندوب يقدر يحدث طلباته فقط (إذا انضبط courier_id)
CREATE POLICY "courier_update_orders" ON orders FOR UPDATE USING (
  courier_id IS NOT NULL AND courier_id IN (SELECT id::text FROM couriers WHERE is_active = true)
);

-- ========== المندوبين (couriers) ==========
-- أي مستخدم يقدر يقرأ المندوبين (عشان الشاشات تعرضهم)
CREATE POLICY "anon_select_couriers" ON couriers FOR SELECT USING (true);

-- مندوب يقدر يحدث ملفه الشخصي
CREATE POLICY "courier_update_self" ON couriers FOR UPDATE USING (
  username = current_setting('app.courier_username', true)
);

-- ========== المرسلين (senders) ==========
-- أي مستخدم يقدر يقرأ المرسلين
CREATE POLICY "anon_select_senders" ON senders FOR SELECT USING (true);

-- أي مستخدم يقدر يضيف نفسه كمرسل (تسجيل دخول)
CREATE POLICY "anon_insert_senders" ON senders FOR INSERT WITH CHECK (true);
