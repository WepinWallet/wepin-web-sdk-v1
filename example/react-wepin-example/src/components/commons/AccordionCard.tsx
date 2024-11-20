import React, { ReactNode } from 'react'
import './AccordionCard.css'

interface AccordionCardProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="accordion-card">
      <div className="accordion-header" onClick={onToggle}>
        <h3 className="accordion-title">{title}</h3>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}

export default AccordionCard
