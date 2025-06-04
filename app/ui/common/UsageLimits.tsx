import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Clock, Zap, FileText, Code } from 'lucide-react';

const UsageLimits: React.FC = () => {
  const { user, getRemainingUsage } = useAuth();

  if (!user || user.subscriptionType !== 'free') {
    return null;
  }

  const features = [
    {
      key: 'aiRequests' as const,
      name: 'Consultas IA',
      icon: Zap,
      color: 'text-blue-500'
    },
    {
      key: 'promptsUsed' as const,
      name: 'Prompts Usados',
      icon: FileText,
      color: 'text-green-500'
    },
    {
      key: 'scriptsGenerated' as const,
      name: 'Scripts Generados',
      icon: Code,
      color: 'text-purple-500'
    }
  ];

  const getUsagePercentage = (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    const limit = user.dailyLimits[feature];
    const remaining = getRemainingUsage(feature);
    const used = limit - remaining;
    return (used / limit) * 100;
  };

  const isNewDay = () => {
    const today = new Date().toISOString().split('T')[0];
    return user.dailyUsage.date !== today;
  };

  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          Uso Diario - Plan Gratuito
        </CardTitle>
        {!isNewDay() && (
          <p className="text-sm text-muted-foreground">
            Se reinicia en: {getTimeUntilReset()}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => {
          const remaining = getRemainingUsage(feature.key);
          const limit = user.dailyLimits[feature.key];
          const used = limit - remaining;
          const percentage = getUsagePercentage(feature.key);
          const Icon = feature.icon;
          
          return (
            <div key={feature.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {used}/{limit}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
              {remaining <= 2 && remaining > 0 && (
                <p className="text-xs text-yellow-600">
                  ⚠️ Te quedan {remaining} usos
                </p>
              )}
              {remaining === 0 && (
                <p className="text-xs text-red-500">
                  Límite alcanzado. Se reinicia mañana.
                </p>
              )}
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            ¿Necesitas más? 
            <a href="/pricing" className="text-primary hover:underline ml-1">
              Actualiza a Pro
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageLimits;