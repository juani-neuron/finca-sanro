# Finca Sanro — Sistema de Gestión Ecuestre

## Proyecto para Luvion Labs · Cliente: Finca Sanro

---

## 1. VISIÓN Y CONTEXTO

### Sobre el Cliente
Finca Sanro es el criadero de caballos frisones más importante de México. Ubicado en Espíritu Santo, Estado de México, es el único criadero con **6 sementales aprobados por la KFPS** (Koninklijke Vereniging 'Het Friesch Paarden-Stamboek') importados directamente desde Países Bajos.

Sementales confirmados:
- **Dedmer 519** — Sport AAA (Alwin 469 × Teeuwis 389)
- **Rommert 498** — Aprobado Permanente (Norbert 444 × Jasper 366)
- **Beant 517** — Sport AAA (Hessel 480 × Tsjalle 454), conocido como "Big Friendly Giant"
- **Wibout 511** — Sport Elite AAA (Thorben 466 × Doeke 287)

Hitos: Johnny Cash (propiedad de Finca Sanro) fue el primer caballo frisón en representar a la comunidad en los Juegos Panamericanos Santiago 2023. Finca Sanro fue sede de la 14ª Certificación Central AMCAF.

### Líneas de negocio
1. **Maquila de sementales** — Servicio reproductivo (inseminación) con sementales aprobados KFPS
2. **Venta de potros** — Potros nacidos de combinaciones genéticas premium
3. **Venta de caballos** — Ejemplares importados y criados en la finca
4. **Eventos** — Shows de sementales, open sales, experiencias ecuestres

### Instagram
- @finca_sanro — ~4,400 seguidores
- WhatsApp de contacto: +52 56 1992 5397

### Objetivo del sistema
Construir un **centro de mando digital** para la operación completa de la finca: gestión de caballos, staff, reproducción, salud, entrenamiento, finanzas y competencias. El dueño es una persona MUY organizada — el sistema debe reflejar ese nivel de control y detalle.

---

## 2. STACK TÉCNICO

```
Framework:      Next.js 14 (App Router)
Estilos:        Tailwind CSS
Tipografía:     Google Fonts — Playfair Display (serif, para nombres de caballos y números grandes) + DM Sans (sans-serif, para UI/body)
Deploy:         Vercel
Responsive:     Mobile-first, debe verse bien en celular
Backend:        100% DUMMY — datos hardcodeados en JSON
Auth:           Simulada — selector de rol en pantalla, sin auth real
```

### REGLA CRÍTICA: Backend Dummy
- **NO hay base de datos.** Todos los datos viven en archivos JSON o constantes en el código.
- **NO hay autenticación real.** El sistema de roles se simula con un selector/switch.
- **NO hay API calls.** Todo es estático.
- **PERO** la arquitectura del frontend debe estar preparada para conectarse a un backend real después:
  - Los componentes deben consumir datos de hooks/funciones (ej: `useHorses()`, `useCalendar()`) que hoy devuelven datos estáticos pero mañana podrían llamar a Supabase.
  - Separar la capa de datos de la capa de presentación.
  - Usar TypeScript interfaces para definir las estructuras de datos.

---

## 3. INSTRUCCIONES PARA CLAUDE CODE

### Modo de trabajo
- **ANTES de implementar cada módulo**, detente y propón tu approach: estructura de componentes, datos que necesitas, decisiones de UX. Espera confirmación antes de codear.
- Si tienes dudas sobre diseño, funcionalidad o prioridad, **pregunta antes de asumir**.
- Cuando propongas algo, explica el **por qué** de tu decisión.

### Referencia visual
El archivo `finca-sanro-styleguide.jsx` contiene:
- **Tokens de color** completos (objeto `C`) — equestrian luxury theme: negro/dorado
- **Componentes reutilizables** ya construidos: `StatusBadge`, `PredicateBadge`, `MetricCard`, `HorseCard`, `GoldDivider`
- **Layout del shell principal**: sidebar + top bar + content area
- **Vista de Dashboard** funcional con KPIs, calendario, alertas
- **Vista de Expediente** con header, tabs, pedigree visual, timeline
- **Tipografía híbrida**: Playfair Display SOLO para nombres de caballos, números/métricas grandes y el logo "FINCA SANRO". DM Sans para todo lo demás (navegación, labels, body, badges).

### Logo
- **Pide el archivo del logo** al equipo antes de implementar el header/sidebar.
- Mientras tanto, usa el text-logo "FINCA SANRO" en Playfair Display dorado como placeholder.
- Deja un componente `<Logo />` preparado para recibir el asset real.

---

## 4. SISTEMA DE ROLES

### Roles definidos

| Rol | Código | Acceso |
|-----|--------|--------|
| **Super Admin** | `super_admin` | TODO. Dashboard completo, financiero, staff, todos los caballos, métricas, gestión de usuarios. |
| **Admin** | `admin` | Operación diaria. Caballos, calendario, staff, reportes operativos. NO ve financiero completo. |
| **Entrenador** | `employee_trainer` | Caballos asignados, registrar sesiones de entrenamiento, calendario de sus caballos, reportar novedades. |
| **Caballerizo** | `employee_caretaker` | Caballos a su cargo, registrar alimentación, estado de cascos, novedades de salud. |
| **Veterinario** | `employee_vet` | Historial médico de todos los caballos, registrar consultas, tratamientos, vacunas. Puede ser externo. |

### Implementación actual
- **Solo construir la vista Super Admin** (acceso completo).
- En la sección **Configuración > Gestión de Usuarios**, mostrar:
  - Lista de usuarios dummy (con nombre, rol, estado activo/inactivo)
  - Formulario de "Crear Usuario" con selector de rol (Super Admin / Admin / Empleado)
  - Si selecciona "Empleado", aparece un segundo selector: Entrenador / Caballerizo / Veterinario
  - Este formulario NO necesita funcionar — solo mostrarse visualmente para que el dueño entienda la visión.

---

## 5. ARQUITECTURA DE DATOS DUMMY

### Tipos principales (TypeScript interfaces)

```typescript
// ===== CABALLO =====
interface Horse {
  id: string;
  name: string;                    // "Dedmer 519"
  kfpsNumber: string;              // "519"
  microchip?: string;
  ueln?: string;
  dateOfBirth: string;             // ISO date
  sex: 'stallion' | 'mare' | 'gelding';
  color: string;                   // normalmente "Negro"
  whiteMarkings?: string;
  countryOfBirth: string;
  breeder: string;
  currentOwner: string;
  location: string;                // rancho/establo
  photoUrl?: string;
  videoUrl?: string;

  // Pedigree
  sire: { name: string; kfpsNumber: string; predicate?: string };
  dam: { name: string; kfpsNumber: string; predicate?: string };
  pedigree5Gen?: PedigreeNode;     // árbol genealógico 5 generaciones
  consanguinityCoefficient?: number;

  // KFPS Registry
  studbook: 'Foalbook' | 'Studbook' | 'B-Book I' | 'B-Book II';
  predicates: string[];            // ['Ster', 'Kroon', 'Model', 'Preferent', 'Sport']
  sportLevel?: string;             // "AAA", "AA", "A"
  approvalStatus?: 'approved' | 'permanently_approved' | 'limited' | 'none';

  // Keuring history
  keuringHistory: KeuringEntry[];

  // Morphological evaluation
  morphology?: MorphologyEval;

  // Movement evaluation
  movementEval?: MovementEval;

  // Status operativo
  status: HorseStatus;
  assignedTrainer?: string;        // staff ID
  assignedCaretaker?: string;      // staff ID
  assignedVet?: string;            // staff ID

  // Financiero
  estimatedValue?: number;
  purchaseCost?: number;
  monthlyCosts?: number;
}

type HorseStatus =
  | 'active_breeding'     // Maquila activa
  | 'training'            // En entrenamiento
  | 'resting'             // En descanso
  | 'show_prep'           // Preparación show
  | 'vet_treatment'       // En tratamiento veterinario
  | 'pregnant'            // Gestante (yeguas)
  | 'for_sale'            // En venta
  | 'foal'                // Potro en desarrollo
  | 'retired';            // Retirado

interface KeuringEntry {
  year: number;
  location: string;
  judge: string;
  score: number;
  premium: string;        // "1er Premium", "2do Premium", etc.
  comments: string;
}

interface MorphologyEval {
  heightWithers: number;  // cm
  bodyLength: number;     // cm
  cannonCircumference: number; // cm
  scores: {
    head: number;         // 1-10
    neck: number;
    shoulder: number;
    back: number;
    loin: number;
    croup: number;
    forelegs: number;
    hindlegs: number;
    hooves: number;
    balance: number;
  };
}

interface MovementEval {
  walk: { suspension: number; kneeElevation: number; power: number; elasticity: number; regularity: number };
  trot: { suspension: number; kneeElevation: number; power: number; elasticity: number; regularity: number };
  canter: { suspension: number; kneeElevation: number; power: number; elasticity: number; regularity: number };
}

// ===== VETERINARIO =====
interface VetRecord {
  id: string;
  horseId: string;
  date: string;
  type: 'vaccine' | 'deworming' | 'surgery' | 'illness' | 'treatment' | 'checkup' | 'radiograph' | 'genetic_test';
  description: string;
  vet: string;
  results?: string;
  nextFollowUp?: string;
}

// Tests genéticos obligatorios en frisones
type GeneticTest = 'dwarfism' | 'hydrocephalus';

// ===== REPRODUCCIÓN =====
interface BreedingRecord {
  id: string;
  stallionId: string;
  mareId: string;
  serviceDate: string;
  serviceType: 'natural' | 'fresh_semen' | 'frozen_semen';
  pregnancyDiagnosis?: { date: string; result: 'positive' | 'negative' | 'pending' };
  expectedFoalingDate?: string;
  actualFoalingDate?: string;
  foalId?: string;
  status: 'serviced' | 'confirmed_pregnant' | 'not_pregnant' | 'foaled' | 'lost';
}

// Para sementales — producción de semen
interface SemenProduction {
  stallionId: string;
  date: string;
  dosesProduced: number;
  dosesSold: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

// ===== ENTRENAMIENTO =====
interface TrainingSession {
  id: string;
  horseId: string;
  trainerId: string;
  date: string;
  duration: number;        // minutos
  discipline: 'dressage' | 'driving' | 'show' | 'ground_work' | 'conditioning';
  exercises: string[];
  notes: string;
  horseCondition: 'excellent' | 'good' | 'fair' | 'tired' | 'injured';
}

// ===== CUIDADO =====
interface FarrierRecord {
  id: string;
  horseId: string;
  date: string;
  farrier: string;
  type: 'barefoot' | 'standard_shoe' | 'sport_shoe' | 'therapeutic';
  notes: string;
  nextDate: string;
}

interface NutritionPlan {
  horseId: string;
  hayType: string;
  concentrate: string;
  supplements: string[];
  dailyRation: string;
  bodyWeight: number;       // kg
  bodyConditionScore: number; // 1-9 escala Henneke
}

// ===== COMPETENCIAS =====
interface CompetitionRecord {
  id: string;
  horseId: string;
  riderId: string;
  date: string;
  event: string;
  discipline: 'dressage' | 'driving' | 'show' | 'keuring';
  level: string;
  score?: number;
  placement?: string;
  notes: string;
}

// ===== STAFF =====
interface StaffMember {
  id: string;
  name: string;
  role: 'trainer' | 'caretaker' | 'vet' | 'farrier' | 'admin';
  email?: string;
  phone?: string;
  isExternal: boolean;     // ej: el veterinario puede ser externo
  assignedHorses: string[]; // horse IDs
  schedule?: WeeklySchedule;
  isActive: boolean;
}

// ===== CALENDARIO =====
interface CalendarEvent {
  id: string;
  date: string;
  type: 'training' | 'vet' | 'farrier' | 'breeding' | 'competition' | 'keuring' | 'vaccination' | 'other';
  title: string;
  horseIds: string[];
  staffId?: string;
  notes?: string;
  isRecurring: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'overdue';
}

// ===== FINANCIERO =====
interface FinancialRecord {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: 'stud_fee' | 'semen_sale' | 'foal_sale' | 'horse_sale' | 'prize' | 'feed' | 'vet' | 'farrier' | 'training' | 'insurance' | 'facility' | 'import' | 'other';
  amount: number;
  currency: 'MXN';
  horseId?: string;
  description: string;
}
```

### Datos dummy a crear
Usar datos REALES de Finca Sanro para los sementales (Dedmer 519, Rommert 498, Beant 517, Wibout 511). Para yeguas, potros y staff, inventar datos realistas pero ficticios. Incluir al menos:
- 4 sementales (los reales)
- 6-8 yeguas con nombres frisones realistas
- 3-4 potros de temporada 2024-2025
- 3-4 miembros de staff
- 15-20 eventos de calendario
- Historial veterinario y de entrenamiento para los sementales principales

---

## 6. MÓDULOS Y PANTALLAS

### Módulo A: Dashboard Principal
**Ruta:** `/`

Contenido:
- **KPI Cards** (4): Total caballos, Maquilas activas, Potros este año, Valor estimado del inventario
- **Calendario semanal**: Vista compacta de los próximos 5 días con eventos color-coded por tipo
- **Panel "Requiere Atención"**: Alertas urgentes (vacunas vencidas, herrados atrasados, seguimientos pendientes)
- **Staff asignado hoy**: Lista de personal con carga de trabajo
- **Grid de sementales**: Cards de los 4 sementales principales con status, stats rápidos y próximo evento

### Módulo B: Inventario de Caballos
**Ruta:** `/caballos`

Contenido:
- **Filtros**: Por tipo (semental/yegua/potro/castrado), status operativo, predicado KFPS, búsqueda por nombre
- **Vista grid/lista** toggle
- **Horse Cards**: Foto placeholder, nombre, número KFPS, status, predicado, entrenador, cuidador, stats rápidos
- Click en card → Expediente individual

### Módulo C: Expediente Individual del Caballo
**Ruta:** `/caballos/[id]`

Header con nombre, predicado, status, foto placeholder, stats rápidos.

**Tabs:**
1. **General**: Datos de identificación, pedigree visual (árbol genealógico), timeline cronológica
2. **KFPS**: Registro studbook, historial de keuring con puntuaciones, evaluaciones morfológicas y de movimiento
3. **Salud**: Historial veterinario, vacunas, desparasitación, pruebas genéticas (Dwarfism, Hydrocephalus), radiografías
4. **Reproducción**:
   - Para sementales: maquilas activas, yeguas servidas, fertilidad, producción de semen, descendencia
   - Para yeguas: ciclos, gestaciones, potros
5. **Entrenamiento**: Sesiones, progreso, entrenador asignado, programa
6. **Cuidado**: Herrado, nutrición (dieta, BCS), condición general
7. **Financiero**: Costos asociados, ingresos generados (stud fees, premios), valor estimado
8. **Documentos**: Pasaporte equino, certificado KFPS, certificados veterinarios, contratos (placeholders con ícono de archivo)

### Módulo D: Personal/Staff
**Ruta:** `/personal`

Contenido:
- **Lista de staff** con foto, nombre, rol, caballos asignados, horario
- **Perfil de staff**: Click para ver detalle — caballos a cargo, actividades recientes, carga de trabajo
- **Distribución visual**: Quién cuida qué caballos (mapa de asignaciones)

### Módulo E: Maquila (Reproducción)
**Ruta:** `/maquila`

Contenido:
- **Dashboard de maquila**: Maquilas activas por semental, yeguas en gestación, potros por nacer
- **Pipeline visual**: Flujo de estados (Solicitud → Semental asignado → Inseminación → Gestación → Parto → Registro)
- **Tabla de servicios activos**: Semental, yegua (propietario externo), fecha servicio, status gestación, fecha esperada
- **Métricas por semental**: Fertilidad, dosis producidas/vendidas, potros registrados KFPS
- **Descendencia**: Lista de potros con predicados obtenidos

### Módulo F: Calendario
**Ruta:** `/calendario`

Contenido:
- **Vista mensual/semanal** toggle
- **Filtros por tipo**: Entrenamiento, veterinario, herrado, maquila, competencia, keuring
- **Filtros por caballo y staff**
- **Color coding** por tipo de evento
- **Eventos recurrentes**: Herrados cada 6-8 semanas, desparasitación trimestral, vacunas anuales
- **Alertas de vencimiento** integradas

### Módulo G: Competencias
**Ruta:** `/competencias`

Contenido:
- **Historial de participaciones**: Tabla con fecha, evento, caballo, jinete, disciplina, resultado
- **Logros destacados**: Cards especiales para hitos (Panamericanos, campeonatos, keurings destacadas)
- **Próximas competencias**: Calendario de eventos inscritos
- **Ranking/puntuaciones** por caballo

### Módulo H: Financiero
**Ruta:** `/financiero`

Contenido:
- **Resumen mensual**: Ingresos vs. gastos, margen
- **Ingresos desglosados**: Stud fees, venta de semen, venta de potros, premios
- **Gastos desglosados**: Alimentación, veterinario, herrado, entrenamiento, instalaciones
- **Costo por caballo**: Cuánto cuesta mantener cada caballo al mes
- **Valor del inventario**: Estimación del valor total de los caballos
- **Gráficos**: Tendencias mensuales (Recharts)

### Módulo I: Configuración
**Ruta:** `/configuracion`

Contenido:
- **Datos de la finca**: Nombre, ubicación, contacto
- **Gestión de usuarios**: Lista de usuarios, formulario de creación con selector de rol (ver sección 4)
- **Catálogos**: Tipos de evento, categorías financieras, status de caballos

---

## 7. GUÍA DE ESTILO

### Referencia visual
Consultar el archivo `finca-sanro-styleguide.jsx` para los tokens exactos.

### Paleta de colores
```
Background principal:     #0A0A0A
Background cards:         #141414
Background elevated:      #1E1E1E
Gold (acento primario):   #C8A04A
Gold light:               #D4B86A
Gold muted (backgrounds): rgba(200, 160, 74, 0.15)
Gold border:              rgba(200, 160, 74, 0.25)
Texto principal:          #FAFAFA
Texto secundario:         #9CA3AF
Texto muted:              #6B7280
Emerald (éxito):          #10B981
Amber (atención):         #F59E0B
Red (urgente):            #EF4444
Blue (info):              #3B82F6
Purple (especial):        #8B5CF6
Border:                   rgba(255, 255, 255, 0.06)
```

### Tipografía — REGLA HÍBRIDA
```
Playfair Display (serif):
  - Nombres de caballos (ej: "Dedmer 519", "Rommert 498")
  - Nombres de padres en pedigree
  - Números/métricas grandes (KPIs, puntuaciones)
  - Logo "FINCA SANRO" en sidebar
  - NO para títulos de sección, labels, ni texto UI

DM Sans (sans-serif):
  - Todo lo demás: navegación, labels, badges, body text, botones, tabs, títulos de sección
  - Texto operativo, formularios, tablas
```

### Patrones visuales
- **Gold gradient top accent**: Todas las cards tienen un gradiente dorado de 2px en la parte superior (`linear-gradient(90deg, gold, transparent)`)
- **Hover en cards**: El gradiente dorado se expande al 100% del ancho
- **Bordes**: Muy sutiles, `rgba(255, 255, 255, 0.06)`, en hover cambian a gold border
- **Backgrounds escalonados**: bg → bgCard → bgElevated para crear profundidad
- **Section labels**: `fontSize: 11, fontWeight: 700, color: gold, letterSpacing: 2, textTransform: uppercase`
- **Status badges**: Pill shape con dot de color + background semitransparente
- **Predicate badges**: Border dorado + texto dorado uppercase con letter-spacing

### Responsive
- **Desktop**: Sidebar fijo (220px) + content area
- **Tablet**: Sidebar colapsable (64px iconos only)
- **Mobile**: Bottom navigation bar en lugar de sidebar, cards apiladas, grids de 1 columna
- **Breakpoints**: sm: 640px, md: 768px, lg: 1024px, xl: 1280px

---

## 8. ORDEN DE IMPLEMENTACIÓN

> **Nota:** El plan original de 4 fases se descompuso en 7 fases granulares para implementación con Claude Code. El mapeo se detalla abajo.

### Fase 1a: Scaffolding ✅ COMPLETADA (2026-03-13)
- Setup Next.js 14 con Tailwind, fuentes, tokens de color, dependencias (framer-motion, recharts, lucide-react)

### Fase 1b: Data Layer ✅ COMPLETADA (2026-03-13)
- TypeScript interfaces para todos los modelos (`src/types/index.ts`)
- 8 archivos de datos dummy con información real de sementales (`src/data/`)
- 8 hooks con filtrado y agregación (`src/hooks/`)
- Datos: 4 sementales reales, 6 yeguas, 4 potros, 4 staff, 6 registros reproductivos, 21 registros veterinarios, 11 sesiones de entrenamiento, 18 eventos de calendario, 11 competencias, 30 registros financieros

### Fase 2: Design System + App Shell ✅ COMPLETADA (2026-03-13)
- 8 componentes UI reutilizables (`src/components/ui/`): Card, StatusBadge, PredicateBadge, MetricCard, HorseCard, GoldDivider, SectionLabel, Logo
- Utilidades de mapeo status/color (`src/lib/utils.ts`) y configuración de navegación (`src/lib/navigation.ts`)
- App shell con 4 componentes de layout (`src/components/layout/`): Sidebar (220px desktop, 64px tablet con animación), MobileNav (bottom nav con menú "Más"), TopBar (título dinámico, búsqueda, notificaciones), AppShell (wrapper responsivo)
- 10 rutas configuradas: Dashboard, Caballos, Caballos/[id], Maquila, Calendario, Personal, Competencias, Financiero, Configuración — cada una con placeholder estilizado
- Todas las animaciones con framer-motion (sidebar collapse, card hover, gold accent expansion)
- Build: 0 errores, 12 páginas generadas

### Fase 3: Dashboard + Horse Inventory ✅ COMPLETADA (2026-03-13)
5. Dashboard completo con KPIs, calendario, alertas, grid de sementales
6. Lista/grid de caballos con filtros

**Resumen Fase 3:**
- Dashboard (`/`): 4 componentes — KPIRow (4 MetricCards: total caballos, yeguas gestantes, dosis vendidas, próximos eventos), CalendarPreview (próximos 5 eventos con tipo y fecha), AlertsPanel (eventos vencidos, partos próximos, diagnósticos pendientes), StallionGrid (4 HorseCards KFPS con navegación)
- Horse Inventory (`/caballos`): 3 componentes — HorseFilters (tabs sexo, dropdown estado, búsqueda, toggle grid/lista), HorseGrid (cards responsivos 1/2/3 columnas), HorseList (tabla con nombre, tipo, edad, estado, predicados)
- Archivos creados: `src/components/dashboard/` (4 archivos), `src/components/caballos/` (3 archivos)
- Build: 0 errores, 12 páginas generadas

### Fase 4: Horse Profile — Core Tabs ✅ COMPLETADA (2026-03-13)
7. Expediente individual con tabs principales
8. Pedigree visual
9. Timeline cronológica
- Archivos creados: `src/components/caballos/perfil/` (7 archivos: horse-profile-header, horse-tab-nav, pedigree-tree, horse-timeline, tab-general, horse-info-grid, tab-placeholder)
- Página actualizada: `src/app/caballos/[id]/page.tsx` — perfil completo con header, 8 tabs, pestaña General funcional
- General tab incluye: grid de información (identificación, origen, valor), pedigree visual 3 generaciones, timeline con datos de vet/breeding/training
- Build: 0 errores, 12 páginas (1 dinámica: /caballos/[id])

### Fase 5: Horse Profile — Operational Tabs ✅ COMPLETADA (2026-03-13)
- 7 tabs operativos implementados reemplazando placeholders
- **tab-kfps.tsx**: Keuring history cards, morphology score bars animadas, movement evaluation grid (paso/trote/galope × 5 criterios), approval status badge
- **tab-salud.tsx**: Historial veterinario con íconos por tipo, filter pills (8 tipos), follow-ups pendientes destacados, resultados expandidos
- **tab-reproduccion.tsx**: Breeding records con status badges, semen production table con KPIs (dosis producidas/vendidas/calidad), soporte stallion vs mare
- **tab-entrenamiento.tsx**: KPI cards (sesiones, minutos, duración promedio, disciplinas), distribución por disciplina, sesiones con exercise tags
- **tab-cuidado.tsx**: Farrier records con tipo de herraje, nutrition plan con peso/condición corporal, suplementos como pills
- **tab-financiero.tsx**: Income/expenses/balance KPIs, valor del ejemplar, movimientos financieros con íconos ingreso/gasto
- **tab-documentos.tsx**: Lista de documentos dummy contextual (stallion vs mare), íconos por tipo de archivo, botón descarga con hover
- **Data additions**: `src/data/care.ts` (12 farrier records + 9 nutrition plans), `src/hooks/useCare.ts`
- Build: 0 errores, 12 páginas (1 dinámica: /caballos/[id]), perfil page 18.6 kB

### Fase 6: Maquila + Calendario ✅ COMPLETADA (2026-03-13)
10. Módulo de Maquila con pipeline visual
11. Calendario integrado

**Resumen Fase 6:**
- **Maquila** (`/maquila`): 4 KPI cards, visual 6-stage breeding pipeline (Solicitud→Evaluación→Servicio→Diagnóstico→Gestación→Parto), services table with status badges, per-stallion metrics with semen production bars and fertility rates
- **Calendario** (`/calendario`): Monthly grid + weekly list views with toggle, color-coded events by type, filters by event type (pills) and horse (dropdown), event detail sidebar, overdue alerts, month/week navigation
- **Components:** `src/components/maquila/` (4 files), `src/components/calendario/` (4 files)
- **Pages:** Updated `src/app/maquila/page.tsx`, `src/app/calendario/page.tsx`
- All responsive (mobile vertical pipeline, desktop horizontal). Uses existing data layer (useBreeding, useCalendar, useHorses hooks)

### Fase 7: Personal + Competencias + Financiero + Config + Polish ✅ COMPLETADA (2026-03-13)
12. Módulo de Personal/Staff
13. Competencias
14. Financiero con gráficos
15. Configuración + formulario de gestión de usuarios
16. Pulido responsive
17. Animaciones y transiciones

**Resumen de implementación:**
- **Personal:** 3 componentes (`personal-kpis.tsx`, `staff-grid.tsx`, `staff-detail.tsx`) — KPIs de personal, grid de tarjetas con info de contacto y caballos asignados, panel lateral deslizable con horario semanal y lista de caballos enlazados
- **Competencias:** 3 componentes (`competencias-kpis.tsx`, `results-table.tsx`, `horse-performance.tsx`) — KPIs (11 competencias, victorias, podios, mejor score), tabla filtrable por disciplina con badges de colocación (oro/plata/bronce), tarjetas de rendimiento por caballo con medallas
- **Financiero:** 4 componentes (`financial-kpis.tsx`, `revenue-chart.tsx`, `category-breakdown.tsx`, `transactions-table.tsx`) — KPIs financieros con formatCurrency, gráfico de barras Recharts (ingresos vs gastos mensuales), desglose por categoría con barras de porcentaje, tabla de movimientos filtrable
- **Configuración:** 3 componentes (`user-management.tsx`, `create-user-form.tsx`, `general-settings.tsx`) — tabla de 5 usuarios dummy con roles y badges, formulario de creación con selector de rol (Super Admin/Admin/Empleado → sub-rol), settings de finca, notificaciones, regional, seguridad con toggles
- **Todas las páginas** usan motion.div, SectionLabel, GoldDivider, patrón consistente con fases anteriores
- Build: 0 errores, 12 páginas generadas

---

## 9. DATOS REALES DE FINCA SANRO

### Sementales aprobados KFPS (usar estos datos reales)

```json
[
  {
    "name": "Dedmer 519",
    "kfpsNumber": "519",
    "sire": "Alwin 469",
    "dam": "Teeuwis 389",
    "predicate": "Sport AAA",
    "approvalStatus": "approved",
    "notes": "Semental aprobado por la KFPS. Gran elegancia y porte. Opción ideal para mejorar programas de cría."
  },
  {
    "name": "Rommert 498",
    "kfpsNumber": "498",
    "sire": "Norbert 444",
    "dam": "Jasper 366",
    "predicate": "Aprobado Permanente",
    "approvalStatus": "permanently_approved",
    "notes": "Aprobado a los 3 años en otoño 2016. Primera temporada: 75 potrillos, 76% nacidos de yeguas Star mínimo. Completó Prueba de Progenie en 2022."
  },
  {
    "name": "Beant 517",
    "kfpsNumber": "517",
    "sire": "Hessel 480",
    "dam": "Tsjalle 454",
    "predicate": "Sport AAA",
    "approvalStatus": "approved",
    "notes": "Conocido como 'Big Friendly Giant'. Nobleza y belleza excepcionales. Genética superior para potros de alta calidad. Temperamento amigable y versatilidad."
  },
  {
    "name": "Wibout 511",
    "kfpsNumber": "511",
    "sire": "Thorben 466",
    "dam": "Doeke 287",
    "predicate": "Sport Elite AAA",
    "approvalStatus": "permanently_approved",
    "notes": "Semental Aprobado Permanente. Nivel más alto de predicado deportivo."
  }
]
```

### Yeguas y potros reales mencionados (complementar con ficticios)
- Yegua Maud van Lutken Oagel (Tymen 503 × Tsjalke 397) — tiene potranca de Dedmer 519
- Tyjani fan Sweach (Ster) — hija de Dedmer 519 × Haitse 425
- Yegua Gayttlin Jede Kroon AA (Bartele 472 × Dries 421) — potranca de Beant 517
- Uwe van Spokedam Ster AAA — hija de Beant 517 × Jehannes 484
- Famke fan Galinga State Ster (Eise 489 × Tsjalle 454) — potranca de Wibout 511

### Contexto KFPS relevante
- **Predicados**: Ster (Star), Kroon, Model, Preferent, Sport (con niveles A, AA, AAA)
- **Keuring**: Inspección oficial. Se evalúa: Race Type (40%), Conformation + Movement (60%). Escala 4-9.
- **Pruebas genéticas obligatorias**: Dwarfism, Hydrocephalus
- **Libro genealógico**: Foalbook → Studbook (principal). B-Book I y B-Book II para registros secundarios.
- **Sementales aprobados**: Identificados por nombre + número de 3 dígitos (ej: Dedmer 519)
- **Asociación en México**: AMCAF (Asociación Mexicana del Caballo Frisón), representante oficial de KFPS

---

## 10. NOTAS FINALES

- Este prototipo es una herramienta de ventas para Luvion Labs — debe causar un "WoW effect" al mostrarse al dueño de Finca Sanro
- El frontend debe ser ESPECTACULAR — nivel producto premium que refleje el valor de los caballos que gestiona
- La estética "equestrian luxury" (oscura, dorada) no es decorativa — es estratégica: le dice al dueño "esto está hecho para alguien como tú"
- Priorizar la experiencia visual y la sensación de control sobre la funcionalidad backend
- Todo el branding es de Finca Sanro, NO de Luvion Labs — este es el producto del cliente
