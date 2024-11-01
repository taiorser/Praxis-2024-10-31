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

const features = {
  starter: [
    'Up to 50 employees',
    'Basic recognition tools',
    'Standard leaderboards',
    'Email support',
    'Basic analytics',
  ],
  growth: [
    'Up to 200 employees',
    'Advanced recognition system',
    'Custom rewards marketplace',
    'Priority support',
    'Advanced analytics',
    'API access',
    'Custom integrations',
  ],
  enterprise: [
    'Unlimited employees',
    'White-label solution',
    'Custom gamification',
    'Dedicated success manager',
    'Enterprise SSO',
    'Advanced security',
    'Custom contracts',
    'SLA guarantees',
  ],
};

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with employee recognition',
      price: isAnnual ? 99 : 12,
      features: features.starter,
      badge: '',
    },
    {
      name: 'Growth',
      description: 'Ideal for growing companies focused on culture and engagement',
      price: isAnnual ? 299 : 29,
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
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
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
                {typeof plan.price === 'number' ? (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold">{plan.price}</div>
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