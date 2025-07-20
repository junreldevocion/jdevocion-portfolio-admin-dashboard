import { ClassNameValue, twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  title: string;
  className?: ClassNameValue;
}

const CardRoot = ({ children, className = '' }: CardProps) => {
  return (
    <div className={twMerge('bg-white border border-indigo-50 rounded-2xl shadow-lg p-6', className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  className?: ClassNameValue;
}

const CardHeader = ({ title, className = '' }: CardHeaderProps) => {
  return (
    <h2 className={twMerge('text-xl font-semibold mb-4 border-b border-indigo-50', className)}>
      {title}
    </h2>
  );
};

interface CardBodyProps {
  children: React.ReactNode,
  className?: ClassNameValue
}

const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={twMerge(className)}>{children}</div>;
};

export const Card = Object.assign(CardRoot, {
  header: CardHeader,
  body: CardBody
});