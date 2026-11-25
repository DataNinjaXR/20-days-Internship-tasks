import type { User, AvatarColorClass } from "../types";

interface UserCardProps {
  user: User;
  colorClass: AvatarColorClass;
}

function UserCard({ user, colorClass }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className="user-card">
      <div className="card-top">
        <div className={`avatar ${colorClass}`}>
          {initials}
        </div>

        <span className="member-status">
          <span className="status-dot"></span>
          Active
        </span>
      </div>

      <div className="user-details">
        <h3>{user.name}</h3>
        <p className="username">@{user.username}</p>

        <div className="email-row">
          <span className="email-icon">@</span>
          <span>{user.email}</span>
        </div>

        <div className="card-divider"></div>

        <div className="user-footer">
          <span>Member ID</span>
          <strong>#{String(user.id).padStart(3, "0")}</strong>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
