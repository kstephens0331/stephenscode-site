import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Calculator, Shield, BookOpen, Search, ChevronRight, DollarSign, X, CheckCircle } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

/* ---------- Calculators ---------- */

type CalculatorId = 'retirement' | 'withholding' | 'investment' | 'social-security';

function futureValue(initial: number, monthly: number, years: number, annualRate: number) {
  const r = annualRate / 100;
  if (years <= 0) return initial;
  if (r === 0) return initial + monthly * 12 * years;
  const growth = Math.pow(1 + r, years);
  return initial * growth + monthly * 12 * ((growth - 1) / r);
}

const SINGLE_BRACKETS: [number, number][] = [
  [11600, 0.10],
  [47150, 0.12],
  [100525, 0.22],
  [191950, 0.24],
  [243725, 0.32],
  [609350, 0.35],
  [Infinity, 0.37],
];

const MARRIED_BRACKETS: [number, number][] = [
  [23200, 0.10],
  [94300, 0.12],
  [201050, 0.22],
  [383900, 0.24],
  [487450, 0.32],
  [731200, 0.35],
  [Infinity, 0.37],
];

function estimateFederalTax(taxable: number, brackets: [number, number][]) {
  let tax = 0;
  let previousCap = 0;
  for (const [cap, rate] of brackets) {
    if (taxable <= previousCap) break;
    const amountInBracket = Math.min(taxable, cap) - previousCap;
    tax += amountInBracket * rate;
    previousCap = cap;
  }
  return tax;
}

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(75000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);

  const years = Math.max(retireAge - currentAge, 0);
  const projected = futureValue(currentSavings, monthly, years, rate);
  const monthlyIncome = (projected * 0.04) / 12;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="calc-ret-current-age" className="block text-sm font-semibold text-gray-700 mb-1">Current Age</label>
          <input id="calc-ret-current-age" type="number" min={18} max={90} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-ret-retire-age" className="block text-sm font-semibold text-gray-700 mb-1">Retirement Age</label>
          <input id="calc-ret-retire-age" type="number" min={40} max={90} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-ret-savings" className="block text-sm font-semibold text-gray-700 mb-1">Current Savings ($)</label>
          <input id="calc-ret-savings" type="number" min={0} step={1000} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-ret-monthly" className="block text-sm font-semibold text-gray-700 mb-1">Monthly Contribution ($)</label>
          <input id="calc-ret-monthly" type="number" min={0} step={50} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div className="col-span-2">
          <label htmlFor="calc-ret-rate" className="block text-sm font-semibold text-gray-700 mb-1">Expected Annual Return: {rate}%</label>
          <input id="calc-ret-rate" type="range" min={1} max={12} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#fca311]" />
        </div>
      </div>
      <div className="bg-[#14213d] text-white rounded-xl p-6">
        <p className="text-sm text-gray-300 mb-1">Projected savings at age {retireAge} ({years} years of growth)</p>
        <p className="text-4xl font-bold text-[#fca311] mb-4">{formatCurrency(projected)}</p>
        <div className="flex items-center justify-between border-t border-gray-600 pt-4">
          <span className="text-sm text-gray-300">Estimated monthly income (4% rule)</span>
          <span className="text-xl font-bold">{formatCurrency(monthlyIncome)}/mo</span>
        </div>
      </div>
      <p className="text-xs text-gray-500">Hypothetical illustration only. Assumes steady contributions and a constant annual return. Actual results will vary.</p>
    </div>
  );
}

function WithholdingCalculator() {
  const [salary, setSalary] = useState(85000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [payPeriods, setPayPeriods] = useState(26);

  const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
  const taxable = Math.max(salary - standardDeduction, 0);
  const brackets = filingStatus === 'single' ? SINGLE_BRACKETS : MARRIED_BRACKETS;
  const annualTax = estimateFederalTax(taxable, brackets);
  const perPaycheck = payPeriods > 0 ? annualTax / payPeriods : 0;
  const effectiveRate = salary > 0 ? (annualTax / salary) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="calc-wh-salary" className="block text-sm font-semibold text-gray-700 mb-1">Annual Salary ($)</label>
          <input id="calc-wh-salary" type="number" min={0} step={1000} value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-wh-status" className="block text-sm font-semibold text-gray-700 mb-1">Filing Status</label>
          <select id="calc-wh-status" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-wh-frequency" className="block text-sm font-semibold text-gray-700 mb-1">Pay Frequency</label>
          <select id="calc-wh-frequency" value={payPeriods} onChange={(e) => setPayPeriods(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
            <option value={52}>Weekly (52)</option>
            <option value={26}>Biweekly (26)</option>
            <option value={24}>Semi-monthly (24)</option>
            <option value={12}>Monthly (12)</option>
          </select>
        </div>
      </div>
      <div className="bg-[#14213d] text-white rounded-xl p-6">
        <p className="text-sm text-gray-300 mb-1">Suggested federal withholding per paycheck</p>
        <p className="text-4xl font-bold text-[#fca311] mb-4">{formatCurrency(perPaycheck)}</p>
        <div className="grid grid-cols-2 gap-4 border-t border-gray-600 pt-4 text-sm">
          <div>
            <p className="text-gray-300">Estimated annual federal tax</p>
            <p className="text-lg font-bold">{formatCurrency(annualTax)}</p>
          </div>
          <div>
            <p className="text-gray-300">Effective tax rate</p>
            <p className="text-lg font-bold">{effectiveRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">Estimate uses the standard deduction and 2024 federal brackets only. State taxes, credits, and pre-tax benefits are not included.</p>
    </div>
  );
}

function InvestmentCalculator() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(250);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);

  const projected = futureValue(initial, monthly, years, rate);
  const contributions = initial + monthly * 12 * years;
  const growth = Math.max(projected - contributions, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="calc-inv-initial" className="block text-sm font-semibold text-gray-700 mb-1">Initial Investment ($)</label>
          <input id="calc-inv-initial" type="number" min={0} step={500} value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-inv-monthly" className="block text-sm font-semibold text-gray-700 mb-1">Monthly Contribution ($)</label>
          <input id="calc-inv-monthly" type="number" min={0} step={50} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-inv-years" className="block text-sm font-semibold text-gray-700 mb-1">Time Horizon: {years} years</label>
          <input id="calc-inv-years" type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[#fca311] mt-3" />
        </div>
        <div>
          <label htmlFor="calc-inv-rate" className="block text-sm font-semibold text-gray-700 mb-1">Annual Return: {rate}%</label>
          <input id="calc-inv-rate" type="range" min={1} max={12} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#fca311] mt-3" />
        </div>
      </div>
      <div className="bg-[#14213d] text-white rounded-xl p-6">
        <p className="text-sm text-gray-300 mb-1">Projected portfolio value in {years} years</p>
        <p className="text-4xl font-bold text-[#fca311] mb-4">{formatCurrency(projected)}</p>
        <div className="grid grid-cols-2 gap-4 border-t border-gray-600 pt-4 text-sm">
          <div>
            <p className="text-gray-300">Total contributions</p>
            <p className="text-lg font-bold">{formatCurrency(contributions)}</p>
          </div>
          <div>
            <p className="text-gray-300">Investment growth</p>
            <p className="text-lg font-bold text-green-400">{formatCurrency(growth)}</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">Hypothetical illustration assuming a constant annual return with monthly compounding of contributions. Markets fluctuate; actual results will vary.</p>
    </div>
  );
}

function SocialSecurityCalculator() {
  const [income, setIncome] = useState(75000);
  const [claimAge, setClaimAge] = useState(67);

  const monthlyEarnings = Math.min(income, 168600) / 12;
  const basePia =
    0.9 * Math.min(monthlyEarnings, 1174) +
    0.32 * Math.max(Math.min(monthlyEarnings, 7078) - 1174, 0) +
    0.15 * Math.max(monthlyEarnings - 7078, 0);
  const claimFactor = claimAge === 62 ? 0.7 : claimAge === 70 ? 1.24 : 1.0;
  const estimatedBenefit = basePia * claimFactor;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="calc-ss-income" className="block text-sm font-semibold text-gray-700 mb-1">Average Annual Income ($)</label>
          <input id="calc-ss-income" type="number" min={0} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <label htmlFor="calc-ss-age" className="block text-sm font-semibold text-gray-700 mb-1">Claiming Age</label>
          <select id="calc-ss-age" value={claimAge} onChange={(e) => setClaimAge(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
            <option value={62}>62 (early, reduced)</option>
            <option value={67}>67 (full retirement age)</option>
            <option value={70}>70 (delayed, increased)</option>
          </select>
        </div>
      </div>
      <div className="bg-[#14213d] text-white rounded-xl p-6">
        <p className="text-sm text-gray-300 mb-1">Estimated monthly benefit at age {claimAge}</p>
        <p className="text-4xl font-bold text-[#fca311] mb-4">{formatCurrency(estimatedBenefit)}/mo</p>
        <div className="grid grid-cols-3 gap-3 border-t border-gray-600 pt-4 text-center text-sm">
          {[62, 67, 70].map((age) => {
            const factor = age === 62 ? 0.7 : age === 70 ? 1.24 : 1.0;
            return (
              <div key={age} className={`rounded-lg p-2 ${age === claimAge ? 'bg-[#fca311] text-[#14213d] font-bold' : 'bg-[#1a2a4d]'}`}>
                <p className="text-xs opacity-80">Age {age}</p>
                <p className="font-semibold">{formatCurrency(basePia * factor)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-gray-500">Simplified estimate based on 2024 bend points and your stated average income. Your actual benefit depends on your full 35-year earnings record.</p>
    </div>
  );
}

/* ---------- Page ---------- */

export default function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedGuide, setDownloadedGuide] = useState<string | null>(null);
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId | null>(null);
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'tax', name: 'Tax Planning' },
    { id: 'retirement', name: 'Retirement' },
    { id: 'investment', name: 'Investment' },
    { id: 'estate', name: 'Estate Planning' },
  ];

  const guides = [
    {
      title: '2024 Tax Season Checklist',
      category: 'tax',
      description: 'Complete checklist to ensure you have all necessary documents for tax preparation.',
      icon: FileText,
      downloadSize: '2.4 MB PDF',
      featured: true,
      outline: [
        'Gather W-2s, 1099s, and K-1s for all income sources',
        'Collect mortgage interest (Form 1098) and property tax statements',
        'Compile charitable donation receipts and acknowledgment letters',
        'Document HSA, IRA, and 401(k) contributions for the year',
        'List estimated tax payments made each quarter',
        'Review last year\'s return for carryforward items',
      ],
    },
    {
      title: 'Retirement Planning Guide',
      category: 'retirement',
      description: 'Comprehensive guide to planning for a secure and comfortable retirement.',
      icon: Shield,
      downloadSize: '3.1 MB PDF',
      featured: true,
      outline: [
        'Define your target retirement age and lifestyle budget',
        'Calculate your projected income gap after Social Security',
        'Maximize employer match before other savings vehicles',
        'Understand catch-up contribution limits after age 50',
        'Plan healthcare coverage between retirement and Medicare',
        'Build a tax-diversified withdrawal strategy',
      ],
    },
    {
      title: 'Investment Strategy Workbook',
      category: 'investment',
      description: 'Interactive workbook to help you define and execute your investment strategy.',
      icon: TrendingUp,
      downloadSize: '1.8 MB PDF',
      featured: false,
      outline: [
        'Assess your risk tolerance with our 10-question worksheet',
        'Set target asset allocation by account type',
        'Establish rebalancing rules and review cadence',
        'Identify tax-loss harvesting opportunities',
        'Document your investment policy statement',
      ],
    },
    {
      title: 'Estate Planning Essentials',
      category: 'estate',
      description: 'Everything you need to know about protecting your legacy and assets.',
      icon: BookOpen,
      downloadSize: '2.7 MB PDF',
      featured: false,
      outline: [
        'Inventory your assets, debts, and account titling',
        'Review beneficiary designations on all accounts',
        'Understand wills versus revocable living trusts',
        'Prepare powers of attorney and healthcare directives',
        'Plan charitable bequests and gifting strategies',
      ],
    },
    {
      title: 'Tax Deduction Maximizer',
      category: 'tax',
      description: 'Discover often-overlooked deductions to maximize your tax savings.',
      icon: Calculator,
      downloadSize: '1.5 MB PDF',
      featured: false,
      outline: [
        'Home office deduction rules for the self-employed',
        'Vehicle mileage versus actual expense methods',
        'Bunching charitable contributions in alternating years',
        'State and local tax deduction planning',
        'Above-the-line deductions everyone should check',
      ],
    },
    {
      title: 'Social Security Optimization',
      category: 'retirement',
      description: 'Strategic guide to maximizing your Social Security benefits.',
      icon: DollarSign,
      downloadSize: '2.2 MB PDF',
      featured: false,
      outline: [
        'How claiming age changes your monthly benefit',
        'Spousal and survivor benefit coordination',
        'Working while collecting: the earnings test',
        'Taxation of benefits and how to manage it',
        'Break-even analysis for delayed claiming',
      ],
    },
  ];

  const articles = [
    {
      title: '2024 Tax Law Changes: What You Need to Know',
      date: 'November 5, 2024',
      category: 'tax',
      excerpt: 'Stay informed about the latest tax law changes and how they impact your financial planning for 2024 and beyond.',
      readTime: '8 min read',
      author: 'Linda Martinez, CPA',
      body: [
        'Each year brings adjustments to tax brackets, standard deductions, and contribution limits, and 2024 is no exception. Inflation indexing has pushed bracket thresholds higher, which means many taxpayers will see slightly lower effective rates on the same income compared to last year.',
        'Retirement savers get more room as well. Contribution limits for 401(k) plans and IRAs have increased, and workers over 50 should revisit their catch-up contributions to take full advantage. If you are maxing out your employer plan, this is the time to update your payroll elections.',
        'For business owners, the phase-down of bonus depreciation continues, making the timing of equipment purchases more important than in prior years. Section 179 expensing remains a powerful alternative for many small businesses, but the right choice depends on your income picture.',
        'The takeaway: small annual changes compound into real dollars. A mid-year planning review with your advisor catches opportunities that are lost if you wait until filing season.',
      ],
    },
    {
      title: 'The Power of Compound Interest in Retirement Savings',
      date: 'October 28, 2024',
      category: 'retirement',
      excerpt: 'Learn how starting early and staying consistent can dramatically impact your retirement nest egg through compound growth.',
      readTime: '6 min read',
      author: 'David Chen, CFP',
      body: [
        'Compound interest is the engine of long-term wealth. When your returns begin earning returns of their own, growth stops being linear and starts accelerating. The catch is that the biggest gains arrive in the later years, which is why starting early matters so much.',
        'Consider a saver who invests $500 per month starting at age 25 versus one who starts at 35. At a 7 percent average annual return, the early starter can end up with nearly twice the balance at 65, despite contributing only a third more money. The extra decade of compounding does the heavy lifting.',
        'Consistency matters as much as timing. Automatic contributions remove the temptation to pause during market downturns, which historically have been the best times to keep buying.',
        'If you feel behind, do not be discouraged. Higher contribution limits after 50, employer matches, and tax-advantaged accounts all help late starters close the gap. The best day to start compounding was yesterday; the second best is today.',
      ],
    },
    {
      title: 'Diversification Strategies for Uncertain Markets',
      date: 'October 15, 2024',
      category: 'investment',
      excerpt: 'Discover how proper diversification can protect your portfolio during market volatility while positioning you for growth.',
      readTime: '10 min read',
      author: 'David Chen, CFP',
      body: [
        'Diversification is often described as the only free lunch in investing. By holding assets that do not move in lockstep, you can reduce portfolio volatility without necessarily sacrificing long-term return.',
        'True diversification goes beyond owning many stocks. It means spreading exposure across asset classes such as equities, bonds, and real assets, across geographies, and across company sizes and styles. In 2022, investors learned that even stocks and bonds can fall together, which renewed interest in alternatives and short-duration holdings.',
        'Rebalancing is the discipline that makes diversification work. Selling a portion of what has run up and buying what has lagged forces you to buy low and sell high on a schedule, rather than on emotion.',
        'The right mix depends on your time horizon and your capacity to endure drawdowns. A written investment policy, revisited annually, keeps your allocation aligned with your goals rather than the day\'s headlines.',
      ],
    },
    {
      title: 'Year-End Tax Planning Opportunities',
      date: 'October 1, 2024',
      category: 'tax',
      excerpt: 'Strategic moves you can make before December 31st to reduce your tax liability and improve your financial position.',
      readTime: '7 min read',
      author: 'Robert Thompson, CPA, CFP',
      body: [
        'The weeks before December 31 are the last chance to shape this year\'s tax bill. Once the calendar turns, most planning doors close and only filing decisions remain.',
        'Start with income timing. If you expect a lower bracket next year, defer bonuses or invoicing where possible. If rates are headed up for you, accelerating income into this year may actually save money.',
        'On the deduction side, consider bunching charitable gifts into a donor-advised fund, prepaying deductible expenses, and harvesting investment losses to offset realized gains. Retirement plan contributions remain one of the cleanest deductions available; confirm you are on pace to hit the annual limit.',
        'Finally, review required minimum distributions if you are of age, and consider a qualified charitable distribution to satisfy the requirement without adding taxable income. A one-hour year-end review typically pays for itself many times over.',
      ],
    },
    {
      title: 'Roth vs. Traditional IRA: Which is Right for You?',
      date: 'September 20, 2024',
      category: 'retirement',
      excerpt: 'Understanding the key differences between Roth and Traditional IRAs to make the best choice for your situation.',
      readTime: '9 min read',
      author: 'Linda Martinez, CPA',
      body: [
        'The Roth versus Traditional decision comes down to one question: do you expect your tax rate to be higher now, or in retirement? Traditional contributions give you a deduction today and taxable withdrawals later. Roth contributions are taxed today and withdrawn tax-free later.',
        'Early-career savers in lower brackets often benefit from Roth contributions, locking in today\'s low rate on money that may compound for decades. High earners in peak years frequently prefer the immediate deduction of Traditional contributions.',
        'There are second-order benefits, too. Roth accounts have no required minimum distributions during the owner\'s lifetime, making them powerful estate planning tools. Traditional balances can be converted to Roth in low-income years, such as early retirement before Social Security begins.',
        'Many clients end up with both, which creates flexibility to manage taxable income year by year in retirement. The right split is personal, and it is worth an hour with your advisor to get it right.',
      ],
    },
    {
      title: 'Estate Planning Mistakes to Avoid',
      date: 'September 8, 2024',
      category: 'estate',
      excerpt: 'Common estate planning errors that can cost your heirs thousands and how to avoid them with proper planning.',
      readTime: '11 min read',
      author: 'Robert Thompson, CPA, CFP',
      body: [
        'The most common estate planning mistake is having no plan at all. Without a will, state intestacy law decides who inherits, and the result rarely matches what the person would have chosen.',
        'The second most common mistake is stale beneficiary designations. Retirement accounts and life insurance pass by designation, not by will. A forgotten ex-spouse listed on a 401(k) will generally inherit it regardless of what the will says.',
        'Titling errors cause similar problems. Assets held jointly with one child pass to that child alone, even when the intent was to divide equally among several children. Trusts that were drafted but never funded provide no protection at all.',
        'Finally, plans age poorly. Marriages, births, deaths, moves between states, and tax law changes all call for a review. We recommend a full estate plan checkup every three to five years, or after any major life event.',
      ],
    },
  ];

  const calculators: { id: CalculatorId; title: string; description: string; icon: typeof Calculator }[] = [
    {
      id: 'retirement',
      title: 'Retirement Savings Calculator',
      description: 'Estimate how much you need to save for retirement based on your goals.',
      icon: Calculator,
    },
    {
      id: 'withholding',
      title: 'Tax Withholding Estimator',
      description: 'Ensure you\'re withholding the right amount from your paycheck.',
      icon: DollarSign,
    },
    {
      id: 'investment',
      title: 'Investment Return Calculator',
      description: 'Project potential returns based on different investment scenarios.',
      icon: TrendingUp,
    },
    {
      id: 'social-security',
      title: 'Social Security Benefits Estimator',
      description: 'Calculate your estimated Social Security retirement benefits.',
      icon: Shield,
    },
  ];

  const query = searchQuery.trim().toLowerCase();

  const filteredGuides = guides.filter((guide) => {
    const inCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesQuery = !query || guide.title.toLowerCase().includes(query) || guide.description.toLowerCase().includes(query);
    return inCategory && matchesQuery;
  });

  const filteredArticles = articles
    .map((article, index) => ({ article, index }))
    .filter(({ article }) => {
      const inCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesQuery = !query || article.title.toLowerCase().includes(query) || article.excerpt.toLowerCase().includes(query);
      return inCategory && matchesQuery;
    });

  const handleDownloadGuide = (guide: (typeof guides)[number]) => {
    const filename = `${guide.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`;
    const content = [
      'PEAK FINANCIAL ADVISORS',
      guide.title.toUpperCase(),
      '='.repeat(50),
      '',
      guide.description,
      '',
      'KEY STEPS:',
      ...guide.outline.map((item, i) => `  ${i + 1}. ${item}`),
      '',
      '-'.repeat(50),
      'Questions? Call (555) 123-4567 or email info@peakfinancial.com',
      'Peak Financial Advisors, 450 Financial Plaza, Suite 2100, Chicago, IL 60606',
    ].join('\n');
    downloadTextFile(filename, content);
    setDownloadedGuide(guide.title);
    window.setTimeout(() => setDownloadedGuide((current) => (current === guide.title ? null : current)), 2500);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || newsletterStatus === 'sending') return;
    setNewsletterStatus('sending');
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Peak Financial Advisors',
          demoPackage: 'Website Rebuild ($350)',
          demoSlug: 'peak-financial-advisors',
          clientName: '',
          clientPhone: '',
          clientEmail: newsletterEmail,
          service: 'Newsletter Signup',
          preferredDate: '',
          preferredTime: '',
          notes: 'Newsletter subscription from the resources page.',
        }),
      });
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'newsletter_signup', demo_slug: 'peak-financial-advisors' });
        trackConversion('leadForm');
        setNewsletterStatus('sent');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('idle');
      }
    } catch {
      setNewsletterStatus('idle');
    }
  };

  const activeCalc = calculators.find((calc) => calc.id === activeCalculator) ?? null;
  const openArticle = activeArticle !== null ? articles[activeArticle] : null;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Financial Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Free guides, calculators, and expert insights to help you make informed financial decisions
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                aria-label="Search resources"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-900 pl-12 focus:outline-none focus:ring-2 focus:ring-[#fca311]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {query && (
              <p className="text-sm text-gray-300 mt-3">
                Showing {filteredGuides.length} guide{filteredGuides.length === 1 ? '' : 's'} and {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 px-4 border-b-2 border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#14213d] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#14213d]">Downloadable Guides</h2>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg">
              <Search className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-xl font-semibold text-[#14213d] mb-2">No guides match your search</p>
              <p className="text-gray-600">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => {
                const Icon = guide.icon;
                const justDownloaded = downloadedGuide === guide.title;
                return (
                  <div
                    key={guide.title}
                    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                      guide.featured ? 'border-2 border-[#fca311]' : ''
                    }`}
                  >
                    {guide.featured && (
                      <div className="bg-[#fca311] text-[#14213d] text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                        FEATURED
                      </div>
                    )}
                    <div className="w-16 h-16 bg-[#14213d] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-[#fca311]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#14213d] mb-3">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{guide.downloadSize}</span>
                      <button
                        onClick={() => handleDownloadGuide(guide)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                          justDownloaded
                            ? 'bg-green-600 text-white'
                            : 'bg-[#14213d] text-white hover:bg-[#1a2a4d]'
                        }`}
                      >
                        {justDownloaded ? <CheckCircle size={18} /> : <Download size={18} />}
                        {justDownloaded ? 'Saved' : 'Download'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Financial Calculators */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#14213d] mb-4">Financial Calculators</h2>
            <p className="text-lg text-gray-600">Interactive tools to help plan your financial future</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-6 transition-transform hover:scale-[1.02] text-left"
                >
                  <div className="w-14 h-14 bg-[#fca311] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#14213d]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{calc.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{calc.description}</p>
                  <span className="text-[#fca311] font-semibold flex items-center gap-2">
                    Try It Now <ChevronRight size={18} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#14213d]">Latest Articles</h2>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ChevronRight size={20} />
            </button>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg">
              <Search className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-xl font-semibold text-[#14213d] mb-2">No articles match your search</p>
              <p className="text-gray-600">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(({ article, index }) => (
                <div key={article.title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#fca311] text-[#14213d] text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {article.category}
                    </div>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <button
                    onClick={() => setActiveArticle(index)}
                    className="text-left text-xl font-bold text-[#14213d] mb-3 hover:text-[#fca311] transition-colors"
                  >
                    {article.title}
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button
                    onClick={() => setActiveArticle(index)}
                    className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read More <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for monthly financial tips, tax updates, and exclusive insights.
          </p>
          {newsletterStatus === 'sent' ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 max-w-2xl mx-auto text-left flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-1">You&rsquo;re subscribed!</h3>
                <p className="text-green-800">
                  Welcome to the Peak Financial newsletter. Your first monthly briefing will arrive in your inbox soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                aria-label="Email address for newsletter"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fca311]"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'sending'}
                className="bg-[#fca311] text-[#14213d] px-8 py-4 rounded-lg font-semibold hover:bg-[#e59400] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {newsletterStatus === 'sending' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          )}
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#14213d] mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our financial advisors are ready to help you create a customized strategy for your unique situation.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#14213d] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#1a2a4d] transition-colors"
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* Calculator Modal */}
      {activeCalc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close calculator"
            onClick={() => setActiveCalculator(null)}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#14213d] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center">
                  <activeCalc.icon className="text-[#14213d]" size={20} />
                </div>
                <h2 className="text-lg font-bold">{activeCalc.title}</h2>
              </div>
              <button onClick={() => setActiveCalculator(null)} aria-label="Close" className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {activeCalculator === 'retirement' && <RetirementCalculator />}
              {activeCalculator === 'withholding' && <WithholdingCalculator />}
              {activeCalculator === 'investment' && <InvestmentCalculator />}
              {activeCalculator === 'social-security' && <SocialSecurityCalculator />}
              <button
                onClick={() => {
                  setActiveCalculator(null);
                  onNavigate('contact');
                }}
                className="w-full mt-5 bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors"
              >
                Review These Numbers With an Advisor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {openArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close article"
            onClick={() => setActiveArticle(null)}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#14213d] text-white px-8 py-5 flex items-start justify-between rounded-t-2xl gap-4 z-10">
              <div>
                <div className="bg-[#fca311] text-[#14213d] text-xs font-bold px-3 py-1 rounded-full uppercase inline-block mb-2">
                  {openArticle.category}
                </div>
                <h2 className="text-xl font-bold leading-snug">{openArticle.title}</h2>
                <p className="text-xs text-gray-300 mt-1">
                  {openArticle.author} • {openArticle.date} • {openArticle.readTime}
                </p>
              </div>
              <button onClick={() => setActiveArticle(null)} aria-label="Close" className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors flex-shrink-0">
                <X size={20} />
              </button>
            </div>
            <div className="px-8 py-6">
              {openArticle.body.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              <div className="mt-6 bg-gray-50 border-2 border-[#e5e5e5] rounded-xl p-6 text-center">
                <p className="font-semibold text-[#14213d] mb-3">Want to apply this to your own finances?</p>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('contact');
                  }}
                  className="bg-[#14213d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors"
                >
                  Schedule a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
