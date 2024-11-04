"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Check, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { pricingPlans } from '@/components/pricingConfig'; // Import pricing plans

const features = {
  starter: [
    'Up to 50 employees',
    'Single location access',
    'Customizable Leaderboards, Achievements, and Training',
    'Customizable Rewards Marketplace',
    'Up to 1 admin account',
    'Up to 3 manager accounts',
    'Standard analytics dashboard',
    'Praxis branding',
  ],
  growth: [
    'Up to 200 employees',
    'Customizable Leaderboards, Achievements, and Training',
    'Customizable Rewards Marketplace',
    'Up to 3 locations',
    'Up to 3 admins accounts',
    'Up to 5 manager accounts',
    'PDF Exportable advanced analytics dashboard',
    'Custom brand colors with Praxis branding',
  ],
  enterprise: [
    'Scalable employee count',
    'Customizable Leaderboards, Achievements, and Training',
    'Customizable Rewards Marketplace',
    'Scalable admin accounts, manager accounts, and locations',
    'Dedicated success manager',
    'Multi-exportable analytics dashboard',
    'Completely private label',
  ],
};

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with employee recognition',
      monthlyPrice: pricingPlans.starter.monthly,
      annualPrice: pricingPlans.starter.annual,
      features: features.starter,
      badge: '',
    },
    {
      name: 'Growth',
      description: 'Ideal for growing companies focused on culture and engagement',
      monthlyPrice: pricingPlans.growth.monthly,
      annualPrice: pricingPlans.growth.annual,
      features: features.growth,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      description: 'Advanced features and support for large organizations',
      price: 'Custom',
      features: features.enterprise,
      badge: 'Custom',
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={!isAnnual ? 'text-primary' : 'text-muted-foreground'}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={isAnnual ? 'text-primary' : 'text-muted-foreground'}>
              Annual
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="relative p-8">
              {plan.badge && (
                <Badge
                  className="absolute top-4 right-4"
                  variant={plan.badge === 'Most Popular' ? 'default' : 'secondary'}
                >
                  {plan.badge}
                </Badge>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mb-8">
                {plan.price === 'Custom' ? (
                  <div className="text-4xl font-bold">{plan.price}</div>
                ) : (
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        ${isAnnual ? plan.annualPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        per employee / {isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (~$
                      {(
                        (isAnnual ? plan.annualPrice : plan.monthlyPrice) /
                        (isAnnual ? 2087 : 160)
                      ).toFixed(2)}{' '}
                      per full-time hour)
                    </span>
                  </div>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={index === 1 ? 'default' : 'outline'}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need help choosing the right plan?
          </p>
          <Button variant="outline" asChild>
            <a href="#contact">
              Talk to Sales
              <HelpCircle className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
