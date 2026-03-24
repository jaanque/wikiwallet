// src/lib/finnhub.ts
const FINNHUB_KEY = process.env.FINNHUB_API_KEY;

export interface ChartDataPoint {
  date: string;
  close: number;
}

const TICKER_MAP: Record<string, string> = {
  "Apple": "AAPL",
  "Apple Inc.": "AAPL",
  "Apple Inc": "AAPL",
  "Microsoft": "MSFT",
  "Nvidia": "NVDA",
  "NVIDIA": "NVDA",
  "TSMC": "TSM",
  "Taiwan Semiconductor": "TSM",
  "ASML": "ASML",
  "Samsung": "SSNLF",
  "Samsung Electronics": "SSNLF",
  "Foxconn": "HNHPF",
  "Hon Hai Precision": "HNHPF",
  "Intel": "INTC",
  "AMD": "AMD",
  "Qualcomm": "QCOM",
  "Broadcom": "AVGO",
  "Sony": "SONY",
  "Google": "GOOGL",
  "Alphabet": "GOOGL",
  "Meta": "META",
  "Amazon": "AMZN",
  "Tesla": "TSLA",
  "ARM": "ARM",
  "Arm Holdings": "ARM"
};

export async function fetchCompanyHistory(companyName: string, explicitTicker?: string | null): Promise<ChartDataPoint[]> {
  try {
    if (!FINNHUB_KEY) {
      console.warn("No Finnhub API key found.");
      return [];
    }

    // 1. Resolve exact ticker
    let ticker = explicitTicker || TICKER_MAP[companyName.trim()];

    if (!ticker) {
      // Finnhub symbol search fallback (if needed)
      const searchRes = await fetch(`https://finnhub.io/api/v1/search?q=${encodeURIComponent(companyName)}&token=${FINNHUB_KEY}`);
      if (!searchRes.ok) return [];
      const searchData = await searchRes.json();
      
      if (!searchData.result || searchData.result.length === 0) {
        console.warn(`Finnhub symbol search failed for ${companyName}`);
        return [];
      }
      
      // Filter out non-US primary tickers if possible, or just take first
      ticker = searchData.result[0].symbol;
    }

    // 2. Fetch candles (last 30 days)
    const toDate = Math.floor(Date.now() / 1000);
    const fromDate = toDate - (30 * 24 * 60 * 60); // 30 days ago
    
    // We use resolution "D" for daily candles.
    const candleRes = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${fromDate}&to=${toDate}&token=${FINNHUB_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!candleRes.ok) {
       console.warn(`Finnhub fetch failed for ${ticker}`);
       return [];
    }

    const candleData = await candleRes.json();

    if (candleData.s !== "ok" || !candleData.t || !candleData.c) {
       console.warn(`Finnhub returned no data ("${candleData.s}") for ${ticker}`);
       return [];
    }

    // 3. Format to Recharts interface
    const formattedData: ChartDataPoint[] = candleData.t.map((timestamp: number, index: number) => {
      // Finnhub timestamp is unix seconds
      const date = new Date(timestamp * 1000).toISOString().split("T")[0];
      return {
        date,
        close: parseFloat(candleData.c[index])
      };
    });

    return formattedData;
  } catch (err) {
    console.error(`Error fetching graph data for ${companyName}:`, err);
    return [];
  }
}
