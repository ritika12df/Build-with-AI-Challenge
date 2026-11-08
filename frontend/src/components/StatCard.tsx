
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;
