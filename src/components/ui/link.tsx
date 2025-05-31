import * as React from 'react';
import { cn } from '@/lib/utils';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        'cursor-pointer text-primary underline-offset-4 hover:underline',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});
Link.displayName = 'Link';

export { Link };