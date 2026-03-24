// src/lib/alphavantage.ts
const ALPHA_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export interface ChartDataPoint {
  date: string;
  close: number;
}

export async function fetchCompanyHistory(companyName: string): Promise<ChartDataPoint[]> {
  try {
    if (!ALPHA_KEY) {
      console.warn("No AlphaVantage API key found.");
      return [];
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
      return [];
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
       return [];
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
    return [];
  }
}
