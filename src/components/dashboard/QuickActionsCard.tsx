import type { LucideIcon } from 'lucide-react';
import './QuickActionsCard.css';

type QuickActionItem = {
  icon: LucideIcon;
  label: string;
};

type QuickActionsCardProps = {
  quickActions: QuickActionItem[];
};

function QuickActionsCard({ quickActions }: QuickActionsCardProps) {
  return (
    <section className="card quick-card">
      <div className="section-head">
        <div>
          <h2>Accesos Rápidos</h2>
          <p>Atajos del operador</p>
        </div>
      </div>

      <div className="quick-grid">
        {quickActions.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="quick-item">
              <div className="quick-icon">
                <Icon size={18} />
              </div>
              <div className="quick-label">{item.label}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActionsCard;
