'use client'

import { indoCurrency } from "@/lib/formatNumber"
import { IconType } from "react-icons/lib"


interface CardInfoProps {
  title: string
  description: string
  icon: IconType
  value: number
  iconColor?: string | null
  moneyFormat?: boolean
}

export default function CardInfo({ title, description, value, icon: Icon, iconColor, moneyFormat }: CardInfoProps) {
  return (
    <div className="border rounded-lg p-4 max-lg:p-3 min-w-[200px] md:min-w-[300px] shadow-lg space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl max-lg:text-base">{title}</h3>
          <p className="text-sm max-lg:text-xs font-light text-gray-600">{description}</p>
        </div>
        <div className="p-2 bg-slate-200 rounded-full">
          <Icon className={`text-3xl max-md:text-lg ${iconColor}`}/>
        </div>
      </div>
      <div className="font-semibold lg:text-lg">{moneyFormat ? indoCurrency(value) : value}</div>
    </div>
  )
}
