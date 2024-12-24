import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptworld",
  description: "Discover and share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div>
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <p
          style={{
            marginTop: "auto",
            textAlign: "center",
            color: "var(--color-light--1)",
          }}
        >
          &copy;
          <a
            className="twitter-link cursor-pointer"
            target="_blank"
            href="https://my-portfolio-bala.vercel.app/"
          >
            <b>Bala.E</b>
          </a>
          . Done in India with love ♥.
        </p>
      </body>
    </html>
  );
};

export default RootLayout;
