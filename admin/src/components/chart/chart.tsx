import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import styles from './chart.module.scss';
import { _userstats } from '../../interface/_custom';

export default function Chart({ data }: { data: _userstats[] }) {
  return (
    <ResponsiveContainer width='99%' minHeight={350} debounce={1}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='0%'
              stopColor='var(--custom-color)'
              stopOpacity={0.4}
            />
            <stop
              offset='75%'
              stopColor='var(--custom-color)'
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area dataKey='total' stroke='var(--custom-color)' fill='url(#color)' />

        <XAxis
          dataKey='_id'
          axisLine={false}
          tickLine={false}
          tickFormatter={data && data._id}
        />

        <YAxis
          dataKey='total'
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={data && data.total}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) {
  if (active) {
    return (
      <div className='tooltip'>
        <h4>Month: {label}</h4>
        <p>{payload && payload[0].payload.total}</p>
      </div>
    );
  }
  return null;
}
