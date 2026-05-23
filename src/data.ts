/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NetworkZone, PeripheralItem, ObjectionTemplate } from "./types";

export const initialZones: NetworkZone[] = [
  {
    id: "showroom",
    name: "Showroom de Vendas",
    icon: "Car",
    pointsCount: 10,
    description: "Área de exposição principal onde os veículos novos e seminovos são apresentados.",
    applications: [
      "Totens interativos de customização de carros",
      "TVs de alta definição para catálogos digitais",
      "Terminais de recepção rápida e check-in",
      "Access Points PoE estruturados para clientes",
      "Laptops de consultores flutuantes"
    ],
    color: "blue"
  },
  {
    id: "sales",
    name: "Mesas de Vendas (Consultores)",
    icon: "Users",
    pointsCount: 15,
    description: "Mesas para atendimento individualizado de clientes, propostas e fechamentos.",
    applications: [
      "Computadores de trabalho dos consultores",
      "Telefones de voz sobre IP (VoIP) de alta fidelidade",
      "Impressora multifuncional compartilhada para contratos e propostas",
      "Terminais de assinatura digital física de vendas"
    ],
    color: "emerald"
  },
  {
    id: "finance",
    name: "Financeiro & Seguros (F&I)",
    icon: "ShieldAlert",
    pointsCount: 6,
    description: "Departamento extremamente crítico responsável pela análise de crédito, score bancário, financiamento e emissão de notas.",
    applications: [
      "Computadores dedicados seguros para integração com bancos parceiros",
      "VoIP exclusivos com criptografia padrão de redes financeiras",
      "Scanners de documentos de alta velocidade para cadastro",
      "Emissor de Notas Fiscais Eletrônicas (NFe) conectado diretamente à SEFAZ"
    ],
    color: "rose"
  },
  {
    id: "admin",
    name: "Administração, RH e Diretoria",
    icon: "Briefcase",
    pointsCount: 9,
    description: "Controle financeiro interno, recursos humanos, gerência geral e diretoria executiva.",
    applications: [
      "Servidor de armazenamento local NAS (Backup de fotos de veículos e contratos)",
      "Gravador de Vídeo de Segurança DVR/NVR das câmeras de vigilância",
      "Estações de trabalho do faturamento e contabilidade interna",
      "Ponto de rede cabeado de alta prioridade na mesa do Diretor Geral"
    ],
    color: "amber"
  },
  {
    id: "workshop",
    name: "Oficina Mecânica & Preparação",
    icon: "Wrench",
    pointsCount: 10,
    description: "Área de diagnóstico de motores, revisão técnica de garantia e lavagem/polimento estético.",
    applications: [
      "Equipamentos de diagnóstico veicular conectados (OBD-II em rede)",
      "Computadores para controle e requisição de autopeças no estoque",
      "Câmeras de Segurança IP PoE acompanhando reparos de carros sob auditoria",
      "Access Points industriais para os mecânicos e vistoriadores usarem tablets"
    ],
    color: "purple"
  }
];

export const initialPeripherals: PeripheralItem[] = [
  {
    id: "firewall",
    name: "Next-Generation Firewall (NGFW)",
    category: "firewall",
    specs: "Firewall físico com IPS integrado, Antivírus em nível de gateway, Filtragem Web, prevenção contra malwares/ransomware e balanceamento automático de carga de redes (SD-WAN) com Failover ativo.",
    recommendedBrand: "Fortinet FortiGate 40F ou Sophos XGS 107",
    quantity: 1,
    unitPriceEstimate: 5200,
    isMonthly: false,
    criticalDuty: "Protege o score de crédito de clientes no F&I, impede ataques cibernéticos, cumpre as regras da LGPD e distribui o tráfego de internet inteligentemente."
  },
  {
    id: "switch-poe",
    name: "Switch PoE+ Enterprise L2/L3 (Principal)",
    category: "switch",
    specs: "Switch de 48 Portas Gigabit RJ-45 Auto-sensing PoE+ com orçamento de energia de 370W, slots SFP+ de 10Gbps para conexões uplink rápidas diretamente ao roteador, empilhável.",
    recommendedBrand: "Cisco Catalyst 1200-48P ou Aruba InstantOn 1930",
    quantity: 1,
    unitPriceEstimate: 4800,
    isMonthly: false,
    criticalDuty: "Conecta centralmente os computadores, alimenta e transmite dados simultaneamente para os Access Points e Câmeras de monitoramento através de um único cabo Ethernet."
  },
  {
    id: "switch-workshop",
    name: "Switch Gigabit PoE Compacto (Oficina)",
    category: "switch",
    specs: "Switch de 8 ou 16 Portas Gigabit com suporte a PoE nos canais principais, usado para conectar periféricos da Oficina Mecânica e cascateado em fibra/velocidade rápida ao rack principal.",
    recommendedBrand: "Ubiquiti UniFi Switch Pro ou TP-Link JetStream",
    quantity: 1,
    unitPriceEstimate: 1200,
    isMonthly: false,
    criticalDuty: "Evita passar dezenas de fios de longa distância da oficina até o escritório de vendas, mantendo a integridade do cabeamento estruturado."
  },
  {
    id: "dedicated-link",
    name: "Link Dedicado de Fibra Óptica",
    category: "dedicated-link",
    specs: "100 Mbps Simétricos de Internet Dedicada de Fibra (Download = Upload), 100% de garantia de banda em Contrato, IP Público Fixo para servidor e câmeras, suporte prioritário de TI com SLA de 4 horas máximo.",
    recommendedBrand: "Embratel, Vivo Empresas ou Claro Corp",
    quantity: 1,
    unitPriceEstimate: 1400,
    isMonthly: true,
    criticalDuty: "Garante faturamento contínuo de notas fiscais, consultas instantâneas aos scores bancários nacionais sem quedas coletivas, e envio ágil para sites de vendas."
  },
  {
    id: "backup-link",
    name: "Link de Backup / Redundância Estágio 2",
    category: "dedicated-link",
    specs: "Fibra Óptica Comercial Padrão ou Banda Larga Gigabit Coaxial. Conexão assimétrica de 400 Mbps contratada para redundância paralela.",
    recommendedBrand: "Operadora Local (Rede Neutra ou Provedor Regional)",
    quantity: 1,
    unitPriceEstimate: 200,
    isMonthly: true,
    criticalDuty: "Se houver rompimento acidental na fibra física do link principal, o tráfego da concessionária é redirecionado em menos de 3 segundos para que o faturamento de carros não pare."
  },
  {
    id: "rack",
    name: "Gabinete Rack Organizador 19\" Fechado (24U)",
    category: "rack",
    specs: "Rack metálico fechado com porta de vidro temperado e tranca a chave, teto basculante com ventiladores integrados (exaustores), bandejas internas deslizantes, réguas de tomadas para energia.",
    recommendedBrand: "MaxEletron 19\" ou Intelbras OR",
    quantity: 1,
    unitPriceEstimate: 1800,
    isMonthly: false,
    criticalDuty: "Armazena e protege fisicamente os equipamentos contra modificações de pessoas não autorizadas, roubo de dados, respingos, poeira e superaquecimento."
  },
  {
    id: "patch-panel",
    name: "Patch Panel Cat6 Blindado 24 Portas",
    category: "cabling",
    specs: "Patch Panel de 24 portas RJ45 Cat6 estruturado para keystones, fixado no rack, com guia traseira organizadora de cabos para durabilidade e certificação posterior de links.",
    recommendedBrand: "Furukawa SOHOPLUS ou Legrand",
    quantity: 2,
    unitPriceEstimate: 450,
    isMonthly: false,
    criticalDuty: "Faz a transição mecânica perfeita entre os cabos rígidos que vêm da parede/pisos e os patch cords flexíveis que vão ao Switch. Evita mal contato físico."
  },
  {
    id: "cabling-points",
    name: "Cabeamento Lógico Estruturado Cat6 (Pontos)",
    category: "cabling",
    specs: "Instalação completa por padrão Cat6 100% Cobre Homologado Anatel (cabos Furukawa/NEXANS), tomadas canaletas em PVC antichama ou sob o piso, identificação com anilhas e testes de certificação Fluke LinkIQ.",
    recommendedBrand: "Metragem de cabos, Jacks RJ45 Keystones e Mão de Obra de Engenharia",
    quantity: 50,
    unitPriceEstimate: 180,
    isMonthly: false,
    criticalDuty: "Os 50 pontos de conexão física. Fornecem imunidade total a interferências eletromagnéticas, garantem transmissão em velocidades estáveis sem lentidões por ruído elétrico de carros."
  },
  {
    id: "wifi-ap",
    name: "Enterprise Access Point PoE (Wi-Fi 6 AX)",
    category: "wifi",
    specs: "Access Points Corporativos integrados via antena de alto ganho MIMO 2x2, gerenciável em nuvem por controladora, suporta mais de 100 conexões simultâneas livres de latência, ligadas no PoE do Switch.",
    recommendedBrand: "Ubiquiti UniFi U6-Lite ou TP-Link EAP610",
    quantity: 3,
    unitPriceEstimate: 950,
    isMonthly: false,
    criticalDuty: "Fornece cobertura de alta performance sem fios no Showroom, Administração e Oficina mecânica, isolados do sistema de faturamento interno do Financeiro."
  },
  {
    id: "nobreak",
    name: "Nobreak Senoidal Online Senoidal 1500VA",
    category: "accessory",
    specs: "Nobreak com onda senoidal perfeita, baterias corporativas internas auto-gerenciadas, proteção ativa contra surtos de tensão, porta de comunicação USB para desligamento programado dos servidores redundantes.",
    recommendedBrand: "APC Smart-UPS ou SMS Senoidal Pro",
    quantity: 1,
    unitPriceEstimate: 1600,
    isMonthly: false,
    criticalDuty: "Absorve oscilações da concessionária de energia e mantém o Firewall, Switch principal e Links de Internet rodando por até 45 minutos em apagões de energia."
  },
  {
    id: "nas-backup",
    name: "Servidor de Armazenamento Local NAS (RAID 1)",
    category: "accessory",
    specs: "Gabinete de Storage local de alta performance com dois HDs de 4TB integrados em espelhamento RAID 1 automático (segurança de hardware se um falhar), com backup agendado automático na nuvem.",
    recommendedBrand: "Synology DiskStation DS224+ ou QNAP",
    quantity: 1,
    unitPriceEstimate: 3200,
    isMonthly: false,
    criticalDuty: "Armazena as fotos em alta resolução do catálogo do estoque, os backups diários do sistema de contabilidade local e os contratos PDF assinados com sigilo absoluto."
  }
];

export const staticObjections: ObjectionTemplate[] = [
  {
    id: "wifi-sufficient",
    title: "Por que uma rede cabeada se já temos Wi-Fi?",
    summary: "Refutar a crença de que redes comerciais funcionam bem só com Wi-Fi residencial comum ou roteadores convencionais.",
    fullObjection: "O cliente acredita que investir dezenas de milhares de reais em infraestrutura de cabos Cat6 é desnecessário porque 'hoje tudo é Wi-Fi' e parece mais fácil usar repetidores domésticos baratos pela loja de automóveis."
  },
  {
    id: "firewall-expense",
    title: "Firewall físico de hardware vs Antivírus comum",
    summary: "Explicar por que o antivírus gratuito em computadores individuais não impede os perigos reais de rede corporativa de concessionárias.",
    fullObjection: "O cliente argumenta que não precisa gastar mil reais por mês ou cinco mil reais no firewall corporativo com assinaturas de segurança de porta porque 'já temos antivírus pago' em todos os computadores."
  },
  {
    id: "dedicated-link",
    title: "Link Dedicado Corporativo vs Internet Banda Larga Comum de R$ 99",
    summary: "Deixar evidente a ruína financeira que ocorre quando a rede de faturamento cai de repente num sábado à tarde de vendas intensivas.",
    fullObjection: "O cliente acha absurdo pagar mais de mil reais em um link de internet simétrico corporativo com garantia de disponibilidade por mês se ele tem acesso a 'planos de 500 Megas na TV a cabo no comércio dele' que custam pouquíssimo."
  },
  {
    id: "lgpd-compliance",
    title: "Lei Geral de Proteção de Dados (LGPD) e vazamento de crédito",
    summary: "Mostrar os riscos civis, judiciais e de credibilidade se o banco de dados de score bancário de carros novos for invadido.",
    fullObjection: "O cliente não vê urgência em proteger os dados dos clientes com rede lógica estruturada dividida por VLAN, sem notar que propostas contendo CPFs, salários e contratos de leasing expõem seu CNPJ a multas pesadíssimas no Ministério Público."
  }
];
