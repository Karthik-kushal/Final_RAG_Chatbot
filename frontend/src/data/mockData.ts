import {
  Brain,
  Database,
  Layers,
  FileText,
  Shield,
  Search,
  Settings,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type StatCard = {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  icon: LucideIcon;
};

export const stats: StatCard[] = [
  {
    id: 'documents',
    label: 'Documents Indexed',
    value: '1,284',
    sublabel: '+47 this week',
    icon: FileText,
  },
  {
    id: 'chunks',
    label: 'Chunks Stored',
    value: '48,920',
    sublabel: '512 tokens avg',
    icon: Layers,
  },
  {
    id: 'vector-db',
    label: 'Vector Database',
    value: 'Active',
    sublabel: 'pgvector · 768 dims',
    icon: Database,
  },
];

export type RetrievalSetting = {
  id: string;
  label: string;
  description: string;
  default: string;
  options: string[];
  icon: LucideIcon;
};

export const retrievalSettings: RetrievalSetting[] = [
  {
    id: 'top-k',
    label: 'Top K Results',
    description: 'Number of chunks retrieved per query',
    default: '5',
    options: ['3', '5', '10'],
    icon: Search,
  },
  {
    id: 'similarity',
    label: 'Similarity Threshold',
    description: 'Minimum cosine similarity score',
    default: '0.72',
    options: ['0.60', '0.72', '0.85'],
    icon: Shield,
  },
  {
    id: 'model',
    label: 'Embedding Model',
    description: 'Model used for vectorization',
    default: 'text-embedding-3-large',
    options: ['text-embedding-3-large', 'text-embedding-3-small'],
    icon: Brain,
  },
];

export type Source = {
  id: string;
  filename: string;
  page: number;
  snippet: string;
  score: number;
  type: 'PDF' | 'DOCX' | 'MD';
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
};

const s1: Source = {
  id: 'src-1',
  filename: 'Q3_Financial_Report.pdf',
  page: 14,
  snippet:
    'Total revenue reached $42.8M in Q3, representing a 28% year-over-year increase driven primarily by enterprise contract renewals and the expansion of the EMEA sales team.',
  score: 0.94,
  type: 'PDF',
};
const s2: Source = {
  id: 'src-2',
  filename: 'Annual_Investor_Briefing.pdf',
  page: 7,
  snippet:
    'The board approved a revised compensation structure tying executive bonuses to net revenue retention, effective starting fiscal year 2025, with quarterly review cadence.',
  score: 0.89,
  type: 'PDF',
};
const s3: Source = {
  id: 'src-3',
  filename: 'Product_Strategy_2025.docx',
  page: 3,
  snippet:
    'Strategic priorities for FY25 include AI-native document workflows, multi-modal ingestion, and a redesigned retrieval pipeline reducing p95 latency below 900ms.',
  score: 0.86,
  type: 'DOCX',
};
const s4: Source = {
  id: 'src-4',
  filename: 'Engineering_Plan.md',
  page: 11,
  snippet:
    'Migration to a hybrid search combining BM25 keyword scores with dense vector similarity yielded a 34% lift in retrieval precision across the evaluation benchmark.',
  score: 0.81,
  type: 'MD',
};

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What were the key drivers behind the Q3 revenue growth?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      'Q3 revenue grew 28% year-over-year to **$42.8M**, driven by two primary factors:\n\n1. **Enterprise contract renewals** — a significant portion of existing enterprise customers expanded their seat counts and committed to multi-year agreements.\n2. **EMEA team expansion** — the newly scaled EMEA sales org began converting pipeline that had been in flight for multiple quarters.\n\nAdditionally, the board approved a revised compensation structure tying executive bonuses to net revenue retention starting FY25, which aligns leadership incentives with durable, retention-led growth.',
    sources: [s1, s2],
  },
];

export const emptyStateSources: Source[] = [s1, s2, s3, s4];

export const suggestionPrompts = [
  'Summarize the Q3 financial highlights',
  'What are the FY25 strategic priorities?',
  'Explain the hybrid search approach',
  'How is executive compensation structured?',
];

export const statusBadge = {
  label: 'All systems operational',
  icon: Zap,
};
