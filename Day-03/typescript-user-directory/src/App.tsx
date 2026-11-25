import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import "./App.css";

import UserCard from "./components/UserCard";

import type {
  User,
  ApiStatus,
  AvatarColorClass
} from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<ApiStatus>("loading");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const colors: AvatarColorClass[] = [
    "avatar-purple",
    "avatar-blue",
    "avatar-pink",
    "avatar-green",
    "avatar-orange",
    "avatar-cyan"
  ];

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers(): Promise<void> {
      try {
        setStatus("loading");
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load users. Please try again.");
        }

        const data: User[] = await response.json();

        if (controller.signal.aborted) return;

        setUsers(data);
        setStatus(data.length === 0 ? "empty" : "success");
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred."
        );

        setStatus("error");
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, [retryCount]);

  const handleSearch = (value: string): void => {
    setSearch(value);

    if (!/^[a-zA-Z\s'-]*$/.test(value)) {
      setSearchError(
        "Please use only letters, spaces, hyphens and apostrophes."
      );
    } else {
      setSearchError("");
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    handleSearch(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const loading = status === "loading";

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="brand">
            <div className="brand-icon">U</div>
            <span>UserSpace</span>
          </div>

          <div className="nav-right">
            <span className="online-dot"></span>
            Directory Dashboard
          </div>
        </div>
      </nav>

      <main className="main-container">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-dot"></span>
              PEOPLE MANAGEMENT
            </span>

            <h1>
              Your people,
              <br />
              <span>all in one place.</span>
            </h1>

            <p className="hero-description">
              Discover, search and explore your team members
              with a simple and beautiful directory.
            </p>
          </div>

          <div className="hero-decoration">
            <div className="hero-circle circle-one"></div>
            <div className="hero-circle circle-two"></div>
            <div className="hero-circle circle-three"></div>
            <div className="hero-letter">U</div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple-icon">US</div>
            <div>
              <p>Total Members</p>
              <h2>{loading ? "--" : users.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue-icon">S</div>
            <div>
              <p>Search Results</p>
              <h2>
                {loading || searchError ? "--" : filteredUsers.length}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green-icon">✓</div>
            <div>
              <p>API Status</p>
              <h2 className="status-text">
                {loading
                  ? "Loading"
                  : status === "error"
                    ? "Offline"
                    : "Connected"}
              </h2>
            </div>
          </div>
        </section>

        <section className="directory-section">
          <div className="section-heading">
            <div>
              <span className="section-label">DIRECTORY</span>
              <h2>Meet the members</h2>
              <p>Find the person you're looking for.</p>
            </div>

            <span className="member-badge">
              {loading ? "Loading..." : `${filteredUsers.length} Members`}
            </span>
          </div>

          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by member name..."
              value={search}
              maxLength={50}
              onChange={handleInputChange}
              aria-label="Search users by name"
            />

            {search && (
              <button
                className="clear-button"
                onClick={() => handleSearch("")}
                type="button"
                aria-label="Clear search"
              >
                X
              </button>
            )}
          </div>

          {searchError && (
            <div className="message validation-message">
              {searchError}
            </div>
          )}

          {loading && (
            <div className="user-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="skeleton-card" key={item}>
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-lines">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="empty-state">
              <div className="empty-icon">!</div>
              <h3>Something went wrong</h3>
              <p>{error}</p>

              <button
                className="retry-button"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Try Again
              </button>
            </div>
          )}

          {status === "empty" && (
            <div className="empty-state">
              <div className="empty-icon">!</div>
              <h3>No members available</h3>
              <p>The API returned no users.</p>
            </div>
          )}

          {status === "success" &&
            !searchError &&
            filteredUsers.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">?</div>
                <h3>No members found</h3>
                <p>
                  We couldn't find anyone matching "{search}".
                  Try another name.
                </p>

                <button
                  className="retry-button"
                  onClick={() => handleSearch("")}
                >
                  Clear Search
                </button>
              </div>
            )}

          {status === "success" &&
            !searchError &&
            filteredUsers.length > 0 && (
              <div className="user-grid">
                {filteredUsers.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    colorClass={colors[index % colors.length] ?? "avatar-purple"}
                  />
                ))}
              </div>
            )}
        </section>

        <footer className="footer">
          <p>© 2026 UserSpace. Built with React and TypeScript.</p>
          <p>Powered by JSONPlaceholder API</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
