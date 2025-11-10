import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './Wizard.module.scss';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  AlertTriangle,
  Zap,
  RotateCcw,
  Star,
  ArrowRight,
} from 'lucide-react';

type Outlook = '大涨' | '温和上涨' | '盘整' | '温和下跌' | '大跌';
type RiskTolerance = '低' | '中' | '高';

interface Suggestion {
  name: string;
  id: string;
  reason: string;
}

// 自定义节点组件
const ModernCardNode = ({ data }: { data: any }) => {
  const { icon: Icon, label, onClick, isSelected = false, level, subtitle, gradient } = data;
  
  return (
    <div
      className={`${styles.modernCardNode} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      data-level={level}
    >
      {gradient && <div className={styles.gradientOverlay} />}
      <div className={styles.cardContent}>
        {Icon && <Icon className={styles.cardIcon} size={24} />}
        <div className={styles.cardText}>
          <h4>{label}</h4>
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
        <ArrowRight className={styles.arrowIcon} size={16} />
      </div>
    </div>
  );
};

const ResultCardNode = ({ data }: { data: any }) => {
  const { suggestion, onReset, isCurrent = false } = data;
  
  if (!suggestion) return null;
  
  return (
    <div className={`${styles.resultCardNode} ${isCurrent ? styles.current : ''}`}>
      <div className={styles.resultHeader}>
        <Star className={styles.starIcon} size={20} />
        <span className={styles.resultLabel}>推荐策略</span>
      </div>
      <h3 className={styles.strategyName}>
        <Link to={`/strategies/${suggestion.id}`}>{suggestion.name}</Link>
      </h3>
      <p className={styles.strategyReason}>{suggestion.reason}</p>
      <div className={styles.resultActions}>
        <Link to={`/strategies/${suggestion.id}`} className={styles.viewButton}>
          查看详情
        </Link>
        <button onClick={onReset} className={styles.resetButton}>
          <RotateCcw size={14} />
          重新选择
        </button>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  modernCard: ModernCardNode,
  resultCard: ResultCardNode,
};

export default function Wizard() {
  const [selectedOutlook, setSelectedOutlook] = useState<Outlook | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskTolerance | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  // 获取策略推荐
  const getSuggestion = useCallback((outlook: Outlook, risk: RiskTolerance): Suggestion => {
    switch (outlook) {
      case '大涨':
        if (risk === '高') {
          return {
            name: '买入看涨期权 (Long Call)',
            id: 'long-call',
            reason: '高风险高回报的选择。如果股价如预期般大幅上涨，您的收益潜力理论上是无限的。'
          };
        } else if (risk === '中') {
          return {
            name: '牛市看涨价差 (Bull Call Spread)',
            id: 'bull-call-spread',
            reason: '中等风险的选择。通过卖出一个更虚值的看涨期权，您用部分上行潜力换取了更低的成本和更高的胜率。'
          };
        } else {
          return {
            name: '牛市看跌信用价差 (Bull Put Spread)',
            id: 'bull-put-credit-spread',
            reason: '低风险的选择。只要股价保持在一定价格之上，您就能赚取权利金。这是一个高胜率的策略。'
          };
        }

      case '温和上涨':
        if (risk === '高') {
          return {
            name: '卖出看跌期权 (Short Put)',
            id: 'short-put',
            reason: '高风险的选择，但如果股价没有跌破执行价，您可以赚取全部权利金。相当于打折买入股票。'
          };
        } else if (risk === '中') {
          return {
            name: '牛市看涨价差 (Bull Call Spread)',
            id: 'bull-call-spread',
            reason: '非常适合温和看涨的经典策略，成本和风险都有限，目标是赚取两个执行价之间的差价。'
          };
        } else {
          return {
            name: '备兑看涨期权 (Covered Call)',
            id: 'covered-call',
            reason: '如果您持有股票，这是在温和看涨行情中增强收益的绝佳方式，通过卖出期权收取"租金"。'
          };
        }

      case '盘整':
        if (risk === '高') {
          return {
            name: '卖出跨式策略 (Short Straddle)',
            id: 'short-straddle',
            reason: '高风险高收益的波动率策略。只要股价在到期日变动不大，您就能赚取大量权利金。注意：风险是无限的！'
          };
        } else if (risk === '中') {
          return {
            name: '铁鹰策略 (Iron Condor)',
            id: 'iron-condor',
            reason: '非常流行的中性策略，通过构建一个区间来收取权利金，只要股价在区间内波动，您就能盈利。'
          };
        } else {
          return {
            name: '日历价差 (Calendar Spread)',
            id: 'calendar-spread',
            reason: '一种低风险的、赚取时间价值的策略，如果股价在执行价附近徘徊，您将获利。'
          };
        }

      case '温和下跌':
        if (risk === '高') {
          return {
            name: '卖出看涨期权 (Short Call)',
            id: 'short-call',
            reason: '裸卖看涨期权风险极高，但如果股价如您预期般没有大涨，您将赚取全部权利金。'
          };
        } else if (risk === '中') {
          return {
            name: '熊市看跌价差 (Bear Put Spread)',
            id: 'bear-put-spread',
            reason: '经典的温和看跌策略，通过买入和卖出一个看跌期权，锁定风险和收益，以小博大。'
          };
        } else {
          return {
            name: '熊市看涨信用价差 (Bear Call Spread)',
            id: 'bear-call-credit-spread',
            reason: '低风险高胜率的选择。只要股价保持在您的卖出执行价之下，您就能盈利。'
          };
        }

      case '大跌':
        if (risk === '高') {
          return {
            name: '买入看跌期权 (Long Put)',
            id: 'long-put',
            reason: '高风险高回报的看空工具。如果股价如预期般大幅下跌，您的收益将非常可观。'
          };
        } else if (risk === '中') {
          return {
            name: '熊市看跌价差 (Bear Put Spread)',
            id: 'bear-put-spread',
            reason: '中等风险的看空选择，通过锁定最大亏损来降低成本，是比直接买入看跌更稳健的做法。'
          };
        } else {
          return {
            name: '保护性看跌期权 (Protective Put)',
            id: 'protective-put',
            reason: '如果您担心持有的股票大跌，这相当于为您的股票买一份保险，是风险管理的基石。'
          };
        }

      default:
        return {
          name: '买入看涨期权 (Long Call)',
          id: 'long-call',
          reason: '我们从最基础的策略开始吧！'
        };
    }
  }, []);

  // 处理市场看法选择
  const handleOutlookSelect = useCallback((outlook: Outlook) => {
    setSelectedOutlook(outlook);
    setSelectedRisk(null);
    setSuggestion(null);
  }, []);

  // 处理风险承受能力选择
  const handleRiskSelect = useCallback((risk: RiskTolerance) => {
    if (selectedOutlook) {
      const result = getSuggestion(selectedOutlook, risk);
      setSuggestion(result);
      setSelectedRisk(risk);
    }
  }, [selectedOutlook, getSuggestion]);

  // 重置流程
  const reset = useCallback(() => {
    setSelectedOutlook(null);
    setSelectedRisk(null);
    setSuggestion(null);
  }, []);

  // 使用useMemo计算节点 - 现代卡片式布局
  const nodes = useMemo(() => {
    const nodes: Node[] = []

    // 第一层：市场看法卡片
    const outlooks = [
      { 
        id: 'outlook-bull', 
        label: '看涨', 
        icon: TrendingUp, 
        x: 200, 
        y: 100,
        gradient: 'from-red-500 to-pink-500',
        subtitle: '预期股价上涨'
      },
      { 
        id: 'outlook-neutral', 
        label: '中性', 
        icon: Minus, 
        x: 400, 
        y: 100,
        gradient: 'from-blue-500 to-cyan-500',
        subtitle: '预期股价横盘'
      },
      { 
        id: 'outlook-bear', 
        label: '看跌', 
        icon: TrendingDown, 
        x: 600, 
        y: 100,
        gradient: 'from-green-500 to-emerald-500',
        subtitle: '预期股价下跌'
      },
    ];

    outlooks.forEach(outlook => {
      nodes.push({
        id: outlook.id,
        type: 'modernCard',
        data: {
          icon: outlook.icon,
          label: outlook.label,
          subtitle: outlook.subtitle,
          gradient: outlook.gradient,
          onClick: () => {
            // 根据选择设置具体的市场看法
            if (outlook.label === '看涨') {
              handleOutlookSelect('大涨'); // 可以进一步细分为大涨、温和上涨
            } else if (outlook.label === '中性') {
              handleOutlookSelect('盘整');
            } else {
              handleOutlookSelect('大跌'); // 可以进一步细分为大跌、温和下跌
            }
          },
          isSelected: selectedOutlook === (outlook.label === '看涨' ? '大涨' : outlook.label === '中性' ? '盘整' : '大跌'),
          level: 1
        },
        position: { x: outlook.x, y: outlook.y },
      });
    });

    // 第二层：风险偏好卡片
    if (selectedOutlook) {
      const risks = [
        { 
          id: 'risk-conservative', 
          label: '保守型', 
          icon: Shield, 
          x: 150, 
          y: 250,
          gradient: 'from-emerald-500 to-teal-500',
          subtitle: '低风险，稳定收益'
        },
        { 
          id: 'risk-balanced', 
          label: '平衡型', 
          icon: AlertTriangle, 
          x: 400, 
          y: 250,
          gradient: 'from-amber-500 to-orange-500',
          subtitle: '中等风险，平衡收益'
        },
        { 
          id: 'risk-aggressive', 
          label: '激进型', 
          icon: Zap, 
          x: 650, 
          y: 250,
          gradient: 'from-red-500 to-rose-500',
          subtitle: '高风险，高收益'
        },
      ];

      risks.forEach(risk => {
        nodes.push({
          id: risk.id,
          type: 'modernCard',
          data: {
            icon: risk.icon,
            label: risk.label,
            subtitle: risk.subtitle,
            gradient: risk.gradient,
            onClick: () => {
              handleRiskSelect(risk.label === '保守型' ? '低' : risk.label === '平衡型' ? '中' : '高');
            },
            isSelected: selectedRisk === (risk.label === '保守型' ? '低' : risk.label === '平衡型' ? '中' : '高'),
            level: 2
          },
          position: { x: risk.x, y: risk.y },
        });
      });
    }

    // 结果卡片
    if (suggestion) {
      nodes.push({
        id: 'result',
        type: 'resultCard',
        data: { 
          suggestion,
          onReset: reset,
          isCurrent: true
        },
        position: { x: 300, y: 400 },
      });
    }

    return nodes;
  }, [selectedOutlook, selectedRisk, suggestion, handleOutlookSelect, handleRiskSelect, reset]);

  // 使用useMemo计算边
  const edges = useMemo(() => {
    const edges: Edge[] = [];

    if (selectedOutlook) {
      // 市场看法到风险偏好的连接
      const outlookId = selectedOutlook === '大涨' || selectedOutlook === '温和上涨' ? 'outlook-bull' :
                       selectedOutlook === '盘整' ? 'outlook-neutral' : 'outlook-bear';
      
      ['risk-conservative', 'risk-balanced', 'risk-aggressive'].forEach(riskId => {
        edges.push({
          id: `e-${outlookId}-${riskId}`,
          source: outlookId,
          target: riskId,
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: '#6366f1',
            strokeWidth: 2,
          },
        });
      });
    }

    if (suggestion) {
      // 风险偏好到结果的连接
      const riskId = selectedRisk === '低' ? 'risk-conservative' :
                    selectedRisk === '中' ? 'risk-balanced' : 'risk-aggressive';
      
      edges.push({
        id: `e-${riskId}-result`,
        source: riskId,
        target: 'result',
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: '#8b5cf6',
          strokeWidth: 3,
        },
      });
    }

    return edges;
  }, [selectedOutlook, selectedRisk, suggestion]);

  // 直接使用计算的值
  const currentNodes = nodes;
  const currentEdges = edges;

  return (
    <section className={styles.wizard}>
      <div className={styles.header}>
        <h1>智能期权策略推荐</h1>
        <p className={styles.subtitle}>
          基于现代投资组合理论，为您匹配最适合的期权交易策略
        </p>
      </div>
      
      <div className={styles.flowContainer}>
        <ReactFlow
          nodes={currentNodes}
          edges={currentEdges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          panOnDrag={true}
          zoomOnScroll={true}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {!selectedOutlook && (
        <div className={styles.instructions}>
          <h3>使用说明</h3>
          <div className={styles.instructionGrid}>
            <div className={styles.instructionItem}>
              <div className={styles.instructionNumber}>1</div>
              <div>
                <h4>选择市场预期</h4>
                <p>根据您对股价走势的判断选择看涨、中性或看跌</p>
              </div>
            </div>
            <div className={styles.instructionItem}>
              <div className={styles.instructionNumber}>2</div>
              <div>
                <h4>确定风险偏好</h4>
                <p>选择保守型、平衡型或激进型的投资风格</p>
              </div>
            </div>
            <div className={styles.instructionItem}>
              <div className={styles.instructionNumber}>3</div>
              <div>
                <h4>获取策略推荐</h4>
                <p>系统将为您推荐最适合的期权交易策略</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
