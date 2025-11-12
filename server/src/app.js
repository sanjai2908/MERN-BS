// ✅ Enable Cross-Origin Resource Sharing (CORS)
const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://mern-bs-frontend.vercel.app", // your Vercel live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
