export interface Tier {
    name: string;
    id: 'core' | 'elite';
    scale: number;
    description: string;
    features: string[];
    priceId: Record<string, string>;
  }
  
  export const PricingTier: Tier[] = [
    {
      name: 'LF Core ⚡',
      id: 'core',
      scale: 0.95,
      description: 'Ideal for individuals who want to get started with simple design tasks.',
      features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
      priceId: { month: 'pri_01jmkchaz4z34135mqy9wfbx6w', year: 'pri_01jmkcm4qxqbkgxwgxwn818nd7' },
    },
    {
      name: 'LF Elite ✨',
      id: 'elite',
      scale: 1,
      description: 'Enhanced design tools for scaling teams who need more flexibility.',
      features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
      priceId: { month: 'pri_01jmkcrmhx2j7net3w3znnp0yy', year: 'pri_01jmkctc6nq4ny9k59ye4p5ndz', lifetime: 'pri_01jmkcvr46znza92js4kamddvk' },
    },
  ];