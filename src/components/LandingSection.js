import { Link } from 'react-router-dom';

// css
import '../index.css'

export default function LandingSection() {
  return (
    <>
<section className="landing-hero">
  <div className="overlay-content">
    <div className="d-flex">
      <h1 className="titles text-start">Binge. Discover. Repeat.</h1>
    </div>

    <div className="d-flex justify-content-center gap-3 mt-5">
      <Link className="btn" id="btn1" to="/products"></Link>
      <Link className="btn" id="btn2" to="/register">Sign Up to Stream Now!</Link>
    </div>
  </div>
</section>




    </>

  )
}