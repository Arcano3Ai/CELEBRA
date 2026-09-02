-- ==========================================================
-- CELEBRA — INVITACIONES DIGITALES
-- ESQUEMA DE BASE DE DATOS POSTGRESQL / SUPABASE
-- ==========================================================

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USUARIOS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'CLIENTE' CHECK (role IN ('SUPER_ADMIN', 'CLIENTE', 'STAFF')),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. PLANES SAAS
CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    max_events INT DEFAULT 1,
    max_guests INT DEFAULT 50,
    price_mxn NUMERIC(10, 2) DEFAULT 0.00,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SUSCRIPCIONES Y PAGOS
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES plans(id),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    provider VARCHAR(50) DEFAULT 'STRIPE',
    provider_subscription_id VARCHAR(255),
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EVENTOS
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    hosts VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    venue_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    google_maps_url TEXT,
    description TEXT,
    cover_image TEXT,
    audio_track TEXT,
    rsvp_deadline DATE,
    dress_code_title VARCHAR(255),
    dress_code_desc TEXT,
    dress_code_colors JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 5. GRUPOS DE INVITADOS
CREATE TABLE IF NOT EXISTS guest_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    max_companions_default INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. INVITADOS
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    group_id UUID REFERENCES guest_groups(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    companions_allowed INT DEFAULT 1,
    companions_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'CONFIRMADO', 'NO_ASISTIRA', 'INGRESADO')),
    dietary_restrictions TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 7. CÓDIGOS QR
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    guest_id UUID UNIQUE REFERENCES guests(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. REGISTRO DE CHECK-IN
CREATE TABLE IF NOT EXISTS checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    staff_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    device_info TEXT,
    checkin_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ITINERARIOS
CREATE TABLE IF NOT EXISTS itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    time_label VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

-- 10. MESA DE REGALOS
CREATE TABLE IF NOT EXISTS gift_registries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    store_name VARCHAR(150) NOT NULL,
    registry_type VARCHAR(50) NOT NULL,
    details TEXT,
    external_url TEXT,
    bank_name VARCHAR(100),
    clabe VARCHAR(50),
    account_number VARCHAR(50)
);

-- 11. ANALYTICS
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
    user_agent TEXT,
    ip_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices de Rendimiento
CREATE INDEX IF NOT EXISTS idx_events_user ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_guests_event ON guests(event_id);
CREATE INDEX IF NOT EXISTS idx_qr_token ON qr_codes(token);
CREATE INDEX IF NOT EXISTS idx_checkins_event ON checkins(event_id);

-- RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
