export const products = {
  redCreativaPro: {
    priceId: 'price_trial',
    mode: 'subscription' as const,
    trialDays: 14,
  },
  redCreativaProMonthly: {
    priceId: 'price_1OyKLGHYNXVrZvHHFPVFGgWq',
    mode: 'subscription' as const,
    trialDays: undefined,
  },
  redCreativaProAnnual: {
    priceId: 'price_1OyKLGHYNXVrZvHHmQxhWqL9',
    mode: 'subscription' as const,
    trialDays: undefined,
  },
} as const;