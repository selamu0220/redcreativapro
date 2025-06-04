import { AIProvider, AIModel, AISettings } from "../types\ai";



export async function generateScriptWithAI(
  prompt: string, 
  provider?: AIProvider, 
  apiKey?: string,
  model?: AIModel,
  temperature?: number,
  maxTokens?: number,
  baseUrl?: string
): Promise<string> {
  
  // Get stored AI settings if not provided
  if (!apiKey || !provider) {
    const storedSettings = localStorage.getItem('aiSettings');
    if (storedSettings) {
      const settings: AISettings = JSON.parse(storedSettings);
      provider = provider || settings.provider;
      apiKey = apiKey || settings.apiKey;
      model = model || settings.model;
      temperature = temperature ?? settings.temperature;
      maxTokens = maxTokens ?? settings.maxTokens;
      baseUrl = baseUrl || settings.baseUrl;
    }
  }

  if (!provider) {
    throw new Error('Se requiere seleccionar un proveedor de IA. Por favor configura tus ajustes de IA en el menÃº de usuario.');
  }

  if (!apiKey) {
    throw new Error('Se requiere una API key. Por favor configura tus ajustes de IA en el menÃº de usuario.');
  }

  // Validate API key format before making request
  if (typeof apiKey !== 'string' || !apiKey.trim()) {
    localStorage.removeItem('aiSettings'); // Clear invalid settings
    throw new Error('API key invÃ¡lida. Por favor verifica que hayas ingresado una API key vÃ¡lida en los ajustes de usuario.');
  }

  // Trim the API key to prevent whitespace issues
  apiKey = apiKey.trim();

  try {
    switch (provider) {
      case 'gemini': {
        // Default to gemini-2.0-flash if no model specified
        const selectedModel = model || 'gemini-2.0-flash';
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: temperature || 0.7,
              maxOutputTokens: maxTokens || 2048
            }
          })
        });
        
        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: { message: 'Error desconocido' } }));
          if (response.status === 401) {
            localStorage.removeItem('aiSettings'); // Clear invalid settings
            throw new Error(`La API key de Google AI Studio no es vÃ¡lida para el modelo ${selectedModel}. Por favor, verifica que la API key tenga los permisos necesarios.`);
          }
          throw new Error(`Error de Gemini: ${error.error?.message || 'No se pudo generar el contenido'}`);
        }
        
        const data = await response.json();
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error('No se recibiÃ³ una respuesta vÃ¡lida del servicio de IA');
        }
        return data.candidates[0].content.parts[0].text;
      }

      case 'openai': {
        const selectedModel = model || 'gpt-4o';
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [{ role: 'user', content: prompt }],
            temperature: temperature || 0.7,
            max_tokens: maxTokens || 2048
          })
        });
        
        if (!openaiResponse.ok) {
          const error = await openaiResponse.json().catch(() => ({ error: { message: 'Error desconocido' } }));
          if (openaiResponse.status === 401) {
            localStorage.removeItem('aiSettings');
            throw new Error('API key invÃ¡lida. Por favor verifica tu API key de OpenAI en los ajustes de usuario.');
          }
          throw new Error(`Error de OpenAI: ${error.error?.message || 'No se pudo generar el contenido'}`);
        }
        
        const openaiData = await openaiResponse.json();
        return openaiData.choices[0].message.content;
      }

      case 'anthropic': {
        const selectedModel = model || 'claude-3-5-sonnet-20241022';
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens || 2048,
            temperature: temperature || 0.7
          })
        });
        
        if (!anthropicResponse.ok) {
          const error = await anthropicResponse.json().catch(() => ({ error: { message: 'Error desconocido' } }));
          if (anthropicResponse.status === 401) {
            localStorage.removeItem('aiSettings');
            throw new Error('API key invÃ¡lida. Por favor verifica tu API key de Anthropic en los ajustes de usuario.');
          }
          throw new Error(`Error de Anthropic: ${error.error?.message || 'No se pudo generar el contenido'}`);
        }
        
        const anthropicData = await anthropicResponse.json();
        return anthropicData.content[0].text;
      }

      case 'cohere': {
        const selectedModel = model || 'command-r-plus';
        const apiUrl = baseUrl || 'https://api.cohere.ai/v1/generate';
        
        const cohereResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: selectedModel,
            prompt: prompt,
            max_tokens: maxTokens || 2048,
            temperature: temperature || 0.7
          })
        });
        
        if (!cohereResponse.ok) {
          const error = await cohereResponse.json().catch(() => ({ message: 'Error desconocido' }));
          if (cohereResponse.status === 401) {
            localStorage.removeItem('aiSettings');
            throw new Error('API key invÃ¡lida. Por favor verifica tu API key de Cohere en los ajustes de usuario.');
          }
          throw new Error(`Error de Cohere: ${error.message || 'No se pudo generar el contenido'}`);
        }
        
        const cohereData = await cohereResponse.json();
        return cohereData.generations[0].text;
      }

      case 'mistral': {
        const selectedModel = model || 'mistral-large-latest';
        const apiUrl = baseUrl || 'https://api.mistral.ai/v1/chat/completions';
        
        const mistralResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens || 2048,
            temperature: temperature || 0.7
          })
        });
        
        if (!mistralResponse.ok) {
          const error = await mistralResponse.json().catch(() => ({ error: { message: 'Error desconocido' } }));
          if (mistralResponse.status === 401) {
            localStorage.removeItem('aiSettings');
            throw new Error('API key invÃ¡lida. Por favor verifica tu API key de Mistral en los ajustes de usuario.');
          }
          throw new Error(`Error de Mistral: ${error.error?.message || 'No se pudo generar el contenido'}`);
        }
        
        const mistralData = await mistralResponse.json();
        return mistralData.choices[0].message.content;
      }

      default:
        throw new Error('Proveedor de IA no soportado');
    }
  } catch (error: any) {
    console.error('Error en generateScriptWithAI:', error);
    if (error.message.includes('API key')) {
      throw error;
    }
    throw new Error(`Error al conectar con el servicio de IA: ${error.message}. Por favor verifica tu API key e intÃ©ntalo de nuevo.`);
  }
}

export async function enhanceSearchWithAI(query: string): Promise<string[]> {
  try {
    const storedSettings = localStorage.getItem('aiSettings');
    if (!storedSettings) {
      throw new Error('Para obtener sugerencias de IA, configura tus ajustes en el menÃº de usuario (Ã­cono de perfil â†’ Ajustes)');
    }

    const settings = JSON.parse(storedSettings);
    const { provider, apiKey, model } = settings;

    if (!provider || !apiKey) {
      throw new Error('Para obtener sugerencias de IA, configura el proveedor y API key en el menÃº de usuario (Ã­cono de perfil â†’ Ajustes)');
    }

    const prompt = `Analiza esta bÃºsqueda: "${query}"
    1. Extrae conceptos clave y tÃ©rminos relacionados
    2. Identifica sinÃ³nimos y temas relacionados
    3. Devuelve una lista de tÃ©rminos relevantes para la bÃºsqueda
    Formato: lista de tÃ©rminos separados por comas, mÃ¡ximo 5 tÃ©rminos.
    Respuesta en espaÃ±ol.`;

    const response = await generateScriptWithAI(prompt, provider, apiKey, model);
    const terms = response.split(',')
      .map(term => term.trim())
      .filter(Boolean)
      .slice(0, 5);

    if (terms.length === 0) {
      throw new Error('No se pudieron generar sugerencias para esta bÃºsqueda');
    }

    return terms;
  } catch (error: any) {
    console.error('Error al mejorar la bÃºsqueda:', error);
    throw error;
  }
}
