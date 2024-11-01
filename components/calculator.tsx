"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calculator as CalculatorIcon, DollarSign, Users, TrendingUp } from 'lucide-react';

export function Calculator() {
  const [employees, setEmployees] = useState('100');
  const [avgSalary, setAvgSalary] = useState('60000');
  const [turnover, setTurnover] = useState('15');

  const calculateROI = () => {
    const numEmployees = parseInt(employees);
    const salary = parseInt(avgSalary);
    const turnoverRate = parseInt(turnover) / 100;

    // Estimated costs and benefits
    const currentTurnoverCost = numEmployees * salary * turnoverRate * 1.5;
    const expectedTurnoverReduction = 0.4; // 40% reduction
    const productivityIncrease = 0.15; // 15% increase
    
    const savings = {
      turnover: currentTurnoverCost * expectedTurnoverReduction,
      productivity: numEmployees * salary * productivityIncrease,
      engagement: numEmployees * 500, // Estimated engagement benefits per employee
    };

    const totalAnnualBenefit = Object.values(savings).reduce((a, b) => a + b, 0);
    const platformCost = numEmployees * 100; // Estimated annual platform cost per employee
    const netBenefit = totalAnnualBenefit - platformCost;
    const roi = (netBenefit / platformCost) * 100;

    return {
      savings,
      totalAnnualBenefit,
      platformCost,
      netBenefit,
      roi,
    };
  };

  const results = calculateROI();

  return (
    <section id="calculator" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-lg text-muted-foreground">
              See how much your organization could save with Praxis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="employees" className="text-sm font-medium">
                    Number of Employees
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="employees"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(e.target.value)}
                      className="pl-10"
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="salary" className="text-sm font-medium">
                    Average Annual Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="salary"
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(e.target.value)}
                      className="pl-10"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="turnover" className="text-sm font-medium">
                    Current Turnover Rate (%)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="turnover"
                      type="number"
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      className="pl-10"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <CalculatorIcon className="h-8 w-8" />
                  <h3 className="text-xl font-semibold">Estimated Annual ROI</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm opacity-90">Turnover Cost Savings</div>
                    <div className="text-2xl font-bold">
                      ${results.savings.turnover.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm opacity-90">Productivity Gains</div>
                    <div className="text-2xl font-bold">
                      ${results.savings.productivity.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm opacity-90">Engagement Benefits</div>
                    <div className="text-2xl font-bold">
                      ${results.savings.engagement.toLocaleString()}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary-foreground/20">
                    <div className="text-sm opacity-90">Total Annual Benefit</div>
                    <div className="text-3xl font-bold">
                      ${results.totalAnnualBenefit.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm opacity-90">ROI</div>
                    <div className="text-3xl font-bold">
                      {results.roi.toFixed(0)}%
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.location.href = '#contact'}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}