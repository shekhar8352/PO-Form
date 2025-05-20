import "./App.css";

function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <h1>Marsh McLennan</h1>
        </div>

        <div className="header-center">
          <h1>Smart Source</h1>

          <p>Global Buying Desk</p>
        </div>

        <div className="header-right">
          <span className="user-name">username</span>
        </div>
      </header>
    </>
  );
}

export default Header;
