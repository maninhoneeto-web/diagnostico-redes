/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Network, 
  Wifi, 
  ShieldCheck, 
  Server, 
  Activity, 
  Printer, 
  Zap, 
  Globe, 
  Database, 
  Cpu, 
  Sliders, 
  AlertTriangle,
  RotateCcw,
  Check,
  Building2,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  Copy,
  ExternalLink
} from "lucide-react";

export default function App() {
  // Configuration States (Editable by the User)
  const [dealershipName, setDealershipName] = useState("Líder Auto Veículos");
  const [representativeName, setRepresentativeName] = useState("Líder Auto Veículos - Direção Executiva");
  const [analystName, setAnalystName] = useState("TI Corporativa & Redes Estruturadas");

  // Photos for each subsystem mapped by ID
  const [subsystemImages, setSubsystemImages] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem("subsystem_images");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    
    return {
      showroom: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350",
      sales: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=350",
      finance: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350",
      workshop: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600&h=350",
      admin: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350"
    };
  });

  const [editingSubsystemId, setEditingSubsystemId] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copiedLinkSuccess, setCopiedLinkSuccess] = useState(false);
  const [customImageUrlInput, setCustomImageUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleUpdateImage = (id: string, url: string) => {
    const updated = { ...subsystemImages, [id]: url };
    setSubsystemImages(updated);
    try {
      localStorage.setItem("subsystem_images", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && editingSubsystemId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleUpdateImage(editingSubsystemId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const presetPhotos: Record<string, { label: string; url: string }[]> = {
    showroom: [
      { label: "Showroom Premium Luxo", url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Showroom Moderno Clean", url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Showroom Esportivo Noturno", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600&h=350" }
    ],
    sales: [
      { label: "Mesa de Vendas Executiva", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Consultor de Vendas & Cliente", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Escritório Comercial Aberto", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=350" }
    ],
    finance: [
      { label: "Segurança e Assinatura", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Foco Analítico de Crédito", url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Gerenciamento de Ativos", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600&h=350" }
    ],
    workshop: [
      { label: "Diagnóstico Mecatrônico", url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Oficina de Alta Tecnologia", url: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Verificação sob Elevador", url: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600&h=350" }
    ],
    admin: [
      { label: "Infraestrutura Rack & Servidor", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Sala de Servidores TI", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=350" },
      { label: "Gabinete Gerência Geral", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600&h=350" }
    ]
  };
  
  // Equipment selection states
  const [firewallModel, setFirewallModel] = useState("Firewall FortiGate Criptografado");
  const [switchBrand, setSwitchBrand] = useState("Switch Aruba/Cisco Gigabit PoE+");
  const [cableStandard, setCableStandard] = useState("Cabo Rígido Cat.6 Cobre LSZH");

  // Subsystem physical network points state
  const [showroomPoints, setShowroomPoints] = useState(12);
  const [salesPoints, setSalesPoints] = useState(15);
  const [financePoints, setFinancePoints] = useState(5);
  const [workshopPoints, setWorkshopPoints] = useState(10);
  const [adminPoints, setAdminPoints] = useState(8);

  // Subsystem VLAN custom names
  const [showroomVlan, setShowroomVlan] = useState("VLAN 20 - Showroom e Mídias Integradas");
  const [salesVlan, setSalesVlan] = useState("VLAN 10 - Escopo Comercial e Operações ERP");
  const [financeVlan, setFinanceVlan] = useState("VLAN 30 - F&I Blindado (Isolamento Restrito)");
  const [workshopVlan, setWorkshopVlan] = useState("VLAN 40 - Motores, Scanners Eletrônicos e Engenharia");
  const [adminVlan, setAdminVlan] = useState("VLAN 50 - Circuitos IP e Armazenamento Centralizado");

  // Financial impact calculation config states
  const [carValue, setCarValue] = useState(180000);
  const [carsSoldPerMonth, setCarsSoldPerMonth] = useState(45);
  const [hoursDowntime, setHoursDowntime] = useState(12);
  const [impactRatePercent, setImpactRatePercent] = useState(15); // Percentage of business activity lost when network is down

  // Tab state in the customizer
  const [activeTab, setActiveTab] = useState("ident");

  // Company profile presets definition
  const presets = [
    {
      name: "🚗 Líder Auto Veículos (Padrão)",
      dealershipName: "Líder Auto Veículos",
      representativeName: "Líder Auto Veículos - Direção Executiva",
      analystName: "TI Corporativa & Redes Estruturadas",
      firewallModel: "Firewall FortiGate Criptografado",
      switchBrand: "Switch Aruba/Cisco Gigabit PoE+",
      cableStandard: "Cabo Rígido Cat.6 Cobre LSZH",
      showroomPoints: 12,
      salesPoints: 15,
      financePoints: 5,
      workshopPoints: 10,
      adminPoints: 8,
      carValue: 180000,
      carsSoldPerMonth: 45,
      hoursDowntime: 12,
      impactRatePercent: 15,
      vlanShowroom: "VLAN 20 - Showroom e Mídias Integradas",
      vlanSales: "VLAN 10 - Escopo Comercial e Operações ERP",
      vlanFinance: "VLAN 30 - F&I Blindado (Isolamento Restrito)",
      vlanWorkshop: "VLAN 40 - Motores, Scanners Eletrônicos e Engenharia",
      vlanAdmin: "VLAN 50 - Circuitos IP e Armazenamento Centralizado"
    },
    {
      name: "🏎️ Veloce Import Supercars (Exóticos)",
      dealershipName: "Veloce Import Supercars",
      representativeName: "Veloce Imports - Direção de Engenharia",
      analystName: "Cabling Expert Senior",
      firewallModel: "Palo Alto NGFW Next-Gen",
      switchBrand: "Cisco Catalyst Core PoE++",
      cableStandard: "Cabo Cat.6A Shielded S/FTP",
      showroomPoints: 18,
      salesPoints: 10,
      financePoints: 6,
      workshopPoints: 12,
      adminPoints: 6,
      carValue: 1200000,
      carsSoldPerMonth: 8,
      hoursDowntime: 4,
      impactRatePercent: 30,
      vlanShowroom: "VLAN 100 - Supercars Ultra-HD Display",
      vlanSales: "VLAN 110 - VIP Negotiation Lounge & VPN",
      vlanFinance: "VLAN 120 - High-Security Treasury Portal",
      vlanWorkshop: "VLAN 130 - Telemetry & Performance Scanners",
      vlanAdmin: "VLAN 140 - Cloud Sync & NAS Storage"
    },
    {
      name: "🔧 Mecatrônica Multi-Oficina (Alta Escala)",
      dealershipName: "Mecatrônica Avançada Auto-Check",
      representativeName: "Auto-Check Engenharia de Processos",
      analystName: "Arquiteto de Redes Industriais",
      firewallModel: "Sophos XG Enterprise Firewall",
      switchBrand: "Switches Industriais Ruggedized",
      cableStandard: "Cabo Industrial Blindado Cat.6 SF/UTP",
      showroomPoints: 4,
      salesPoints: 6,
      financePoints: 4,
      workshopPoints: 24,
      adminPoints: 5,
      carValue: 95000,
      carsSoldPerMonth: 120,
      hoursDowntime: 24,
      impactRatePercent: 25,
      vlanShowroom: "VLAN 10 - Totens Recepção Agendamentos",
      vlanSales: "VLAN 20 - CRM de Pós-Venda Operacional",
      vlanFinance: "VLAN 30 - Faturamento e Caixa Balcão",
      vlanWorkshop: "VLAN 40 - Scanners OBD e Retífica Industrial",
      vlanAdmin: "VLAN 50 - Circuitos de Câmeras IP de Box"
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setDealershipName(preset.dealershipName);
    setRepresentativeName(preset.representativeName);
    setAnalystName(preset.analystName);
    setFirewallModel(preset.firewallModel);
    setSwitchBrand(preset.switchBrand);
    setCableStandard(preset.cableStandard);
    setShowroomPoints(preset.showroomPoints);
    setSalesPoints(preset.salesPoints);
    setFinancePoints(preset.financePoints);
    setWorkshopPoints(preset.workshopPoints);
    setAdminPoints(preset.adminPoints);
    setCarValue(preset.carValue);
    setCarsSoldPerMonth(preset.carsSoldPerMonth);
    setHoursDowntime(preset.hoursDowntime);
    setImpactRatePercent(preset.impactRatePercent);
    setShowroomVlan(preset.vlanShowroom);
    setSalesVlan(preset.vlanSales);
    setFinanceVlan(preset.vlanFinance);
    setWorkshopVlan(preset.vlanWorkshop);
    setAdminVlan(preset.vlanAdmin);
  };

  // Panel display state
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  // Default baseline restorer
  const handleRestoreDefaults = () => {
    applyPreset(presets[0]);
  };

  // Navigates to a specific tab and highlights/focuses an input element
  const navigateToField = (tab: string, fieldId?: string) => {
    setIsPanelExpanded(true);
    setActiveTab(tab);
    
    // Scroll to customizer panel smoothly
    const panel = document.getElementById("customizer-panel");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (fieldId) {
      setTimeout(() => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.focus();
          // Add a temporary glow animation
          field.classList.add("ring-4", "ring-amber-500/50");
          setTimeout(() => {
            field.classList.remove("ring-4", "ring-amber-500/50");
          }, 1500);
        }
      }, 150);
    }
  };

  // Dynamic point matrix calculations
  const totalPoints = useMemo(() => {
    return showroomPoints + salesPoints + financePoints + workshopPoints + adminPoints;
  }, [showroomPoints, salesPoints, financePoints, workshopPoints, adminPoints]);

  // Business metrics calculation formula
  // Standard monthly operational capacity = 22 working days * 8 hours = 176 business hours/month
  const monthlyRevenue = useMemo(() => carValue * carsSoldPerMonth, [carValue, carsSoldPerMonth]);
  const baseHourlyRevenue = useMemo(() => monthlyRevenue / 176, [monthlyRevenue]);
  
  // True downtime hourly risk = hourly baseline revenue * average impact factor active in that window
  const hourlyDowntimeLoss = useMemo(() => {
    return baseHourlyRevenue * (impactRatePercent / 100);
  }, [baseHourlyRevenue, impactRatePercent]);

  const annualLoss = useMemo(() => {
    return hourlyDowntimeLoss * hoursDowntime;
  }, [hourlyDowntimeLoss, hoursDowntime]);

  const hourlyLossRate = hourlyDowntimeLoss;

  // Strictly compliant material spec sheet dynamically listening to cable standard state
  const materialSpecs = useMemo(() => [
    {
      item: "Tomada Fêmea RJ45 (Keystone Cat.6)",
      category: "Elementos Passivos",
      standard: "ANSI/TIA-568.2-D | NBR 14565",
      description: "Interface metálica modular de alta Categoria fixada nos postos de trabalho (espelhos de tomada de embutir ou canaletas de alumínio). Recebe a terminação do cabo rígido sem soldas por crimpagem IDC de 8 vias.",
      function: "Funciona como ponto físico rígido e fixado para entrega de sinal. Isola o cabo rígido fixo contra danos decorrentes de flexões normais do uso diário."
    },
    {
      item: "Cabo de Manobra de Equipamento (Line Cord Cat.6)",
      category: "Cabos Flexíveis",
      standard: "ISO/IEC 11801 Class E",
      description: "Cabo flexível composto por múltiplos fios condutores trançados de cobre macio, montado eletronicamente e blindado com conectores industriais RJ45 injetados em ambas as pontas.",
      function: "Estabelece a conexão física ativa entre a Tomada Fêmea (Keystone) do espelho de parede e o conector fêmea dos computadores, impressoras e scanners."
    },
    {
      item: "Cabo de Manobra de Organização (Patch Cord Cat.6)",
      category: "Cabos Flexíveis",
      standard: "ANSI/TIA-568.2-D",
      description: "Cabo flexível injetado usado exclusivamente no interior do Rack de TI de 19 polegadas para interligação dinâmica.",
      function: "Interliga eletromecanicamente a porta do Patch Panel (onde terminam os cabos da infraestrutura) diretamente às portas ativas do Switch Gigabit PoE+."
    },
    {
      item: "Cabo Rígido de Distribuição",
      category: "Infraestrutura Fixa",
      standard: `ANSI/TIA-568-C.2 (${cableStandard})`,
      description: `Cabo sólido contínuo constituído por cobre eletrolítico integral de alta purificação e separador físico em cruz para contenção eletromagnética. Cobertura livre de halogênios grau LSZH contra emissão de fumaça tóxica.`,
      function: "Transmite o fluxo binário por longos comprimentos sob tubulações e calhas, assegurando 1000 Mbps de largura de banda e distribuição elétrica PoE de alta amperagem."
    },
    {
      item: "Conector Macho RJ45 Gold Plated",
      category: "Acessórios",
      standard: "FCC Part 68 | IEC 60603-7",
      description: "Plug modular terminal injetado com pinos niquelados banhados a ouro para assegurar condutividade elétrica ótima com baixíssima resistência de contato.",
      function: "Corta a atenuação de retorno nas conexões de terminação das baias de atendimento, showroom e faturamento."
    }
  ], [cableStandard]);

  // Subsystem structural mapping
  const subsystems = useMemo(() => [
    {
      id: "showroom",
      name: "SUBSISTEMA SHOWROOM (Área de Exposição)",
      points: showroomPoints,
      vlan: showroomVlan,
      standard: "ANSI/TIA-568.0-D",
      whyWired: "O showroom é composto por grandes divisórias de vidro temperado laminado e múltiplos motores de alto porte metálico que provocam reflexão de rádio contínua (Multipath Fading). O cabeamento estruturado metálico assegura latência inferior a 1ms necessária para renderização cinematográfica em tempo real.",
      applications: [
        "Totens interativos de simulação veicular em Realidade Virtual",
        "Sistemas integrados de Sinalização Digital (Smart TVs 4K)",
        "Terminais de consulta de catálogos e customizações dinâmicas"
      ],
      connections: `${showroomPoints} Tomadas Fêmeas RJ45 Keystone conexos por Line Cords flexíveis Categoria 6.`,
      operationalImpact: "O uso de conexões vulneráveis via Wi-Fi comum gera travamento de fotos HD e descompensa o carregamento das especificações do veículo novo no momento em que o cliente de alto valor está no showroom, provocando imediato declínio no fechamento da venda."
    },
    {
      id: "sales",
      name: "SUBSISTEMA COMERCIAL (Baias e Mesas de Vendas)",
      points: salesPoints,
      vlan: salesVlan,
      standard: "ANSI/TIA-568.1-D",
      whyWired: "Área de densidade de tráfego administrativo constante. O cabo de cobre sólido neutraliza a perda de pacotes e o Jitter que tornariam as ligações VoIP (SIP) inteligíveis ou ruidosas, eliminando qualquer tipo de degradação.",
      applications: [
        "Estações de trabalho dos consultores seniores conectadas ao ERP corporativo",
        "Aparelhos de Telefonia IP baseados em protocolo SIP (VoIP)",
        "Unidades multifuncionais de impressão estática de contratos"
      ],
      connections: `${salesPoints} Tomadas Fêmeas RJ45 Keystone instaladas em canaletas integradas sob as mesas.`,
      operationalImpact: "O Wi-Fi comum de operadora sofre quedas de rádio induzidas pelo movimento da loja, fazendo com que o envio de propostas para a mesa da montadora de veículos caia repentinamente, atrasando negociações e forçando o cliente a aguardar."
    },
    {
      id: "finance",
      name: "SUBSISTEMA FINANCEIRO & F&I (Aprovação de Crédito)",
      points: financePoints,
      vlan: financeVlan,
      standard: "ANSI/TIA-568.2-D | ISO/IEC 11801 Class E",
      whyWired: "É o coração fiduciário da concessionária. Sob diretrizes da LGPD, os dados cadastrais, scores bancários e fichas financeiras devem trafegar por rotas imunes a sniffing de Wi-Fi e interceptações remotas de sinal.",
      applications: [
        "Acesso prioritário dedicado aos servidores bancários das financeiras integradas",
        "Emissão criptografada de Notas Fiscais Eletrônicas (NFe) e serviços governamentais",
        "Sistemas independentes de conciliação de pagamentos com redundância em hardware"
      ],
      connections: `${financePoints} Tomadas Fêmeas RJ45 Keystone estruturadas em barramento fechado no setor blindado.`,
      operationalImpact: "A interceptação de dados ou a oscilação do sistema no meio de uma análise de score de crédito para faturamento de R$ 300 mil gera multas civis gravíssimas sob a égide da LGPD, além de bloquear o faturamento no encerramento do mês."
    },
    {
      id: "workshop",
      name: "SUBSISTEMA OFICINA MECÂNICA (Mecatrônica & Diagnósticos)",
      points: workshopPoints,
      vlan: workshopVlan,
      standard: "ANSI/TIA-1005-A (Norma Industrial MICE)",
      whyWired: "O local de oficina é um ambiente Classe MICE de severo impacto magnético. Motores elétricos trifásicos de compressores, partida de alternadores e bobinas de ignição geram picos transientes e interferência de rádio (EMI) que destroem pacotes de dados sem fio.",
      applications: [
        "Scanners OBD-II de alta precisão (Diagnóstico integral via rede lógica)",
        "Terminais de controle e baixa de estoque de autopeças (Módulos ERP)",
        "Câmeras IP PoE de circuito fechado para vistoria remota e controle operacional"
      ],
      connections: `${workshopPoints} Tomadas Fêmeas RJ45 Keystone em caixa blindada de sobrepor industrial.`,
      operationalImpact: "Se o scanner mecânico perder pacotes Wi-Fi durante uma recalibração crítica ou atualização de firmware de um módulo de injeção direta de veículo importado, a memória do processador corrompe, exigindo a substituição física do módulo (ECU) de alto custo."
    },
    {
      id: "admin",
      name: "SUBSISTEMA ADMINISTRATIVO (NVR/Backup & Diretoria)",
      points: adminPoints,
      vlan: adminVlan,
      standard: "ANSI/TIA-569-E",
      whyWired: "Setor concentrador de vídeo contínuo e backups massivos. Gravar múltiplos feeds de câmeras de alta fidelidade e trafegar arquivos pesados no Wi-Fi satura a banda aérea das outras salas da concessionária.",
      applications: [
        "Servidores locais NVR e armazenamento centralizado em rede (NAS)",
        "Computadores de controle financeiro interno e controle de folha",
        "Relógios físicos eletrônicos de ponto biométrico integrados nativos"
      ],
      connections: `${adminPoints} Tomadas Fêmeas RJ45 Keystone distribuídas centralmente na sala administrativa.`,
      operationalImpact: "Perda de frames e congelamento de imagens de auditoria por falhas do sinal de rádio comum impossibilita a identificação de colisões ou danos estruturais que ocorrem no estoque físico de veículos."
    }
  ], [showroomPoints, salesPoints, financePoints, workshopPoints, adminPoints, showroomVlan, salesVlan, financeVlan, workshopVlan, adminVlan]);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
      
      {/* PROFESSIONAL SCHEMATIC HEADER */}
      <header className="border-b border-slate-900 bg-[#090e18]/95 backdrop-blur-md sticky top-0 z-50 py-4 px-6 md:px-12 print:bg-white print:text-black print:border-b-2 print:border-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded text-slate-950 shadow-md border border-amber-400/20">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
                  MEMORIAL TÉCNICO • INFRAESTRUTURA DE REDE
                </h1>
                <span className="hidden sm:inline-block text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-mono px-2.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  {totalPoints} Pontos Ativos
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Normativas ANSI/TIA-568.2-D | NBR 14565 • Rede 100% Homologável Metálica</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 print:hidden shrink-0">
            <div className="px-3.5 py-1.5 bg-[#0e1625] border border-slate-800 rounded flex flex-col items-end">
              <span className="text-[9px] text-[#8c9cb5] font-mono font-bold uppercase tracking-wider">PROPRIETÁRIO DO MEMORIAL</span>
              <span className="text-xs font-bold text-[#f2be5c] font-mono leading-none mt-1 truncate max-w-[180px]">{dealershipName}</span>
            </div>
            
            <button 
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 px-4 rounded text-xs transition duration-150 border border-amber-450 shadow-lg shadow-amber-500/10 cursor-pointer"
              id="btn-print"
            >
              <Printer className="w-4 h-4" />
              Gerar PDF / Imprimir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
        
        {/* INTERACTIVE CONTROLS PANEL (HIDDEN IN PRINT) */}
        <section className="bg-[#0a111f] border-2 border-amber-500/30 rounded-xl p-5 md:p-6 space-y-5 print:hidden shadow-2xl relative" id="customizer-panel">
          
          {/* Top title bar */}
          <div 
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 cursor-pointer hover:bg-[#0c1425] p-2 -m-2 rounded-lg transition-colors select-none group"
            title="Clique para expandir ou recolher o Painel de Controle"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 bg-amber-500/15 text-amber-400 rounded-lg border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                <Sliders className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h2 className="text-sm font-extrabold text-white font-mono tracking-wider uppercase flex items-center gap-2">
                  Painel de Controle de Especificações Editáveis
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded font-bold animate-pulse">
                    Menu Interativo Ativo
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Mude os valores abaixo. Os cálculos, textos e anexos em formato PDF mudam de forma instantânea.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold px-3.5 py-2 rounded cursor-pointer transition select-none flex items-center gap-1.5"
              >
                {isPanelExpanded ? "Recolher Painel" : "Expandir Painel"}
              </button>
              
              <button
                onClick={handleRestoreDefaults}
                className="flex items-center gap-1.5 text-xs bg-red-950/60 hover:bg-red-950 hover:bg-red-900 border border-red-900/40 hover:border-red-700 text-red-350 hover:text-red-200 font-bold px-3.5 py-2 rounded cursor-pointer transition"
                title="Restaurar valores de padrão de fábrica"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpar Ajustes
              </button>
            </div>
          </div>

          {isPanelExpanded && (
            <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">
              
              {/* RECOMMENDED PROFILE PRESETS SLIDER */}
              <div className="bg-[#070c16] p-4 rounded-lg border border-slate-800/80 space-y-2.5">
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                  Carga Rápida • Selecione um Perfil de Empresa para Autoafinar os valores:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(p)}
                      className="px-3.5 py-2 bg-[#0e1729] hover:bg-[#15243f] text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/50 rounded-lg text-xs font-mono transition flex items-center gap-1.5 font-bold cursor-pointer shadow-sm shadow-black/20"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABS SELECTOR */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-1">
                <button
                  onClick={() => setActiveTab("ident")}
                  className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all cursor-pointer ${activeTab === "ident" ? "bg-[#0c1424] text-amber-400 border-t border-x border-slate-800 shadow-md translate-y-[1px]" : "text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-900/45 pb-2"}`}
                >
                  🏷️ 1. Identificação
                </button>
                <button
                  onClick={() => setActiveTab("ativos")}
                  className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all cursor-pointer ${activeTab === "ativos" ? "bg-[#0c1424] text-amber-400 border-t border-x border-slate-800 shadow-md translate-y-[1px]" : "text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-900/45 pb-2"}`}
                >
                  🛡️ 2. Ativos e Cabos
                </button>
                <button
                  onClick={() => setActiveTab("pontos")}
                  className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all cursor-pointer ${activeTab === "pontos" ? "bg-[#0c1424] text-amber-400 border-t border-x border-slate-800 shadow-md translate-y-[1px]" : "text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-900/45 pb-2"}`}
                >
                  🖥️ 3. Distribuição & VLANs
                </button>
                <button
                  onClick={() => setActiveTab("metricas")}
                  className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all cursor-pointer ${activeTab === "metricas" ? "bg-[#0c1424] text-amber-400 border-t border-x border-slate-800 shadow-md translate-y-[1px]" : "text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-900/45 pb-2"}`}
                >
                  📊 4. Parâmetros do Negócio
                </button>
              </div>

              {/* TAB CONTENT SPACES */}
              <div className="bg-[#080d17] p-4 md:p-5 rounded-lg border border-slate-800 text-xs text-slate-300">
                
                {/* TAB 1: IDENTIFICATION */}
                {activeTab === "ident" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Nome da Concessionária</label>
                      <input 
                        type="text" 
                        id="input-dealership"
                        value={dealershipName}
                        onChange={(e) => setDealershipName(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white font-mono text-xs focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: Líder Auto Veículos"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Controla os títulos e cabeçalhos em toda a página e no PDF.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Diretor / Representante</label>
                      <input 
                        type="text" 
                        id="input-representative"
                        value={representativeName}
                        onChange={(e) => setRepresentativeName(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white font-mono text-xs focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: Diretoria Executiva"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Especifica o nome da autoridade na folha de assinatura final.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Nome do Engenheiro / Projetista</label>
                      <input 
                        type="text" 
                        id="input-analyst"
                        value={analystName}
                        onChange={(e) => setAnalystName(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white font-mono text-xs focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: TI Corporativa"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Exibido na assinatura técnica emitente sob as normas ANSI/TIA.</p>
                    </div>
                  </div>
                )}

                {/* TAB 2: EQUIPMENT SPECS */}
                {activeTab === "ativos" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Modelo da Segurança (Firewall)</label>
                      <input 
                        type="text" 
                        id="input-firewall"
                        value={firewallModel}
                        onChange={(e) => setFirewallModel(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: Firewall FortiGate Criptografado"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Atualiza os textos de infra, passo a passo e diagramas lógicos.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Marca / Especificações do Switch</label>
                      <input 
                        type="text" 
                        id="input-switch"
                        value={switchBrand}
                        onChange={(e) => setSwitchBrand(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: Switch Aruba/Cisco Gigabit PoE+"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Modifica a central de comutação citada nos memoriais.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Padrão do Cabo Metálico de Distribuição</label>
                      <input 
                        type="text" 
                        id="input-cable"
                        value={cableStandard}
                        onChange={(e) => setCableStandard(e.target.value)}
                        className="w-full bg-[#0d1526] hover:bg-[#111c33] border border-slate-700 focus:border-amber-500 rounded px-3 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-amber-500/20 outline-none transition cursor-text"
                        placeholder="Ex: Cabo Rígido Cat.6 Cobre LSZH"
                      />
                      <p className="text-[9px] text-slate-500 font-mono">Substitui a nomenclatura do canal físico permanente do duto.</p>
                    </div>
                  </div>
                )}

                {/* TAB 3: DISTRIBUTION AND VLANS */}
                {activeTab === "pontos" && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-slate-450 font-mono pb-2 border-b border-slate-800">
                      Aqui você edita simultaneamente a <strong className="text-white">quantidade de pontos ativos</strong> e o <strong className="text-white">nome técnico da VLAN</strong> de cada setor:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      
                      {/* Showroom */}
                      <div className="bg-[#0c1322] p-3.5 rounded border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-400 font-mono uppercase font-bold tracking-wider block">Showroom</span>
                          <input 
                            type="text"
                            id="input-vlan-showroom"
                            value={showroomVlan}
                            onChange={(e) => setShowroomVlan(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-200 focus:text-white rounded px-2 py-1.5 font-mono text-[10px] outline-none mt-1.5 cursor-text focus:ring-1 focus:ring-amber-500/20"
                            title="Nome da VLAN do Showroom"
                          />
                          
                          {/* Sector Image Control inside Active Config Panel */}
                          <div className="relative aspect-[16/10] rounded overflow-hidden border border-slate-850 mt-2.5 bg-slate-950 group select-none">
                            <img 
                              src={subsystemImages.showroom || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350"} 
                              alt="Showroom Preview" 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => {
                                setEditingSubsystemId("showroom");
                                setCustomImageUrlInput(subsystemImages.showroom || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350");
                              }}
                              className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/85 transition flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Clique para customizar a foto deste setor"
                            >
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">Alterar Foto</span>
                            </button>
                            <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-slate-405 font-mono flex items-center gap-1 pointer-events-none group-hover:hidden">
                              <Camera className="w-2.5 h-2.5 text-amber-500" /> Editar Foto
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                          <span className="text-[10px] text-slate-400">Pontos:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setShowroomPoints(Math.max(1, showroomPoints - 1))}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">{showroomPoints}</span>
                            <button
                              onClick={() => setShowroomPoints(showroomPoints + 1)}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >+</button>
                          </div>
                        </div>
                      </div>

                      {/* Comercial */}
                      <div className="bg-[#0c1322] p-3.5 rounded border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-400 font-mono uppercase font-bold tracking-wider block">Comercial Vendas</span>
                          <input 
                            type="text"
                            id="input-vlan-sales"
                            value={salesVlan}
                            onChange={(e) => setSalesVlan(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-200 focus:text-white rounded px-2 py-1.5 font-mono text-[10px] outline-none mt-1.5 cursor-text focus:ring-1 focus:ring-amber-500/20"
                            title="Nome da VLAN Comercial"
                          />

                          {/* Sector Image Control inside Active Config Panel */}
                          <div className="relative aspect-[16/10] rounded overflow-hidden border border-slate-855 mt-2.5 bg-slate-950 group select-none">
                            <img 
                              src={subsystemImages.sales || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=350"} 
                              alt="Comercial Preview" 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => {
                                setEditingSubsystemId("sales");
                                setCustomImageUrlInput(subsystemImages.sales || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=350");
                              }}
                              className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/85 transition flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Clique para customizar a foto deste setor"
                            >
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">Alterar Foto</span>
                            </button>
                            <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-slate-405 font-mono flex items-center gap-1 pointer-events-none group-hover:hidden">
                              <Camera className="w-2.5 h-2.5 text-amber-500" /> Editar Foto
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                          <span className="text-[10px] text-slate-400">Pontos:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSalesPoints(Math.max(1, salesPoints - 1))}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">{salesPoints}</span>
                            <button
                              onClick={() => setSalesPoints(salesPoints + 1)}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >+</button>
                          </div>
                        </div>
                      </div>

                      {/* Financeiro */}
                      <div className="bg-[#0c1322] p-3.5 rounded border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-400 font-mono uppercase font-bold tracking-wider block">Financeiro F&I</span>
                          <input 
                            type="text"
                            id="input-vlan-finance"
                            value={financeVlan}
                            onChange={(e) => setFinanceVlan(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-200 focus:text-white rounded px-2 py-1.5 font-mono text-[10px] outline-none mt-1.5 cursor-text focus:ring-1 focus:ring-amber-500/20"
                            title="Nome da VLAN do Financeiro"
                          />

                          {/* Sector Image Control inside Active Config Panel */}
                          <div className="relative aspect-[16/10] rounded overflow-hidden border border-slate-855 mt-2.5 bg-slate-950 group select-none">
                            <img 
                              src={subsystemImages.finance || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350"} 
                              alt="Financeiro Preview" 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => {
                                setEditingSubsystemId("finance");
                                setCustomImageUrlInput(subsystemImages.finance || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350");
                              }}
                              className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/85 transition flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Clique para customizar a foto deste setor"
                            >
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">Alterar Foto</span>
                            </button>
                            <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-slate-405 font-mono flex items-center gap-1 pointer-events-none group-hover:hidden">
                              <Camera className="w-2.5 h-2.5 text-amber-500" /> Editar Foto
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                          <span className="text-[10px] text-slate-400">Pontos:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setFinancePoints(Math.max(1, financePoints - 1))}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">{financePoints}</span>
                            <button
                              onClick={() => setFinancePoints(financePoints + 1)}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >+</button>
                          </div>
                        </div>
                      </div>

                      {/* Oficina */}
                      <div className="bg-[#0c1322] p-3.5 rounded border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-400 font-mono uppercase font-bold tracking-wider block">Oficina OBD</span>
                          <input 
                            type="text"
                            id="input-vlan-workshop"
                            value={workshopVlan}
                            onChange={(e) => setWorkshopVlan(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-200 focus:text-white rounded px-2 py-1.5 font-mono text-[10px] outline-none mt-1.5 cursor-text focus:ring-1 focus:ring-amber-500/20"
                            title="Nome da VLAN da Oficina"
                          />

                          {/* Sector Image Control inside Active Config Panel */}
                          <div className="relative aspect-[16/10] rounded overflow-hidden border border-slate-855 mt-2.5 bg-slate-950 group select-none">
                            <img 
                              src={subsystemImages.workshop || "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600&h=350"} 
                              alt="Oficina Preview" 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => {
                                setEditingSubsystemId("workshop");
                                setCustomImageUrlInput(subsystemImages.workshop || "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600&h=350");
                              }}
                              className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/85 transition flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Clique para customizar a foto deste setor"
                            >
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">Alterar Foto</span>
                            </button>
                            <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-slate-405 font-mono flex items-center gap-1 pointer-events-none group-hover:hidden">
                              <Camera className="w-2.5 h-2.5 text-amber-500" /> Editar Foto
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                          <span className="text-[10px] text-slate-400">Pontos:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setWorkshopPoints(Math.max(1, workshopPoints - 1))}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">{workshopPoints}</span>
                            <button
                              onClick={() => setWorkshopPoints(workshopPoints + 1)}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >+</button>
                          </div>
                        </div>
                      </div>

                      {/* Admin */}
                      <div className="bg-[#0c1322] p-3.5 rounded border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-amber-400 font-mono uppercase font-bold tracking-wider block">Administrativo</span>
                          <input 
                            type="text"
                            id="input-vlan-admin"
                            value={adminVlan}
                            onChange={(e) => setAdminVlan(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-200 focus:text-white rounded px-2 py-1.5 font-mono text-[10px] outline-none mt-1.5 cursor-text focus:ring-1 focus:ring-amber-500/20"
                            title="Nome da VLAN Administrativa"
                          />

                          {/* Sector Image Control inside Active Config Panel */}
                          <div className="relative aspect-[16/10] rounded overflow-hidden border border-slate-855 mt-2.5 bg-slate-950 group select-none">
                            <img 
                              src={subsystemImages.admin || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350"} 
                              alt="Administrativo Preview" 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => {
                                setEditingSubsystemId("admin");
                                setCustomImageUrlInput(subsystemImages.admin || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350");
                              }}
                              className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/85 transition flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Clique para customizar a foto deste setor"
                            >
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">Alterar Foto</span>
                            </button>
                            <div className="absolute bottom-1 right-1 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-slate-455 font-mono flex items-center gap-1 pointer-events-none group-hover:hidden">
                              <Camera className="w-2.5 h-2.5 text-amber-500" /> Editar Foto
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 mt-2">
                          <span className="text-[10px] text-slate-400">Pontos:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setAdminPoints(Math.max(1, adminPoints - 1))}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-white font-mono">{adminPoints}</span>
                            <button
                              onClick={() => setAdminPoints(adminPoints + 1)}
                              className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition flex items-center justify-center cursor-pointer select-none"
                            >+</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 4: FINANCIAL METRICS */}
                {activeTab === "metricas" && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Preço Médio do Automóvel</label>
                      <div className="flex items-center gap-2 bg-[#0e1726] border border-slate-700 focus-within:border-amber-500 rounded px-3 py-2.5 transition">
                        <span className="text-slate-500 font-mono font-bold text-[10.5px]">R$</span>
                        <input 
                          type="number" 
                          id="input-car-value"
                          value={carValue}
                          onChange={(e) => setCarValue(Math.max(0, Number(e.target.value)))}
                          className="bg-transparent text-white font-bold font-mono text-xs w-full outline-none border-none cursor-text"
                          placeholder="Valor do carro"
                        />
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono">Modifica a métrica corporativa de faturamento.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Vendas Mensais (Carros/Mês)</label>
                      <div className="flex items-center gap-2 bg-[#0e1726] border border-slate-700 focus-within:border-amber-500 rounded px-3 py-2.5 transition">
                        <input 
                          type="number" 
                          id="input-cars-sold"
                          value={carsSoldPerMonth}
                          onChange={(e) => setCarsSoldPerMonth(Math.max(1, Number(e.target.value)))}
                          className="bg-transparent text-white font-bold font-mono text-xs w-full outline-none border-none cursor-text"
                          placeholder="Qtd vendida"
                        />
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono">Estimativa média de saída constante da loja.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Horas de Queda Wi-Fi (Horas/Ano)</label>
                      <div className="flex items-center gap-2 bg-[#0e1726] border border-slate-700 focus-within:border-amber-500 rounded px-3 py-2.5 transition">
                        <input 
                          type="number" 
                          id="input-hours-downtime"
                          value={hoursDowntime}
                          onChange={(e) => setHoursDowntime(Math.max(1, Number(e.target.value)))}
                          className="bg-transparent text-white font-bold font-mono text-xs w-full outline-none border-none cursor-text"
                          placeholder="Horas inativas"
                        />
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono">Cumulativo de lentidões sofridos em soluções Wi-Fi comuns.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Fator de Impacto de Quedas</label>
                        <span className="font-mono text-xs text-amber-500 font-extrabold">{impactRatePercent}%</span>
                      </div>
                      <div className="pt-2">
                        <input 
                          type="range" 
                          id="input-impact-rate"
                          min="5" 
                          max="80" 
                          step="5"
                          value={impactRatePercent} 
                          onChange={(e) => setImpactRatePercent(Number(e.target.value))}
                          className="w-full accent-amber-500 h-1 bg-slate-800 rounded outline-none cursor-pointer"
                        />
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono">Porcentagem de receita suspensa ou impactada por lentidões gerais.</p>
                    </div>

                  </div>
                )}

              </div>
            </div>
          )}

          <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-start gap-2.5 text-[11px] text-amber-300 font-mono mt-2 lg:mt-0">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              <strong>Dica de Uso Prático:</strong> Customize os dados do seu projeto usando as abas interativas acima ou carregue um perfil predefinido na seção de carga rápida. Ao clicar em <strong>"Gerar PDF / Imprimir"</strong>, este painel cinza de edição sumirá automaticamente, gerando um relatório comercial perfeitamente limpo e corporativo para apresentar ao seu cliente!
            </span>
          </div>
        </section>

        {/* SECTION 1: DIRECT STUDY AND PROJECT SUMMARY */}
        <section className="bg-[#0b1220] rounded-lg border border-slate-800 p-6 md:p-8 relative overflow-hidden" id="estudo-direto">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded">
                ESPECIFICAÇÃO DE ALTA DISPONIBILIDADE • {dealershipName}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                Análise Física e Eletromagnética da Conectividade Física Comercial
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                As concessionárias automotivas contemporâneas enfrentam sérias restrições físicas para a transmissão estável de dados via ondas de rádio (Wi-Fi). Barreiras térmicas impostas pelas estruturas de vidro laminado externo refletem sinais de rádio de maneira difusa, ao passo que a circulação de chassis de aço e blocos de alumínio no showroom causa desvanecimento por múltiplos caminhos físicos (multipath fading). Complementarmente, a indução originada nas bobinas de ignição e compressores trifásicos da oficina mecânica corrompe modulações sem fio com ruído magnético severo.
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Para mitigar quebras de conexão e garantir o faturamento ágil e seguro da loja, esta infraestrutura estabelece <strong className="text-white">{totalPoints} canais metálicos dedicados de Categoria 6</strong>. Todo o tráfego converge para um <strong className="text-amber-400">{firewallModel}</strong> unificado a um potente cluster de <strong className="text-sky-450">{switchBrand}</strong> e roteamento lógico segregado em VLANs específicas.
              </p>
            </div>
            
            <div className="lg:col-span-4 bg-[#080d16] p-6 rounded border border-slate-800/80 space-y-4">
              <div className="border-b border-[#1b2b40] pb-2 text-center md:text-left">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">DADOS DO MEMORIAL DE REDE</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Topologia em Estrela Física Homologada</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-[#0c1322] rounded border border-slate-800">
                  <div className="text-[9px] text-[#8c9cb5] font-mono uppercase">Pontos Cabeados</div>
                  <div className="text-lg font-bold text-[#f2be5c] font-mono mt-0.5">{totalPoints} Pontos</div>
                  <div className="text-[8px] text-slate-500">Tomadas RJ45 Ativas</div>
                </div>
                <div className="p-3 bg-[#0c1322] rounded border border-slate-800">
                  <div className="text-[9px] text-[#8c9cb5] font-mono uppercase">Infra Interna</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">100%</div>
                  <div className="text-[8px] text-slate-500">Cobre Sólido Puro</div>
                </div>
                <div className="p-3 bg-[#0c1322] rounded border border-slate-800">
                  <div className="text-[9px] text-[#8c9cb5] font-mono uppercase">Hardware Central</div>
                  <div className="text-xs font-bold text-sky-400 font-mono mt-1 leading-tight uppercase truncate" title={switchBrand}>
                    {switchBrand}
                  </div>
                  <div className="text-[8px] text-slate-500">Capacidade Total</div>
                </div>
                <div className="p-3 bg-[#0c1322] rounded border border-slate-800">
                  <div className="text-[9px] text-[#8c9cb5] font-mono uppercase">Segurança Ativa</div>
                  <div className="text-xs font-bold text-rose-500 font-mono mt-1 leading-none uppercase truncate" title={firewallModel}>
                    {firewallModel}
                  </div>
                  <div className="text-[8px] text-slate-500">Pronta Resposta</div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-[#1b2b40] flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Padrão de Distribuição:</span>
                <span className="text-emerald-400 font-bold">ANSI/TIA-568.2-D</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE AUTO-EXPLANATORY MOUNTING DIAGRAM */}
        <section className="space-y-6" id="diagrama-percurso">
          <div>
            <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase block mb-1">Entenda o fluxo físico da Internet</span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-mono rounded text-xs font-bold">Diagrama 1</span>
              COMO A INTERNET CHEGA DE FORMA SEGURA E ESTÁVEL ATÉ OS DISPOSITIVOS
            </h2>
            <p className="text-xs text-slate-400">
              O fluxo abaixo demonstra de forma clara e linear o percurso do tráfego. Siga o fluxo físico, de onde a operadora entrega a internet externa até os dispositivos finais da concessionária.
            </p>
          </div>

          {/* Sequential visual blocks with custom graphic connectives */}
          <div className="bg-[#090f1a] p-2 rounded-lg border border-slate-900/60 mb-2">
            <span className="text-[10px] text-amber-500 font-mono font-bold uppercase tracking-wider px-2 py-1 bg-amber-500/5 border border-amber-550/15 rounded flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
              Super Dica: Cada passo abaixo é interativo! Clique para abrir o Painel e mudar a especificação.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-stretch">
            
            {/* Step 1 */}
            <div 
              onClick={() => navigateToField("ident", "input-dealership")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar o Nome da Empresa no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">PASSO 01</span>
                <div className="p-2.5 bg-blue-950/40 text-blue-400 inline-block rounded border border-blue-900 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">1. Entrada Fibra</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Fibra óptica dedicada vinda diretamente da operadora de telecomunicação externa. Entrega simetria de banda e isolação ótica contra intempéries.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Conversor óptico GPON.
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => navigateToField("ativos", "input-firewall")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar o Modelo de Segurança (Firewall) no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#2e1212] text-rose-300 font-bold">PASSO 02</span>
                <div className="p-2.5 bg-rose-950/40 text-rose-400 inline-block rounded border border-rose-900 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Firewall Físico</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Forte blindagem baseada no modelo <strong className="text-rose-450">{firewallModel}</strong>. InsHard, blinda a rede e inspeciona vírus, intrusos ou roubo de chaves.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Conformização rígida LGPD.
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => navigateToField("ativos", "input-switch")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar as Especificações do Switch no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">PASSO 03</span>
                <div className="p-2.5 bg-sky-950/40 text-sky-400 inline-block rounded border border-sky-900 group-hover:scale-110 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">3. Switches Ativos</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Controlado pela infra <strong className="text-sky-450">{switchBrand}</strong>. Comutação veloz sem bloqueio de portas ou travamento de dados.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Suporta VLANs e energia PoE+.
              </div>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => navigateToField("ativos", "input-switch")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para organizar com Switch e Patch Panels no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">PASSO 04</span>
                <div className="p-2.5 bg-slate-900 text-slate-400 inline-block rounded border border-slate-850 group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">4. Patch Panel</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Painel organizador metálico dentro do rack técnico. Permite a terminação ordenada e firme de toda a rede física em estrela estruturada.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Conexão através de Patch Cords.
              </div>
            </div>

            {/* Step 5 */}
            <div 
              onClick={() => navigateToField("ativos", "input-cable")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar o Padrão do Cabo Lógico no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">PASSO 05</span>
                <div className="p-2.5 bg-emerald-950/40 text-emerald-400 inline-block rounded border border-emerald-900 group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">5. Cabeamento Horizontal</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Implementação em <strong className="text-emerald-450">{cableStandard}</strong> correndo imune por eletrocalhas metálicas fidalmenses devidamente aterradas.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Isolação física eletromagnética.
              </div>
            </div>

            {/* Step 6 */}
            <div 
              onClick={() => navigateToField("pontos", "input-vlan-showroom")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar as VLANs e Setores no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">PASSO 06</span>
                <div className="p-2.5 bg-purple-950/40 text-purple-400 inline-block rounded border border-purple-900 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono font-bold">6. Tomada Fêmea RJ45</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Ponto de entrega modular de alto desempenho padrão Keystone Cat.6 com pinos folheados a ouro nos postos e baias.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Fronteira física de conexão estável.
              </div>
            </div>

            {/* Step 7 */}
            <div 
              onClick={() => navigateToField("pontos", "input-vlan-sales")}
              className="bg-[#0b1220] hover:bg-[#0e172a] hover:border-amber-500/50 p-4 rounded border border-slate-800 flex flex-col justify-between transition duration-150 cursor-pointer group select-none shadow-md relative"
              title="Clique para editar os Pontos Ativos no Painel"
            >
              <span className="text-[8px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity font-mono absolute top-2 right-2 border border-amber-550/20 px-1 py-0.2 bg-amber-500/10 rounded">EDITAR</span>
              <div className="space-y-3">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#102a20] text-emerald-300 font-bold">SINAL FINAL</span>
                <div className="p-2.5 bg-[#122c1b] text-emerald-400 inline-block rounded border border-emerald-900 group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">7. Line Cord & Computadores</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Cabo de manobra flexível de cobre ligando a tomada de parede diretamente ao computador de contrato, scanner ou VoIP inteligente.
                </p>
              </div>
              <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900/60 mt-3 pt-2">
                Ligação contínua a 1000 Mbps.
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: THE COMPREHENSIVE SECTOR BLUEPRINT ANALYSIS */}
        <section className="space-y-6" id="detalhamento-subsistemas">
          <div>
            <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase block mb-1">Mapeamento Técnico de Setores</span>
            <h2 className="text-lg sm:text-xl font-bold text-white uppercase">
              DETALHAMENTO DOS SUBSISTEMAS DE TI DA CONCESSIONÁRIA ({totalPoints} PONTOS TOTAL)
            </h2>
            <p className="text-xs text-slate-400">
              Abaixo são descritos detalhadamente todos os 5 subsistemas da <strong className="text-white">{dealershipName}</strong>, indicando seus requisitos físicos eletromagnéticos, prejuízo de paradas, VLANs segregadas e tomadas ativas dedicadas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {subsystems.map((sub) => (
              <div key={sub.id} className="bg-[#0b1220] rounded border border-slate-800 hover:border-slate-750 transition duration-150 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                
                {/* Header Subsystem row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-slate-900 border border-slate-800 text-amber-400 rounded">
                      <Zap className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">{sub.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-0.5 animate-[fadeIn_0.2s]">
                        <span className="font-semibold text-emerald-400">Padrão: {sub.standard}</span>
                        <span className="text-slate-500">•</span>
                        <span 
                          onClick={() => navigateToField("pontos", "input-vlan-" + sub.id)}
                          className="font-semibold text-sky-400 cursor-pointer hover:bg-sky-500 hover:text-slate-950 px-1.5 py-0.5 bg-sky-950/40 rounded transition-all inline-flex items-center gap-1 border border-sky-500/10 hover:border-transparent select-none"
                          title="Clique para alterar o nome técnico desta VLAN"
                        >
                          {sub.vlan} <span className="text-[9px]">✏️</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => navigateToField("pontos", "input-vlan-" + sub.id)}
                    className="px-4 py-2 bg-slate-950 hover:bg-[#111a2d] border border-slate-800 hover:border-amber-500/30 rounded font-mono text-right shrink-0 cursor-pointer transition duration-150 select-none group/pts"
                    title="Clique para alterar a quantidade de pontos ativos deste setor"
                  >
                    <span className="text-[9px] text-slate-450 uppercase tracking-widest block font-bold">TOMADAS E CONECTORES ATIVOS</span>
                    <span className="text-sm font-bold text-[#f2be5c] flex items-center justify-end gap-1 group-hover/pts:text-amber-400">
                      {sub.points} Canais Cabeados Metálicos <span className="text-[10px]">✏️</span>
                    </span>
                  </div>
                </div>

                {/* Subsystem core technical arguments */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Photo Component for Subsystem */}
                  <div className="lg:col-span-3 space-y-2">
                    <h4 className="text-[10px] text-amber-500 font-mono font-bold uppercase tracking-wider">Foto de Referência do Setor:</h4>
                    <div className="relative aspect-video lg:aspect-[4/3] rounded overflow-hidden border border-slate-800 shadow-md group/img select-none bg-slate-950">
                      <img 
                        src={subsystemImages[sub.id] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350"} 
                        alt={sub.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity"></div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSubsystemId(sub.id);
                          setCustomImageUrlInput(subsystemImages[sub.id] || "");
                        }}
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold px-2 py-1 rounded text-[10px] font-mono border border-amber-500/20 hover:border-transparent cursor-pointer backdrop-blur-xs shadow transition duration-150 active:scale-95 text-[9px] uppercase tracking-wider"
                        title="Clique para carregar ou mudar a foto deste setor"
                      >
                        <Camera className="w-3 h-3 text-amber-500 group-hover/img:text-slate-950 cursor-pointer" />
                        Alterar Foto
                      </button>
                    </div>
                  </div>

                  {/* Electro-physical rationale */}
                  <div className="lg:col-span-3 bg-slate-950 p-4 rounded border border-slate-900 space-y-2 min-h-[160px]">
                    <h4 className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">A Razão Física da Rede Cabeada:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {sub.whyWired}
                    </p>
                  </div>

                  {/* Operational vulnerability */}
                  <div className="lg:col-span-3 bg-[#140b0b] p-4 rounded border border-red-950/40 space-y-2 min-h-[160px]">
                    <h4 className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider">Prejuízo por Instabilidade de Wi-Fi:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {sub.operationalImpact}
                    </p>
                  </div>

                  {/* Device outputs list */}
                  <div className="lg:col-span-3 space-y-2">
                    <h4 className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider font-bold">Hardware Integrado ao Canal:</h4>
                    <div className="space-y-1.5">
                      {sub.applications.map((app, appIdx) => (
                        <div key={appIdx} className="bg-slate-900/60 border border-slate-850 p-2.5 rounded text-[11px] text-slate-200 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full shrink-0"></span>
                          <span className="font-semibold truncate text-[10.5px]" title={app}>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Technical Footnote with precise cabling terms */}
                <div className="mt-4 pt-3 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
                  <span>
                    <strong className="text-slate-350">Detalhamento Físico de Entrega: </strong> {sub.connections}
                  </span>
                  <span className="text-slate-500 text-xs hidden sm:inline">|</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Garantia simétrica de atenuação mínima</span>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CABLING VOCABULARY COMPARATIVE SHEET */}
        <section className="bg-[#0b1220] rounded-lg border border-slate-800 p-6 md:p-8" id="glossario-comparativo">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">Estudo Terminológico Oficial</span>
            <h2 className="text-xl font-bold text-white">Especificação do Cabeamento vs. Terminologia Prática</h2>
            <p className="text-xs text-slate-400 mt-1">
              Guia definitivo dos componentes instalados para aprovação do conselho técnico corporativo da <strong className="text-white">{dealershipName}</strong>.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-[#1b2b40] bg-[#0c1322]">
                  <th className="p-3.5 font-bold text-white font-mono uppercase tracking-wider text-[11px]">Componente de Rede</th>
                  <th className="p-3.5 font-bold text-sky-450 font-mono uppercase tracking-wider text-[11px]">Substituto de Termo Comum</th>
                  <th className="p-3.5 font-bold text-white font-mono uppercase tracking-wider text-[11px] hidden md:table-cell">Regulamentação Aplicada</th>
                  <th className="p-3.5 font-bold text-slate-450 font-mono uppercase tracking-wider text-[11px]">Descrição e Funcionamento Físico de Camada 1</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/70">
                {materialSpecs.map((spec, specIdx) => (
                  <tr key={specIdx} className="hover:bg-slate-900/40 transition duration-100">
                    <td className="p-3.5 font-extrabold text-white text-xs">{spec.item}</td>
                    <td className="p-3.5 text-amber-350 font-mono italic">{spec.function}</td>
                    <td className="p-3.5 font-mono text-slate-450 text-[10px] hidden md:table-cell">{spec.standard}</td>
                    <td className="p-3.5 text-slate-300 font-normal leading-relaxed">{spec.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: REAL DOWN TIME LOSS CALCULATOR - DYNAMIC BUSINESS MATH */}
        <section className="bg-[#0b1220] rounded-lg border border-slate-800 p-6 md:p-8" id="calculo-financeiro">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] text-red-400 font-mono font-bold tracking-widest uppercase bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded">
                Estudo Monetário de Perdas Operacionais por Quedas de Rede
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                O Custo Real da Fragilidade Física do Wi-Fi para Concessionárias
              </h2>
              <p className="text-xs text-[#a0aec0] leading-relaxed">
                Muitas empresas estimam equivocadamente que a rede local serve apenas para tráfego básico. No entanto, quando um sistema Wi-Fi doméstico oscila ou sofre interferência devido às estruturas de vidro e motores da oficina, toda a estrutura comercial da <strong className="text-white">{dealershipName}</strong> é suspensa de forma imediata. Propostas de financiamento dependem de canais diretores estáveis aos bancos; a oficina mecatrônica cessa os diagnósticos; os computadores de notas fiscais Gov perdem a conexão de validação do SEFAZ e os totens interactivos perdem seus feeds na hora da venda.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-950 rounded border border-slate-900 flex items-start gap-3">
                  <span className="p-1.5 bg-red-500/10 text-red-500 rounded mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#fafafa] font-mono">Fórmula Matemática do Impacto Financeiro</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1 font-normal">
                      Sob o cálculo de <strong className="text-white">R$ {carValue.toLocaleString("pt-BR")}</strong> de ticket médio automotivo com comercialização regular de <strong className="text-white">{carsSoldPerMonth} unidades por mês</strong>, estipulamos uma receita mensal média de <strong className="text-emerald-450">R$ {monthlyRevenue.toLocaleString("pt-BR")}</strong>. 
                      Ao dividir os ganhos pelo expediente oficial da concessionária (176h/mês) e calibrar com um fator prudente de <strong className="text-amber-400 font-mono font-bold">{impactRatePercent}% de impacto</strong> por inatividade de ERP/CRM, cada hora de inatividade representa uma perda real de <strong className="text-red-400 font-mono font-bold">R$ {hourlyLossRate.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong> por hora.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial math visual representations */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-[#1b2b40] pb-2">CONTA DOS RISCOS CORPORATIVOS</h3>
              
              <div className="space-y-3.5">
                <div 
                  onClick={() => navigateToField("metricas", "input-hours-downtime")}
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-slate-900 p-2 rounded transition border border-transparent hover:border-slate-800"
                  title="Clique para editar as Horas de Queda no Painel"
                >
                  <span className="text-slate-450 flex items-center gap-1">Tempo cumulativo de quedas de Wi-Fi/ano:</span>
                  <span className="font-mono text-white font-bold flex items-center gap-1">
                    {hoursDowntime} horas <span className="text-[10px]">✏️</span>
                  </span>
                </div>

                <div 
                  onClick={() => navigateToField("metricas", "input-car-value")}
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-slate-900 p-2 rounded transition border border-transparent hover:border-slate-800"
                  title="Clique para editar o Preço do Automóvel no Painel"
                >
                  <span className="text-slate-455 flex items-center gap-1">Receita Operacional Mensal Média:</span>
                  <span className="font-mono text-white font-bold flex items-center gap-1">
                    R$ {monthlyRevenue.toLocaleString("pt-BR")} <span className="text-[10px]">✏️</span>
                  </span>
                </div>

                <div 
                  onClick={() => navigateToField("metricas", "input-impact-rate")}
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-slate-900 p-2 rounded transition border border-transparent hover:border-slate-800"
                  title="Clique para editar o Fator de Impacto no Painel"
                >
                  <span className="text-slate-450 flex items-center gap-1 font-semibold">Fator de Impacto Aplicado nas Vendas:</span>
                  <span className="font-mono text-amber-500 font-bold flex items-center gap-1">
                    {impactRatePercent}% <span className="text-[10px]">✏️</span>
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs border-t border-slate-850 pt-2.5 px-2">
                  <span className="text-slate-450 font-bold">Perda de Faturamento por Hora Inativa:</span>
                  <span className="font-mono text-red-500 font-extrabold text-sm">R$ {hourlyLossRate.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-slate-850 pt-2.5 px-2">
                  <span className="text-slate-450 font-bold text-rose-350">Custo Financeiro Anual do Risco (Total de Quedas):</span>
                  <span className="font-mono text-red-400 font-extrabold text-base">R$ {annualLoss.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} / ano</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/5 rounded border border-emerald-500/10 text-[11px] text-slate-300 leading-normal">
                <strong className="text-white">Vantagem do Cabeamento Proposto: </strong>
                O investimento físico nas tomadas fêmeas Keystone, Line Cords estruturados e Switches PoE+ blinda o faturamento de <strong className="text-amber-400">{dealershipName}</strong> contra perdas catastróficas, pagando-se integralmente no primeiro eventual sinistro de queda aérea de rádio que for evitado.
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: REDUNDANCY COMPARISON */}
        <section className="bg-[#0b1220] rounded-lg border border-slate-800 p-6 md:p-8" id="comparativo-direto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1: Redes comuns */}
            <div className="bg-slate-950 p-6 rounded border border-slate-900 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#2e1c1c] pb-3">
                <span className="p-2 bg-red-500/10 text-red-400 rounded">
                  <Wifi className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Opção Comum - Redes Sem Fio Comuns</h3>
                  <span className="text-[10px] text-red-500 font-bold font-mono">Alta suscetibilidade técnica e térmica</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Efeito Gaiola de Faraday:</strong> Os esqueletos estruturais de alumínio e ferro dos carros agem como defletores de RF, dissipando o sinal aéreo de rádio.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Indução de Transiente Indutivo:</strong> Partidas mecânicas e bobinas na oficina geram EMI que cortam o sinal Wi-Fi aéreo do galpão de manutenção.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Fragilidade de Conectores:</strong> Equipamentos domésticos improvisados acumulam poeira abrasiva em suspensão e perdem sinal nas portas.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Esse projeto */}
            <div className="bg-slate-950 p-6 rounded border border-slate-900 space-y-4">
              <div className="flex items-center gap-3 border-b border-[#1c2e22] pb-3">
                <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Projeto Proposto - Rede Metálica Rígida</h3>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">Cumprimento integral de SLA operacional de TI</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Conexão Integral Estável:</strong> Taxas garantidas de transmissão real simétrica sem perda nem lentidão de sinal multicaminho.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Imunidade Eletromagnética Total:</strong> Os cabos de cobre sólido robustos rodando por eletrocalhas metálicas aterradas blinda e protege o tráfego lógico.</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-300 font-normal">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Terminações Físico-Metalúrgicas:</strong> Tomadas Fêmeas de durabilidade em Keystone interconectadas por Line Cords blindados banhados a ouro.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* PRINTABLE ARCHIVAL LAYOUT IN TEXT FORM FOR DIRECT CONTRACT ATTACHMENT */}
        <section className="bg-white text-black p-8 rounded-lg border-2 border-slate-300 space-y-6 block print:p-0 print:border-0 print:text-black">
          <div className="text-center pb-6 border-b border-slate-300">
            <h2 className="text-xl font-bold tracking-tight uppercase">ANEXO TÉCNICO DE ENGENHARIA DE REDES LÓGICAS</h2>
            <p className="text-xs font-mono text-slate-600 mt-0.5">Memorial Descritivo Homologado de Estruturação • Emitido para {dealershipName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <h3 className="font-bold text-white font-mono bg-slate-900 text-slate-50 p-2 text-[11px] mb-3 uppercase">1. QUADRO COMPROBATÓRIO DE TOMADAS FÊMEAS E CONEXÕES</h3>
              <ul className="space-y-2 mt-2">
                <li>• <strong>Subsystem Showroom (Vitrine):</strong> {showroomPoints} Tomadas Fêmeas RJ45 Keystone Cat.6 com Line Cords metálicos flexíveis de Categoria 6.</li>
                <li>• <strong>Subsystem Comercial (Vendas):</strong> {salesPoints} Tomadas Fêmeas RJ45 Keystone instalados em canaletas metálicas longitudinais sob mesas.</li>
                <li>• <strong>Subsystem Financeiro (Crédito & Caixa):</strong> {financePoints} Tomadas Fêmeas RJ45 Keystone para isolação física dos dados cadastrais e scores restritos.</li>
                <li>• <strong>Subsystem Oficina (Mecatrônica):</strong> {workshopPoints} Tomadas em caixas industriais de sobrepor para ligação de Scanners OBD mecânicos via IP.</li>
                <li>• <strong>Subsystem Administrativo (Sistemas/Câmeras):</strong> {adminPoints} Tomadas secundárias para servidores locais NVR e backup físico das câmeras de segurança.</li>
                <li className="font-bold border-t border-slate-300 pt-2 font-mono">
                  • Total de Canais Cabeados Gerais Homologáveis: {totalPoints} Pontos de Rede Ativos Físicos em {cableStandard}.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold bg-slate-900 text-white p-2 text-[11px] mb-3 font-mono uppercase">2. COMPOSIÇÃO DOS ATIVOS DE TI E REDUNDÂNCIA</h3>
              <p className="text-[11px] text-slate-700 leading-normal">
                O sinal entregue pelas operadoras se funde ao concentrador ativo de segurança baseado em <strong className="text-slate-900">{firewallModel}</strong> instalado no topo do Rack de segurança de 19 polegadas. O sinal corre seguro pelos <strong>Patch Panels</strong> do rack geral de cabeamento e distribui a carga aos switches de comutação Gigabit gerenciáveis modelo <strong className="text-slate-900">{switchBrand}</strong>, descendo pelas canaletas e duto de distribuição externa integrando canais físicos blindados de cobre até as <strong>Tomadas Fêmeas RJ45 Keystone</strong> em cada baia. De lá, o <strong>Line Cord</strong> garante largura de banda real de 1000 Mbps simétricos aos computadores de contrato e aparelhos VoIP de consultor, operando imunes a oscilações.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 font-mono">
            <div className="grid grid-cols-2 gap-8 text-center text-[10px] leading-tight text-slate-600">
              <div className="space-y-1">
                <div className="border-t border-slate-400 pt-2 font-bold uppercase">Projetista Responsável Técnico</div>
                <div className="text-slate-500 font-mono">{analystName}</div>
              </div>
              <div className="space-y-1">
                <div className="border-t border-slate-400 pt-2 font-bold uppercase">Representante de Liberação Técnica</div>
                <div className="text-slate-500 font-mono">{representativeName}</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#04060b] text-slate-500 text-xs py-10 px-6 text-center border-t border-slate-900 mt-20 print:hidden">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-slate-400 font-mono">{dealershipName} • Memorial de Infraestrutura Lógica</p>
          <p className="max-w-2xl mx-auto text-[11px] text-[#4d5b70]">
            Este documento reflete a engenharia física e os cálculos estruturais de redes padrão ANSI/TIA-568.2-D e ABNT NBR 14565. Use o botão no topo em seu navegador para imprimir ou salvar como PDF no seu computador.
          </p>
        </div>
      </footer>

      {/* MODAL 1: EDIT SECTOR IMAGE */}
      {editingSubsystemId && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-[fadeIn_0.15s_ease-out] print:hidden">
          <div className="bg-[#0b1220] border border-slate-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl animate-[scaleIn_0.15s_ease-out]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-850 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Customizar Imagem do Setor
                </h3>
              </div>
              <button 
                onClick={() => setEditingSubsystemId(null)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-6">
              
              {/* Current Preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Visualização Atual:</span>
                <div className="aspect-video relative rounded overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                  <img 
                    src={subsystemImages[editingSubsystemId] || ""} 
                    alt="Preview" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 backdrop-blur-xs p-2 text-center border-t border-slate-900">
                    <span className="text-[10px] text-slate-300 font-bold font-mono">
                      Setor: {subsystems.find(s => s.id === editingSubsystemId)?.name?.split("(")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Presets Grid */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" /> Opção 1: Escolher Imagem Temática Selecionada
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {presetPhotos[editingSubsystemId]?.map((photo, pIdx) => {
                    const isSelected = subsystemImages[editingSubsystemId] === photo.url;
                    return (
                      <button
                        key={pIdx}
                        onClick={() => {
                          handleUpdateImage(editingSubsystemId, photo.url);
                          setCustomImageUrlInput(photo.url);
                        }}
                        className={`relative aspect-video rounded overflow-hidden border transition text-left cursor-pointer group ${
                          isSelected ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-800 hover:border-slate-600'
                        }`}
                        title={photo.label}
                      >
                        <img 
                          src={photo.url} 
                          alt={photo.label} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-155"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center ${isSelected ? 'bg-amber-500/15' : 'bg-slate-950/20'}`}>
                          {isSelected && (
                            <div className="bg-amber-500 text-slate-950 p-0.5 rounded-full shadow">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="absolute bottom-1 left-1 right-1 text-[8px] bg-slate-950/85 text-white truncate px-1 rounded block pointer-events-none font-bold text-center">{photo.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manual File Upload Slot (Direct HTML5) */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-amber-450 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Opção 2: Carregar Foto Própria do Computador
                </span>
                <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg space-y-2">
                  <input 
                    type="file" 
                    id="file-image-upload-direct" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === "string") {
                            handleUpdateImage(editingSubsystemId, reader.result);
                            setCustomImageUrlInput(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-300 bg-slate-900 rounded p-1.5 border border-slate-850 cursor-pointer text-center file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 file:cursor-pointer" 
                  />
                  <p className="text-[9px] text-slate-500 font-mono text-center">Formatos aceitos: PNG, JPG, JPEG, WEBP. Convertido na hora para Base64 local.</p>
                </div>
              </div>

              {/* Custom URL Input */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Opção 3: Inserir Link de Imagem Externa</span>
                <div className="bg-slate-950 p-3.5 border border-slate-800 rounded-lg space-y-2">
                  <input
                    type="text"
                    value={customImageUrlInput}
                    onChange={(e) => {
                      setCustomImageUrlInput(e.target.value);
                      if (e.target.value) {
                        handleUpdateImage(editingSubsystemId, e.target.value);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 rounded px-2.5 py-1.5 font-mono text-xs outline-none cursor-text focus:ring-1 focus:ring-amber-500/20"
                    placeholder="Cole seu link de imagem pública (ex: https://...)"
                  />
                  <p className="text-[9px] text-slate-500 font-mono">A foto se altera automaticamente ao digitar ou colar o endereço correto.</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-slate-850 bg-slate-900/40 gap-2">
              <button
                onClick={() => {
                  const baseDefaults: Record<string, string> = {
                    showroom: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600&h=350",
                    sales: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=350",
                    finance: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=350",
                    workshop: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600&h=350",
                    admin: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350"
                  };
                  handleUpdateImage(editingSubsystemId, baseDefaults[editingSubsystemId]);
                  setCustomImageUrlInput(baseDefaults[editingSubsystemId]);
                }}
                className="mr-auto text-[10px] text-rose-455 hover:text-rose-400 font-mono uppercase bg-rose-950/10 hover:bg-rose-950/30 border border-rose-950/40 px-2.5 py-1.5 rounded cursor-pointer transition duration-150 font-bold"
              >
                Voltar ao Padrão
              </button>
              <button
                onClick={() => setEditingSubsystemId(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-mono px-4 py-1.5 rounded text-xs transition cursor-pointer border border-slate-700 font-bold"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PERFECT PDF / NO WATERMARK PRINT SETUP */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-[fadeIn_0.15s_ease-out] print:hidden">
          <div className="bg-[#0b1220] border border-amber-500/30 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl animate-[scaleIn_0.15s_ease-out]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-850 bg-slate-900">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-amber-500" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Como Salvar PDF sem Barras e sem Marcas do AI Studio
                </h3>
              </div>
              <button 
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Como você está visualizando esta plataforma dentro do editor de desenvolvimento do Google AI Studio, a moldura do editor e marcas fluídas do iframe podem sair no PDF se você imprimir essa janela. Siga esses <strong className="text-amber-400 text-white font-bold">3 pequenos passos rápidos</strong> para exportar um Memorial Técnico limpo e puramente corporativo:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 block w-fit">PASSO 01</span>
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wide">Abrir em Nova Aba</h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal">
                      Clique no botão para abrir este portal em tela inteira, removendo a barra de IA e a moldura lateral.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(window.location.href, "_blank");
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 mt-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1.5 rounded text-[10px] font-mono cursor-pointer transition shadow duration-150 w-full"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir Nova Aba
                  </button>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-450 block w-fit">PASSO 02</span>
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wide">Remover Links</h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal">
                      No painel de impressão (Ctrl+P / Command+P), desmarque a caixa <strong className="text-white font-semibold">"Cabeçalhos e rodapés"</strong>. Isso esconde as URLs do navegador!
                    </p>
                  </div>
                  <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900 mt-2 pt-2 text-center">
                    Bordas 105% limpas
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 block w-fit">PASSO 03</span>
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wide">Imprimir Fundos</h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal">
                      Marque a caixa <strong className="text-white font-semibold">"Gráficos de segundo plano"</strong> para que todas as cores escuras, bordas douradas e fotos sejam impressas.
                    </p>
                  </div>
                  <div className="text-[9px] text-[#8c9cb5] font-mono border-t border-slate-900 mt-2 pt-2 text-center">
                    Cores e contrastes reais
                  </div>
                </div>
              </div>

              {/* URL fallback row */}
              <div className="bg-slate-950 p-3 rounded border border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Link direto do app caso seu pop-up bloqueie:</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    readOnly 
                    value={typeof window !== "undefined" ? window.location.href : "https://ais-pre-fsvi4fdxo5g3sl6b3yszcb-239587108071.us-west1.run.app"} 
                    className="bg-slate-900 border border-slate-850 text-[10px] font-mono px-2 py-1 text-slate-400 rounded w-full sm:w-48 select-all focus:ring-0 outline-none"
                  />
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        navigator.clipboard.writeText(window.location.href);
                        setCopiedLinkSuccess(true);
                        setTimeout(() => setCopiedLinkSuccess(false), 2000);
                      }
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-mono border border-slate-800 hover:border-amber-500/30 px-3 py-1 rounded text-[10px] shrink-0 font-bold flex items-center gap-1 cursor-pointer transition active:scale-95"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedLinkSuccess ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-slate-850 bg-slate-900/60 gap-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono px-4 py-2 rounded text-xs transition border border-slate-755 cursor-pointer font-bold"
              >
                Voltar e Ajustar Dados
              </button>
              <button
                onClick={() => {
                  setShowPrintModal(false);
                  setTimeout(() => {
                    window.print();
                  }, 300);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold font-mono px-5 py-2 rounded text-xs transition shadow cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                Imprimir / Salvar PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
