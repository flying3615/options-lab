import { useState } from 'react';
import { Link } from 'react-router-dom';

type Outlook = '大涨' | '温和上涨' | '盘整' | '温和下跌' | '大跌';
type RiskTolerance = '低' | '中' | '高';

interface Suggestion {
  name: string;
  id: string;
  reason: string;
}

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [outlook, setOutlook] = useState<Outlook | null>(null);
  const [risk, setRisk] = useState<RiskTolerance | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const handleOutlookSelect = (o: Outlook) => {
    setOutlook(o);
    setStep(2);
  };

  const handleRiskSelect = (r: RiskTolerance) => {
    setRisk(r);
    let result: Suggestion;

    switch (outlook) {
      case '大涨':
        if (r === '高') {
          result = { name: '买入看涨期权 (Long Call)', id: 'long-call', reason: '高风险高回报的选择。如果股价如预期般大幅上涨，您的收益潜力理论上是无限的。' };
        } else if (r === '中') {
          result = { name: '牛市看涨价差 (Bull Call Spread)', id: 'bull-call-spread', reason: '中等风险的选择。通过卖出一个更虚值的看涨期权，您用部分上行潜力换取了更低的成本和更高的胜率。' };
        } else {
          result = { name: '牛市看跌信用价差 (Bull Put Spread)', id: 'bull-put-credit-spread', reason: '低风险的选择。只要股价保持在一定价格之上，您就能赚取权利金。这是一个高胜率的策略。' };
        }
        break;

      case '温和上涨':
        if (r === '高') {
          result = { name: '卖出看跌期权 (Short Put)', id: 'short-put', reason: '高风险的选择，但如果股价没有跌破执行价，您可以赚取全部权利金。相当于打折买入股票。' };
        } else if (r === '中') {
          result = { name: '牛市看涨价差 (Bull Call Spread)', id: 'bull-call-spread', reason: '非常适合温和看涨的经典策略，成本和风险都有限，目标是赚取两个执行价之间的差价。' };
        } else {
          result = { name: '备兑看涨期权 (Covered Call)', id: 'covered-call', reason: '如果您持有股票，这是在温和看涨行情中增强收益的绝佳方式，通过卖出期权收取“租金”。' };
        }
        break;

      case '盘整':
        if (r === '高') {
          result = { name: '卖出跨式策略 (Short Straddle)', id: 'short-straddle', reason: '高风险高收益的波动率策略。只要股价在到期日变动不大，您就能赚取大量权利金。注意：风险是无限的！' };
        } else if (r === '中') {
          result = { name: '铁鹰策略 (Iron Condor)', id: 'iron-condor', reason: '非常流行的中性策略，通过构建一个区间来收取权利金，只要股价在区间内波动，您就能盈利。' };
        } else {
          result = { name: '日历价差 (Calendar Spread)', id: 'calendar-spread', reason: '一种低风险的、赚取时间价值的策略，如果股价在执行价附近徘徊，您将获利。' };
        }
        break;

      case '温和下跌':
        if (r === '高') {
          result = { name: '卖出看涨期权 (Short Call)', id: 'short-call', reason: '裸卖看涨期权风险极高，但如果股价如您预期般没有大涨，您将赚取全部权利金。' };
        } else if (r === '中') {
          result = { name: '熊市看跌价差 (Bear Put Spread)', id: 'bear-put-spread', reason: '经典的温和看跌策略，通过买入和卖出一个看跌期权，锁定风险和收益，以小博大。' };
        } else {
          result = { name: '熊市看涨信用价差 (Bear Call Spread)', id: 'bear-call-credit-spread', reason: '低风险高胜率的选择。只要股价保持在您的卖出执行价之下，您就能盈利。' };
        }
        break;

      case '大跌':
        if (r === '高') {
          result = { name: '买入看跌期权 (Long Put)', id: 'long-put', reason: '高风险高回报的看空工具。如果股价如预期般大幅下跌，您的收益将非常可观。' };
        } else if (r === '中') {
          result = { name: '熊市看跌价差 (Bear Put Spread)', id: 'bear-put-spread', reason: '中等风险的看空选择，通过锁定最大亏损来降低成本，是比直接买入看跌更稳健的做法。' };
        } else {
          result = { name: '保护性看跌期权 (Protective Put)', id: 'protective-put', reason: '如果您担心持有的股票大跌，这相当于为您的股票买一份保险，是风险管理的基石。' };
        }
        break;

      default:
        result = { name: '买入看涨期权 (Long Call)', id: 'long-call', reason: '我们从最基础的策略开始吧！' };
        break;
    }

    setSuggestion(result);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setOutlook(null);
    setRisk(null);
    setSuggestion(null);
  };

  return (
    <section>
      <h1>策略推荐向导</h1>
      <p style={{ color: 'var(--muted)' }}>回答两个简单问题，我们将为您推荐一个适合您当前想法的入门策略。</p>

      <div className="card" style={{ marginTop: 24 }}>
        {step === 1 && (
          <div>
            <h3>第一步：您对市场的看法是？</h3>
            <div className="grid">
              <button onClick={() => handleOutlookSelect('大涨')}>🚀 大幅上涨</button>
              <button onClick={() => handleOutlookSelect('温和上涨')}>📈 温和上涨</button>
              <button onClick={() => handleOutlookSelect('盘整')}>횡 盘整/区间震荡</button>
              <button onClick={() => handleOutlookSelect('温和下跌')}>📉 温和下跌</button>
              <button onClick={() => handleOutlookSelect('大跌')}>💣 大幅下跌</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>第二步：您的风险承受能力是？</h3>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>您选择的看法是：<strong>{outlook}</strong></p>
            <div className="grid">
              <button onClick={() => handleRiskSelect('低')}>🟢 低</button>
              <button onClick={() => handleRiskSelect('中')}>🟡 中</button>
              <button onClick={() => handleRiskSelect('高')}>🔴 高</button>
            </div>
            <button onClick={reset} style={{ marginTop: 16, background: 'transparent', border: 'none' }}>&larr; 返回上一步</button>
          </div>
        )}

        {step === 3 && suggestion && (
          <div>
            <h3>我们为您推荐：</h3>
            <h2><Link to={`/strategies/${suggestion.id}`}>{suggestion.name}</Link></h2>
            <p>{suggestion.reason}</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <Link to={`/strategies/${suggestion.id}`} className="button">查看策略详情</Link>
              <button onClick={reset}>重新测试</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
