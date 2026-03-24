// src/lib/alphavantage.ts
const ALPHA_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export interface ChartDataPoint {
  date: string;
  close: number;
}

// Mapeo exhaustivo de las empresas industriales críticas a sus tickers más fiables.
// AlphaVantage a veces falla en la búsqueda (SYMBOL_SEARCH) de empresas 
// asiáticas o europeas si no tienen el sufijo exacto, así que forzamos los correctos.
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
  "Samsung": "SSNLF", // OTC market for Samsung
  "Samsung Electronics": "SSNLF",
  "Foxconn": "HNHPF", // OTC market
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
    if (!ALPHA_KEY) {
      console.warn("No AlphaVantage API key found.");
      return [];
    }

    // Attempt 1: Prioritize explicit Database ticker, then hardcoded safe TICKER dictionary.
    let ticker = explicitTicker || TICKER_MAP[companyName.trim()];

    if (!ticker) {
      // Attempt 1.5: Fallback to AlphaVantage's internal SYMBOL_SEARCH
      const searchRes = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(companyName)}&apikey=${ALPHA_KEY}`,
        { next: { revalidate: 86400 } } // Cache aggressively
      );
      
      const searchData = await searchRes.json();
      
      if (searchData.Note || searchData.Information?.includes("rate limit") || !searchData.bestMatches || searchData.bestMatches.length === 0) {
        console.warn(`AlphaVantage symbol search failed or limit hit for ${companyName}`);
        return [];
      }

      // Automatically select the most relevant ticker symbol found
      ticker = searchData.bestMatches[0]["1. symbol"];
    }

    // Attempt 2: Fetch daily closing values accurately with the confirmed ticker
    const timeSeriesRes = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${ALPHA_KEY}`,
      { next: { revalidate: 86400 } }
    );
    
    const timeSeriesData = await timeSeriesRes.json();

    if (timeSeriesData.Note || !timeSeriesData["Time Series (Daily)"]) {
       console.warn(`AlphaVantage rate limit hit fetching time series for ${ticker} (${companyName})`);
       return [];
    }

    const daily = timeSeriesData["Time Series (Daily)"];
    
    // Sort logically to get chronological history of the last 30 market days
    const dates = Object.keys(daily).sort().slice(-30); 
    
    const formattedData = dates.map(date => ({
      date,
      close: parseFloat(daily[date]["4. close"])
    }));

    return formattedData;
  } catch (err) {
    console.error(`Error fetching graph data for ${companyName}:`, err);
    return [];
  }
}
