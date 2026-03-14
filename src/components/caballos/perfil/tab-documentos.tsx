'use client';

import { Horse } from '@/types';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';
import { motion } from 'framer-motion';
import {
  FileText, Shield, Award, Stethoscope, FileCheck, Image, FileVideo,
  Download,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TabDocumentosProps {
  horse: Horse;
}

interface DocItem {
  icon: LucideIcon;
  name: string;
  description: string;
  type: string;
  size: string;
  date: string;
  color: string;
  bgColor: string;
}

function getDocuments(horse: Horse): DocItem[] {
  const isStallion = horse.sex === 'stallion';
  const docs: DocItem[] = [
    {
      icon: FileText,
      name: 'Pasaporte KFPS',
      description: `Documento oficial de identidad — ${horse.name}`,
      type: 'PDF',
      size: '2.4 MB',
      date: '2023-06-15',
      color: '#C8A04A',
      bgColor: 'rgba(200, 160, 74, 0.12)',
    },
    {
      icon: Award,
      name: 'Certificado de Registro KFPS',
      description: `Registro en libro genealógico — ${horse.studbook}`,
      type: 'PDF',
      size: '1.8 MB',
      date: '2023-06-15',
      color: '#C8A04A',
      bgColor: 'rgba(200, 160, 74, 0.12)',
    },
    {
      icon: Stethoscope,
      name: 'Certificado Veterinario',
      description: 'Certificado de salud y vacunas vigentes',
      type: 'PDF',
      size: '980 KB',
      date: '2025-09-15',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.12)',
    },
    {
      icon: Shield,
      name: 'Pruebas Genéticas',
      description: 'Resultados Dwarfism + Hydrocephalus — Negativo',
      type: 'PDF',
      size: '1.2 MB',
      date: '2025-11-20',
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.12)',
    },
  ];

  if (isStallion) {
    docs.push({
      icon: FileCheck,
      name: 'Certificado de Aprobación KFPS',
      description: `Aprobación como semental — ${horse.approvalStatus === 'permanently_approved' ? 'Permanente' : 'Activa'}`,
      type: 'PDF',
      size: '1.5 MB',
      date: '2023-01-10',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.12)',
    });
    docs.push({
      icon: FileText,
      name: 'Contrato de Importación',
      description: `Importación desde ${horse.countryOfBirth}`,
      type: 'PDF',
      size: '3.1 MB',
      date: '2022-08-20',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
    });
  }

  if (horse.keuringHistory.length > 0) {
    docs.push({
      icon: Award,
      name: 'Reporte de Keuring',
      description: `Último keuring: ${horse.keuringHistory[horse.keuringHistory.length - 1].year} — ${horse.keuringHistory[horse.keuringHistory.length - 1].premium}`,
      type: 'PDF',
      size: '850 KB',
      date: `${horse.keuringHistory[horse.keuringHistory.length - 1].year}-12-01`,
      color: '#C8A04A',
      bgColor: 'rgba(200, 160, 74, 0.12)',
    });
  }

  docs.push(
    {
      icon: Image,
      name: 'Galería de Fotos',
      description: `${isStallion ? '24' : '12'} fotos de conformación y movimiento`,
      type: 'Carpeta',
      size: isStallion ? '48 MB' : '24 MB',
      date: '2025-10-01',
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.12)',
    },
    {
      icon: FileVideo,
      name: 'Videos',
      description: isStallion ? 'Video presentación + movimiento' : 'Video movimiento',
      type: 'Carpeta',
      size: isStallion ? '120 MB' : '60 MB',
      date: '2025-10-01',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.12)',
    },
  );

  return docs;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TabDocumentos({ horse }: TabDocumentosProps) {
  const documents = getDocuments(horse);

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card hover={false}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gold-glow">
              <FileText className="w-4 h-4 text-gold" />
            </div>
            <SectionLabel>Documentos del Ejemplar</SectionLabel>
            <span className="ml-auto text-[12px] text-text-muted">{documents.length} archivos</span>
          </div>

          <div className="space-y-2">
            {documents.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-bg-elevated border border-border hover:border-gold/20 transition-colors group"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ backgroundColor: doc.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: doc.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-text-primary font-medium">{doc.name}</p>
                    <p className="text-[11px] text-text-muted truncate">{doc.description}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-[11px] text-text-muted">{doc.type} · {doc.size}</p>
                    <p className="text-[10px] text-text-muted">{formatDate(doc.date)}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                    <Download className="w-4 h-4 text-gold" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          <p className="text-[11px] text-text-muted text-center mt-4 italic">
            Los documentos son de demostración. La descarga se habilitará con la integración del backend.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
