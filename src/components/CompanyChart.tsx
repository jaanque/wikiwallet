"use client";


import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export interface ChartDataPoint {
  date: string;
  close: number;
}

interface CompanyChartProps {
  data: ChartDataPoint[];
  color?: string;
  ticketName?: string;
}

export default function CompanyChart({ data, color = "#10b981", ticketName }: CompanyChartProps) {
  // Graceful fallback
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground text-xs font-medium bg-muted/5 rounded-xl border border-border">Gráfica no disponible</div>;
  }

  const gradientId = `color-${color.replace('#', '')}`;

  return (
    <div className="w-full h-full min-h-[140px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            hide 
          />
          <YAxis 
            domain={['dataMin - 2', 'dataMax + 2']} 
            hide 
          />
          <Tooltip 
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid var(--border)', 
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '12px',
              padding: '8px 12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: color, fontWeight: '800' }}
            formatter={(value: unknown) => [`$${Number(value || 0).toFixed(2)}`, ticketName || "Precio"]}
            labelFormatter={(label) => `Fecha: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke={color} 
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
            strokeWidth={2.5}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
