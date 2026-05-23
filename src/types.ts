/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NetworkZone {
  id: string;
  name: string; // e.g. "Showroom", "Mesa de Vendas"
  icon: string; // Lucide icon string
  pointsCount: number; // e.g. 10
  description: string;
  applications: string[]; // e.g. ["Emissores de NF", "Consulta Score Bancário"]
  color: string; // tailwind color class e.g. "emerald"
}

export interface PeripheralItem {
  id: string;
  name: string;
  category: "rack" | "switch" | "firewall" | "cabling" | "wifi" | "dedicated-link" | "accessory";
  specs: string;
  recommendedBrand: string;
  quantity: number;
  unitPriceEstimate: number;
  isMonthly: boolean; // Monthly fee like dedicated link
  criticalDuty: string; // Explicando ao cliente o valor disso
}

export interface ObjectionTemplate {
  id: string;
  title: string;
  summary: string;
  fullObjection: string;
}

export interface ProposalSettings {
  dealershipName: string;
  targetAudience: string;
  objection: string;
  budgetLimit: string;
  customContext: string;
}
