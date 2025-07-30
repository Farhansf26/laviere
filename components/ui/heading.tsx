'use client'

interface HeadingProps {
  title: string
  description?: string
  center?: boolean
}

export default function Heading({ title, description, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="md:text-3xl text-xl font-bold tracking-tight">{title}</h1>
      <p className="md:text-sm text-xs font-light text-muted-foreground">{description}</p>
    </div>
  )
}
