import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './AvailabilityChartCard.css';

type WeeklyItem = {
  day: string;
  operativa: number;
  mantenimiento: number;
};

type AvailabilityChartCardProps = {
  weeklyData: WeeklyItem[];
};

function AvailabilityChartCard({ weeklyData }: AvailabilityChartCardProps) {
  return (
    <section className="card chart-card">
      <div className="section-head">
        <div>
          <h2>Disponibilidad Semanal</h2>
          <p>Flota operativa vs en mantenimiento</p>
        </div>

        <div className="legend">
          <span><i className="legend-dot dark" />Flota Operativa</span>
          <span><i className="legend-dot light" />En Mantenimiento</span>
        </div>
      </div>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="operativa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.28} />
                <stop offset="95%" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="operativa"
              stroke="#0f172a"
              strokeWidth={2}
              fill="url(#operativa)"
            />
            <Area
              type="monotone"
              dataKey="mantenimiento"
              stroke="#94a3b8"
              strokeWidth={2}
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default AvailabilityChartCard;
