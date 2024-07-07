const Home = () => {
  return (
    <div>
      <header>
        <div className="logo">STRIVE</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="hero">
        <h1>Achieve More with STRIVE</h1>
        <p>Balance your work and health seamlessly.</p>
        <button>Get Started</button>
      </section>

      <section id="features">
        <h2>Features</h2>
        <div className="feature">
          <i className="icon">🏆</i>
          <h3>Track your goals</h3>
          <p>Keep track of your achievements and stay motivated.</p>
        </div>
        <div className="feature">
          <i className="icon">⏰</i>
          <h3>Optimize your time</h3>
          <p>Manage your time efficiently and boost productivity.</p>
        </div>
        <div className="feature">
          <i className="icon">💪</i>
          <h3>Stay healthy</h3>
          <p>Maintain a healthy lifestyle while working hard.</p>
        </div>
      </section>

      <section id="pricing">
        <h2>Pricing</h2>
        <div className="pricing-plan">
          <h3>Basic</h3>
          <p>$9.99/month</p>
          <p>Essential features to get started.</p>
        </div>
        <div className="pricing-plan">
          <h3>Pro</h3>
          <p>$19.99/month</p>
          <p>Advanced features for professionals.</p>
        </div>
        <div className="pricing-plan">
          <h3>Enterprise</h3>
          <p>$29.99/month</p>
          <p>All features for large teams.</p>
        </div>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>Our mission is to help developers achieve their goals without sacrificing their health.</p>
        <div className="team">
          <div className="team-member">
            <img src="team1.jpg" alt="Team Member 1"/>
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="team2.jpg" alt="Team Member 2"/>
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Name" required/>
          <input type="email" placeholder="Email" required/>
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </section>

      <footer>
        <ul>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
        <p>© 2024 STRIVE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;