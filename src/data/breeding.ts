import { BreedingRecord, SemenProduction } from '@/types';

export const breedingRecords: BreedingRecord[] = [
  // Dedmer 519 x Maud — foaled successfully
  {
    id: 'breed-001',
    stallionId: 'stallion-dedmer-519',
    mareId: 'mare-maud',
    serviceDate: '2024-04-20',
    serviceType: 'fresh_semen',
    pregnancyDiagnosis: { date: '2024-05-18', result: 'positive' },
    expectedFoalingDate: '2025-03-20',
    actualFoalingDate: '2025-03-28',
    foalId: 'foal-dedmer-jr',
    status: 'foaled',
  },
  // Wibout 511 x Famke — foaled successfully
  {
    id: 'breed-002',
    stallionId: 'stallion-wibout-511',
    mareId: 'mare-famke',
    serviceDate: '2024-05-05',
    serviceType: 'natural',
    pregnancyDiagnosis: { date: '2024-06-02', result: 'positive' },
    expectedFoalingDate: '2025-04-05',
    actualFoalingDate: '2025-04-10',
    foalId: 'foal-wibout-famke',
    status: 'foaled',
  },
  // Rommert 498 x Gayttlin — confirmed pregnant
  {
    id: 'breed-003',
    stallionId: 'stallion-rommert-498',
    mareId: 'mare-gayttlin',
    serviceDate: '2025-06-10',
    serviceType: 'fresh_semen',
    pregnancyDiagnosis: { date: '2025-07-08', result: 'positive' },
    expectedFoalingDate: '2026-05-10',
    status: 'confirmed_pregnant',
  },
  // Beant 517 x Maud — confirmed pregnant (2nd foal)
  {
    id: 'breed-004',
    stallionId: 'stallion-beant-517',
    mareId: 'mare-maud',
    serviceDate: '2025-07-15',
    serviceType: 'natural',
    pregnancyDiagnosis: { date: '2025-08-12', result: 'positive' },
    expectedFoalingDate: '2026-06-15',
    status: 'confirmed_pregnant',
  },
  // Dedmer 519 x Wietske — serviced, pending diagnosis
  {
    id: 'breed-005',
    stallionId: 'stallion-dedmer-519',
    mareId: 'mare-wietske',
    serviceDate: '2026-02-20',
    serviceType: 'fresh_semen',
    pregnancyDiagnosis: { date: '2026-03-20', result: 'pending' },
    status: 'serviced',
  },
  // Rommert 498 x Sytske — not pregnant (failed)
  {
    id: 'breed-006',
    stallionId: 'stallion-rommert-498',
    mareId: 'mare-sytske',
    serviceDate: '2025-05-01',
    serviceType: 'frozen_semen',
    pregnancyDiagnosis: { date: '2025-05-29', result: 'negative' },
    status: 'not_pregnant',
  },
];

export const semenProduction: SemenProduction[] = [
  // Dedmer 519
  { stallionId: 'stallion-dedmer-519', date: '2026-01-10', dosesProduced: 8, dosesSold: 3, quality: 'excellent' },
  { stallionId: 'stallion-dedmer-519', date: '2026-01-24', dosesProduced: 7, dosesSold: 4, quality: 'good' },
  { stallionId: 'stallion-dedmer-519', date: '2026-02-07', dosesProduced: 9, dosesSold: 5, quality: 'excellent' },
  { stallionId: 'stallion-dedmer-519', date: '2026-02-21', dosesProduced: 6, dosesSold: 2, quality: 'good' },
  { stallionId: 'stallion-dedmer-519', date: '2026-03-07', dosesProduced: 8, dosesSold: 4, quality: 'excellent' },
  // Rommert 498
  { stallionId: 'stallion-rommert-498', date: '2026-01-12', dosesProduced: 10, dosesSold: 6, quality: 'excellent' },
  { stallionId: 'stallion-rommert-498', date: '2026-01-26', dosesProduced: 9, dosesSold: 5, quality: 'excellent' },
  { stallionId: 'stallion-rommert-498', date: '2026-02-09', dosesProduced: 8, dosesSold: 4, quality: 'good' },
  { stallionId: 'stallion-rommert-498', date: '2026-02-23', dosesProduced: 10, dosesSold: 7, quality: 'excellent' },
  { stallionId: 'stallion-rommert-498', date: '2026-03-09', dosesProduced: 9, dosesSold: 5, quality: 'excellent' },
  // Beant 517
  { stallionId: 'stallion-beant-517', date: '2026-01-15', dosesProduced: 7, dosesSold: 3, quality: 'good' },
  { stallionId: 'stallion-beant-517', date: '2026-02-12', dosesProduced: 8, dosesSold: 4, quality: 'excellent' },
  { stallionId: 'stallion-beant-517', date: '2026-03-05', dosesProduced: 7, dosesSold: 3, quality: 'good' },
  // Wibout 511
  { stallionId: 'stallion-wibout-511', date: '2026-01-18', dosesProduced: 9, dosesSold: 6, quality: 'excellent' },
  { stallionId: 'stallion-wibout-511', date: '2026-02-15', dosesProduced: 8, dosesSold: 5, quality: 'excellent' },
  { stallionId: 'stallion-wibout-511', date: '2026-03-08', dosesProduced: 9, dosesSold: 7, quality: 'excellent' },
];
