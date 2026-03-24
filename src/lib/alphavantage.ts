// src/lib/alphavantage.ts
const ALPHA_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export interface ChartDataPoint {
  date: string;
  close: number;
}

// Generate a plausible chart for companies when API limits are reached
function generateMockData(baseValue = 100): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let currentValue = baseValue;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    // Random walk
    const change = (Math.random() - 0.45) * (baseValue * 0.05);
    currentValue = Math.max(10, currentValue + change);
    
    data.push({
      date: d.toISOString().split("T")[0],
      close: Number(currentValue.toFixed(2))
    });
  }
  return data;
}

export async function fetchCompanyHistory(companyName: string): Promise<ChartDataPoint[]> {
  try {
    if (!ALPHA_KEY) {
      console.warn("No AlphaVantage API key found, using mock data.");
      return generateMockData();
    }

    // Attempt 1: Search for ticker by name
    const searchRes = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(companyName)}&apikey=${ALPHA_KEY}`,
      { next: { revalidate: 86400 } } // Cache aggressively to save limits
    );
    
    const searchData = await searchRes.json();
    
    // Check for API rate limit
    if (searchData.Note || searchData.Information?.includes("rate limit") || !searchData.bestMatches || searchData.bestMatches.length === 0) {
      console.warn(`AlphaVantage rate limit hit or ticker not found for ${companyName}`);
      return generateMockData();
    }

    const ticker = searchData.bestMatches[0]["1. symbol"];

    // Attempt 2: Fetch daily closing values
    const timeSeriesRes = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${ALPHA_KEY}`,
      { next: { revalidate: 86400 } }
    );
    
    const timeSeriesData = await timeSeriesRes.json();

    if (timeSeriesData.Note || !timeSeriesData["Time Series (Daily)"]) {
       console.warn(`AlphaVantage rate limit hit on time series for ${ticker}`);
       return generateMockData();
    }

    const daily = timeSeriesData["Time Series (Daily)"];
    
    // Convert object to array and get last 30 days
    const dates = Object.keys(daily).sort().slice(-30); 
    
    const formattedData = dates.map(date => ({
      date,
      close: parseFloat(daily[date]["4. close"])
    }));

    return formattedData;
  } catch (err) {
    console.error(`Error fetching graph data for ${companyName}:`, err);
    return generateMockData();
  }
}
