import { Link } from 'react-router-dom';
import '../index.css';

export default function LandingSection() {
  return (
    <section className="landing-hero p-5">
      <div className="container">
        {/* Title aligned to the left */}
        <h1 className="titles text-start mb-4">Discover. Share. Binge.</h1>

        {/* Buttons aligned left, stacked on small screens, side-by-side on md+ */}
        <div className="d-flex flex-column flex-md-row align-items-start gap-3 mt-3">
          <Link className="btn" id="btn2" to="/register">Join Now!</Link>
        </div>
      </div>
    </section>
  );
}
