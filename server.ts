import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[Warning] GEMINI_API_KEY is not defined in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_IF_ABSENT",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Sales Argument Creator & Objection Handler
app.post("/api/argumentos", async (req, res) => {
  try {
    const { dealershipName, targetAudience, objection, budgetLimit, customContext } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(200).json({
        success: false,
        warning: "API_KEY_MISSING",
        argument: `### Conectividade Ininterrupta e Segurança para a ${dealershipName || "sua Concessionária"}\n\n*Nota: O gerador de inteligência artificial de alta fidelidade está em modo de simulação porque a chave de API Gemini não está configurada nos segredos do sistema. No entanto, aqui estão as orientações técnicas ideais baseadas em engenharia de rede real:*\n\n1. **Inibição de Ruídos e Latência**: Wi-Fi comum sofre interferência eletromagnética (motores, bobinas de carros, carregadores elétricos, divisórias metálicas do showroom). 50 pontos cabeados Cat6 garantem velocidade estável de 1Gbps sem oscilação, fundamental para os sistemas de faturamento e os testes de diagnóstico veicular na oficina.\n2. **Segurança de Dados Legais (LGPD)**: Concessionárias armazenam dados sensíveis de clientes (CPF, score de crédito bancário, contratos de financiamento). O Firewall físico isola a rede interna, impede acessos externos indesejados e armazena registros (logs) de conformidade legal.\n3. **Link Dedicado Garantido**: Ao contrário da internet padrão de residências recapeada em condomínios, um Link Dedicado assegura 100% da banda contratada simétrica (download e upload iguais), IP fixo para o sistema interno de câmeras e faturamento, e SLA de restauração em até 4 horas. Se a internet cai, a venda de carros para!`
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Você é um Engenheiro de Redes Consultor de Vendas Sênior e Especialista em Segurança de Informação e Infraestrutura.
Sua missão é ajudar o usuário (um técnico ou integrador de TI) a VENDER e CONVENCER o proprietário de uma loja de automóveis/concessionária ("${dealershipName || "Loja de Automóveis"}") a aceitar um projeto de rede lógica cabeada estruturada com 50 pontos, firewall e link dedicado.
Adote um tom profissional, técnico porém muito didático, focando em retorno sobre o investimento (ROI), mitigação de riscos comerciais (como a loja de carros parar de faturar), proteção de dados de clientes (LGPD / financiamento automotivo) e confiabilidade operacional (oficina mecânica dependendo de diagnósticos em rede, showrooms de alto padrão).
Escreva sua resposta estruturada formatada em Markdown legível, de forma direta e persuasiva, sem rodeios corporativos excessivos.`;

    const prompt = `Gere um argumento de vendas personalizado ou uma carta de proposta comercial técnica.
Aqui estão os dados da oportunidade de negócio:
- Nome da Concessionária: ${dealershipName || "Loja de Automóveis (Genérico)"}
- Perfil do cliente da Concessionária (Público-Alvo): ${targetAudience || "Geral / Veículos diversos"}
- Objeção comum específica do cliente para enfrentar: "${objection || "O preço do cabeamento estruturado e do Firewall físico está alto, por que não usar tudo no Wi-Fi normal que já temos?"}"
- Faixa orçamentária ou contexto de restrição: ${budgetLimit ? `Limite de R$ ${budgetLimit}` : "Padrão corporativo focado em alto desempenho"}
${customContext ? `- Informações adicionais do local: ${customContext}` : ""}

Seu texto deve conter:
1. **Quebra Metódica da Objeção**: Explique por que a rede cabeada + firewall físico é superior à solução de prateleira (Wi-Fi doméstico / roteador de operadora) especificamente sob a ótica de um negócio de carros (emissões de ruído na oficina, tráfego pesado de mídias/vídeos dos carros no showroom, segurança nos dados de financiamento que transitam na mesa de F&I).
2. **Justificativa do Link Dedicado vs Banda Larga Comum**: Destaque o SLA de atendimento rápido, IP fixo, banda simétrica necessária para atualizar portais de vendas (iCarros, Webmotors, etc.) e carregar mídias de alta definição.
3. **Justificativa do Firewall Físico**: Fale sobre proteção contra ransomware, vazamento de scores cadastrais (LGPD) e controle de produtividade dos funcionários da loja.
4. **Chamada de Fechamento**: Um parágrafo matador e persuasivo que o técnico integrador possa ler para o cliente ou copiar em sua proposta formal.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    res.json({
      success: true,
      argument: response.text,
    });
  } catch (error: any) {
    console.error("Erro na rota Gemini:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro desconhecido na geração de argumentos"
    });
  }
});

// Vite server configuration as middleware for development
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
