import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const MEASUREMENT_ID = "G-W7W7DR4VYJ";

export default function Analytics() {
  const isProd = import.meta.env.MODE === "production"; // Vite
  // const isProd = process.env.NODE_ENV === "production"; // CRA

  useEffect(() => {
    if (!isProd) return;
    // minimal guard if gtag is needed later in code
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  }, [isProd]);

  if (!isProd) return null;

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} />
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${MEASUREMENT_ID}');
      `}</script>
    </Helmet>
  );
}
