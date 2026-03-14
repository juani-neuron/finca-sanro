// ===== HORSE =====

export type HorseStatus =
  | 'active_breeding'
  | 'training'
  | 'resting'
  | 'show_prep'
  | 'vet_treatment'
  | 'pregnant'
  | 'for_sale'
  | 'foal'
  | 'retired';

export type Sex = 'stallion' | 'mare' | 'gelding';

export type Studbook = 'Foalbook' | 'Studbook' | 'B-Book I' | 'B-Book II';

export type ApprovalStatus = 'approved' | 'permanently_approved' | 'limited' | 'none';

export type Predicate = 'Ster' | 'Kroon' | 'Model' | 'Preferent' | 'Sport';

export type SportLevel = 'AAA' | 'AA' | 'A';

export interface PedigreeNode {
  name: string;
  kfpsNumber?: string;
  predicate?: string;
  sire?: PedigreeNode;
  dam?: PedigreeNode;
}

export interface KeuringEntry {
  year: number;
  location: string;
  judge: string;
  score: number;
  premium: string;
  comments: string;
}

export interface MorphologyEval {
  heightWithers: number;
  bodyLength: number;
  cannonCircumference: number;
  scores: {
    head: number;
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

export interface GaitEval {
  suspension: number;
  kneeElevation: number;
  power: number;
  elasticity: number;
  regularity: number;
}

export interface MovementEval {
  walk: GaitEval;
  trot: GaitEval;
  canter: GaitEval;
}

export interface Horse {
  id: string;
  name: string;
  kfpsNumber: string;
  microchip?: string;
  ueln?: string;
  dateOfBirth: string;
  sex: Sex;
  color: string;
  whiteMarkings?: string;
  countryOfBirth: string;
  breeder: string;
  currentOwner: string;
  location: string;
  photoUrl?: string;
  videoUrl?: string;

  sire: { name: string; kfpsNumber: string; predicate?: string };
  dam: { name: string; kfpsNumber: string; predicate?: string };
  pedigree5Gen?: PedigreeNode;
  consanguinityCoefficient?: number;

  studbook: Studbook;
  predicates: string[];
  sportLevel?: SportLevel;
  approvalStatus?: ApprovalStatus;

  keuringHistory: KeuringEntry[];
  morphology?: MorphologyEval;
  movementEval?: MovementEval;

  status: HorseStatus;
  assignedTrainer?: string;
  assignedCaretaker?: string;
  assignedVet?: string;

  estimatedValue?: number;
  purchaseCost?: number;
  monthlyCosts?: number;
}

// ===== VETERINARY =====

export type VetRecordType =
  | 'vaccine'
  | 'deworming'
  | 'surgery'
  | 'illness'
  | 'treatment'
  | 'checkup'
  | 'radiograph'
  | 'genetic_test';

export type GeneticTest = 'dwarfism' | 'hydrocephalus';

export interface VetRecord {
  id: string;
  horseId: string;
  date: string;
  type: VetRecordType;
  description: string;
  vet: string;
  results?: string;
  nextFollowUp?: string;
}

// ===== BREEDING =====

export type ServiceType = 'natural' | 'fresh_semen' | 'frozen_semen';

export type BreedingStatus =
  | 'serviced'
  | 'confirmed_pregnant'
  | 'not_pregnant'
  | 'foaled'
  | 'lost';

export type SemenQuality = 'excellent' | 'good' | 'fair' | 'poor';

export interface BreedingRecord {
  id: string;
  stallionId: string;
  mareId: string;
  serviceDate: string;
  serviceType: ServiceType;
  pregnancyDiagnosis?: {
    date: string;
    result: 'positive' | 'negative' | 'pending';
  };
  expectedFoalingDate?: string;
  actualFoalingDate?: string;
  foalId?: string;
  status: BreedingStatus;
}

export interface SemenProduction {
  stallionId: string;
  date: string;
  dosesProduced: number;
  dosesSold: number;
  quality: SemenQuality;
}

// ===== TRAINING =====

export type Discipline =
  | 'dressage'
  | 'driving'
  | 'show'
  | 'ground_work'
  | 'conditioning';

export type HorseCondition =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'tired'
  | 'injured';

export interface TrainingSession {
  id: string;
  horseId: string;
  trainerId: string;
  date: string;
  duration: number;
  discipline: Discipline;
  exercises: string[];
  notes: string;
  horseCondition: HorseCondition;
}

// ===== CARE =====

export type ShoeType =
  | 'barefoot'
  | 'standard_shoe'
  | 'sport_shoe'
  | 'therapeutic';

export interface FarrierRecord {
  id: string;
  horseId: string;
  date: string;
  farrier: string;
  type: ShoeType;
  notes: string;
  nextDate: string;
}

export interface NutritionPlan {
  horseId: string;
  hayType: string;
  concentrate: string;
  supplements: string[];
  dailyRation: string;
  bodyWeight: number;
  bodyConditionScore: number;
}

// ===== COMPETITIONS =====

export type CompetitionDiscipline =
  | 'dressage'
  | 'driving'
  | 'show'
  | 'keuring';

export interface CompetitionRecord {
  id: string;
  horseId: string;
  riderId: string;
  date: string;
  event: string;
  discipline: CompetitionDiscipline;
  level: string;
  score?: number;
  placement?: string;
  notes: string;
}

// ===== STAFF =====

export type StaffRole =
  | 'trainer'
  | 'caretaker'
  | 'vet'
  | 'farrier'
  | 'admin';

export interface WeeklySchedule {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  email?: string;
  phone?: string;
  isExternal: boolean;
  assignedHorses: string[];
  schedule?: WeeklySchedule;
  isActive: boolean;
}

// ===== CALENDAR =====

export type CalendarEventType =
  | 'training'
  | 'vet'
  | 'farrier'
  | 'breeding'
  | 'competition'
  | 'keuring'
  | 'vaccination'
  | 'other';

export type EventStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'overdue';

export interface CalendarEvent {
  id: string;
  date: string;
  type: CalendarEventType;
  title: string;
  horseIds: string[];
  staffId?: string;
  notes?: string;
  isRecurring: boolean;
  status: EventStatus;
}

// ===== FINANCIAL =====

export type FinancialType = 'income' | 'expense';

export type FinancialCategory =
  | 'stud_fee'
  | 'semen_sale'
  | 'foal_sale'
  | 'horse_sale'
  | 'prize'
  | 'feed'
  | 'vet'
  | 'farrier'
  | 'training'
  | 'insurance'
  | 'facility'
  | 'import'
  | 'other';

export interface FinancialRecord {
  id: string;
  date: string;
  type: FinancialType;
  category: FinancialCategory;
  amount: number;
  currency: 'MXN';
  horseId?: string;
  description: string;
}
