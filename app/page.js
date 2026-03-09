import "./stylesheet.css";

export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="header-top">
          <div className="logo">Arshad & Rewano</div>

          <button className="menu-button" aria-label="Menü öffnen">
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="header-title">
          <h1>HERRENSALON</h1>
        </div>
      </header>
    </main>
  );
}