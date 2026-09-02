# CELEBRA — Ecosistema Digital de Eventos

> **"Tu evento comienza aquí."**  
> Plataforma SaaS premium para crear invitaciones digitales interactivas, gestionar confirmaciones RSVP, emitir pasaportes QR y controlar el acceso a eventos en tiempo real.

---

## 🎨 1. Identidad Visual Oficial

Inspirada 100% en el logotipo oficial de **CELEBRA**:
- **Fondo Cósmico & Azul Noche**: `#060913`, `#0B1126`
- **Turquesa & Cyan Eléctrico**: `#00F0FF`, `#0EA5E9`
- **Magenta & Púrpura Festivo**: `#D946EF`, `#7928CA`
- **Dorado Radiante**: `#F59E0B`, `#FCD34D`
- **Efectos Visuales**: Destellos de estrellas cósmicas, confeti multi-ángulo en canvas, glassmorphism con desenfoque de 20px, y bordes con gradientes metálicos.

---

## 📁 2. Estructura de Carpetas de Assets

Se crearon las carpetas especializadas en `public/assets/`:
- `public/assets/logo/`:
  - `celebra-icon.svg`: La "C" estilizada e interconectada con destellos dorados y halo cósmico.
  - `celebra-logo-full.svg`: Emblema completo con tipografía oficial, líneas divisoras de diseño y subtítulos "INVITACIONES DIGITALES / SERVICIOS INTEGRALES PARA EVENTOS".
- `public/assets/music/`:
  - `celebration-melody.wav`: Melodía suave ambiental con progresión de acordes mágicos en arpegio (loop 12s) para la invitación.
  - `checkin-success.wav`: Tono de fanfarria / bip de acceso autorizado para el control de acceso en puerta.
- `public/assets/video/`: Carpeta preparada para clips de video, ambientaciones y video-invitaciones en MP4 / WebM.
- `public/assets/images/`: Portadas y fondos temáticos para plantillas de bodas, XV años, graduaciones y galas.

---

## 🚀 3. Módulos y Pantallas Implementadas

1. **Landing Page de Alto Impacto (`/`)**:
   - Hero con confeti dinámico y mockup 3D de smartphone interactivo con la invitación viva.
   - 7 Cards de propuesta de valor (Invitaciones, RSVP, Invitados, QR, Check-in, Estadísticas, WhatsApp).
   - Catálogo interactivo de 9 tipos de eventos (Bodas, XV Años, Cumpleaños, Bautizos, Baby Showers, Graduaciones, Aniversarios, Corporativos, Fiestas).
   - Showcase de plantillas y tabla de precios y planes (Free, Pro, Premium).
2. **Dashboard del Anfitrión ("Centro de Control")**:
   - Saludo personalizado con métricas vivas de aforo, confirmaciones y personas en salón.
   - Cuenta regresiva del próximo evento con accesos rápidos.
3. **Asistente Wizard de 5 Pasos**:
   - Paso 1: Datos del evento (nombre, fechas, horarios, salón, dirección, dedicatoria).
   - Paso 2: Elección de plantilla temática.
   - Paso 3: Personalización de colores, música y dress code.
   - Paso 4: Invitados iniciales y pases.
   - Paso 5: Lanzamiento con explosión de confeti y enlace público generado.
4. **Editor Visual tipo Canva / Website Builder**:
   - Selector lateral de bloques activables (Cuenta regresiva, Itinerario, Ubicación, Dress Code, Mesa de regalos, RSVP).
   - Lienzo central responsive con conmutador en tiempo real: **Móvil (375px)**, **Tablet (768px)** y **Desktop (100%)**.
   - Panel de propiedades para personalizar tipografías, títulos y dedicatorias al instante.
5. **Invitación Digital Interactiva (`/e/boda-carlos-y-sofia`)**:
   - Portada cinematográfica con nombres estilizados y ambientación de celebración.
   - Cuenta regresiva dinámica en tiempo real.
   - Reproductor flotante de música con control de volumen y reproducción de la melodía de celebración.
   - Itinerario interactivo paso a paso.
   - Ubicación con enlaces directos a Google Maps y Waze.
   - Dress code con paleta de colores sugerida.
   - Mesa de regalos (Amazon, Liverpool y datos bancarios con botón "Copiar CLABE").
   - Formulario RSVP inteligente (asistencia, número de acompañantes y alergias).
   - Simulador de enlace personalizado (`/e/slug/i/[token]`) con bienvenida nominal al invitado.
6. **Control de Acceso QR & Modo Staff Móvil**:
   - Diseñado ergonómicamente para smartphone (uso con una sola mano).
   - Botón grande de escaneo, visor con láser animado y simulación de lectura.
   - Sonido de feedback (`checkin-success.wav`) y badges de estado:
     - ✓ **Acceso Autorizado** (con número de pases y mesa).
     - ⚠️ **Invitado Ya Registrado** (con hora del ingreso previo).
     - ❌ **Código No Válido**.
   - Búsqueda manual de emergencia por nombre o token.
7. **Módulo de Invitados y Campañas de WhatsApp**:
   - Tabla con filtros por estado y por grupo (VIP, Familia, Amigos, Trabajo).
   - Botón directo "Enviar por WhatsApp" que abre WhatsApp con el mensaje predeterminado y el enlace único del invitado.
   - Visor e impresión de Pasaporte QR individual.
8. **Panel Super Admin**:
   - Métricas SaaS globales de usuarios, eventos, aforo y suscripciones.

---

## 🛠️ 4. Ejecución Local

Para levantar la aplicación en desarrollo:

```bash
npm run dev
```

Abre en tu navegador la URL que indique la consola (por defecto `http://localhost:5173`).

---

## 📦 5. Archivos de Entregables Adicionales

- `schema.sql`: Definición relacional completa en PostgreSQL / Supabase con soporte para UUIDs, tablas de usuarios, eventos, invitados, códigos QR, check-ins y Row Level Security (RLS).
- `.env.example`: Variables de entorno para Supabase, Stripe, Mercado Pago y WhatsApp Business API.
