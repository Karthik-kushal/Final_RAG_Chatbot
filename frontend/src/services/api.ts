const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface QueryResponse {
  answer: string;
  sources: Array<{
    name: string;
    page: number;
    full: string;
  }>;
  similarity_distance: number;
}

export async function queryRAG(question: string): Promise<QueryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to query RAG');
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
}
