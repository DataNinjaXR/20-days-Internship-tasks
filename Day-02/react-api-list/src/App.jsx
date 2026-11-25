
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load users. Please try again.");
        }

        const data = await response.json();
        setUsers(data);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    const valid = /^[a-zA-Z\s'-]*$/.test(value);

    if (!valid) {
      setSearchError(
        "Please use only letters, spaces, hyphens and apostrophes."
      );
    } else {
      setSearchError("");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const colors = [
    "avatar-purple",
    "avatar-blue",
    "avatar-pink",
    "avatar-green",
    "avatar-orange",
    "avatar-cyan",
  ];

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
            <span>Directory Dashboard</span>
          </div>
        </div>
      </nav>

      <main className="main-container">

        <section className="hero">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot"></span>
              PEOPLE MANAGEMENT
            </span>

            <h1>
              Your people,<br />
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
            <div className="stat-icon purple-icon">👥</div>
            <div>
              <p>Total Members</p>
              <h2>{loading ? "--" : users.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue-icon">🔎</div>
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
                {loading ? "Loading" : error ? "Offline" : "Connected"}
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
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search users by name"
            />

            {search && (
              <button
                className="clear-button"
                onClick={() => handleSearch("")}
                type="button"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {searchError && (
            <div className="message validation-message">
              ⚠ {searchError}
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

          {!loading && error && (
            <div className="empty-state">
              <div className="empty-icon">!</div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && !searchError &&
            filteredUsers.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>
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

          {!loading && !error && !searchError &&
            filteredUsers.length > 0 && (
              <div className="user-grid">
                {filteredUsers.map((user, index) => (
                  <div className="user-card" key={user.id}>
                    <div className="card-top">
                      <div className={`avatar ${colors[index % colors.length]}`}>
                        {getInitials(user.name)}
                      </div>

                      <span className="member-status">
                        <span></span> Active
                      </span>
                    </div>

                    <div className="user-details">
                      <h3>{user.name}</h3>
                      <p className="username">@{user.username}</p>

                      <div className="email-row">
                        <span>✉</span>
                        <span>{user.email}</span>
                      </div>

                      <div className="card-divider"></div>

                      <div className="user-footer">
                        <span>Member ID</span>
                        <strong>#{String(user.id).padStart(3, "0")}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          )}
        </section>

        <footer className="footer">
          <p>© 2026 UserSpace. Built with React.</p>
          <p>Powered by JSONPlaceholder API</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
