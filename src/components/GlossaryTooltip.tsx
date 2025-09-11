import React, { useState } from 'react';
import { glossary } from '../data/glossary';

interface Props {
  term: string;
  children: React.ReactNode;
}

const termStyle: React.CSSProperties = {
  textDecoration: 'underline dotted',
  cursor: 'help',
  position: 'relative',
};

const tooltipStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '125%', // Position above the text
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#333',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '4px',
  zIndex: 100,
  width: '250px',
  textAlign: 'left',
  fontSize: '12px',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.2s, visibility 0.2s',
};

const tooltipVisibleStyle: React.CSSProperties = {
  ...tooltipStyle,
  visibility: 'visible',
  opacity: 1,
};

export default function GlossaryTooltip({ term, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // Allow finding by term or alias
  const termData = glossary.find(t => t.term === term || t.aliases?.some(alias => children?.toString().includes(alias)));

  if (!termData) {
    return <>{children}</>; // Return children as is if term not found
  }

  return (
    <span
      style={termStyle}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div style={isVisible ? tooltipVisibleStyle : tooltipStyle}>
        <strong style={{ color: 'var(--accent-light)' }}>{termData.term}</strong>
        <p style={{ margin: '4px 0 0' }}>{termData.definition}</p>
      </div>
    </span>
  );
}
