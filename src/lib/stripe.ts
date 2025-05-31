import { products } from '@/stripe-config';

export async function redirectToCheckout(productKey: keyof typeof products) {
  const product = products[productKey];
  if (!product) {
    throw new Error('Plan no válido');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        price_id: product.priceId,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/pricing`,
        mode: product.mode,
        trial_period_days: product.trialDays,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || 'Error al procesar el pago';
      } catch {
        errorMessage = 'Error al conectar con el servidor';
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.url) {
      throw new Error('No se recibió la URL de pago');
    }

    window.location.href = data.url;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}