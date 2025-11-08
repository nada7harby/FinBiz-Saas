

import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
export function SpendOverviewCard({ data }: { data: any[] }) {
  const [activeTab, setActiveTab] = useState('Monthly')
  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  return (
    <div className=" rounded-2xl lg:p-6 p-2 border  h-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4 ">
        <h3 className=" text-xl font-semibold text-foreground">Spend Overview</h3>
        <div className="flex space-x-2 flex-wrap md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab ? 'bg-[#2A2A2C] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2C" />
         <XAxis
            dataKey="time"
            stroke="#666"
            tick={{
              fill: "#4F4F4F",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#666666"
            tick={{
              fill: "#4F4F4F",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1C',
              border: '1px solid #2A2A2C',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#14B8A6"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}