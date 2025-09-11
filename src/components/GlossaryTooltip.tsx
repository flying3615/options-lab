import React from 'react';
import { glossary } from '../data/glossary';
import styles from './GlossaryTooltip.module.scss';

interface Props {
  term: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: Props) {
  // Allow finding by term or alias
  const termData = glossary.find(t =>
    t.term === term ||
    t.aliases?.some(alias =>
      children?.toString().toLowerCase().includes(alias.toLowerCase())
    )
  );

  if (!termData) {
    return <>{children}</>; // Return children as is if term not found
  }

  return (
    <span
      className={styles.term}
      tabIndex={0}
      aria-describedby={`tooltip-${term}`}
    >
      {children}
      <div
        className={styles.tooltip}
        id={`tooltip-${term}`}
        role="tooltip"
      >
        <strong className={styles.termName}>{termData.term}</strong>
        <p className={styles.definition}>{termData.definition}</p>
      </div>
    </span>
  );
}
