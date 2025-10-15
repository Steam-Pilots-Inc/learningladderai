import { ChatInterface } from "./components/ChatInterface";

export default function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(68, 151, 205, 0.1) 0%, rgba(255, 255, 255, 1) 50%, rgba(220, 119, 102, 0.15) 100%)",
      }}
    >
      {/* Background decoration - optimized for mobile */}
      <div
        className="absolute top-0 left-0 rounded-full w-64 h-64 md:w-96 md:h-96"
        style={{
          backgroundColor: "rgba(68, 151, 205, 0.08)",
          filter: "blur(24px) md:blur(48px)",
          transform: "translate(-25%, -25%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 rounded-full w-64 h-64 md:w-96 md:h-96"
        style={{
          backgroundColor: "rgba(220, 119, 102, 0.08)",
          filter: "blur(24px) md:blur(48px)",
          transform: "translate(25%, 25%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 rounded-full w-48 h-48 md:w-64 md:h-64"
        style={{
          backgroundColor: "rgba(220, 119, 102, 0.04)",
          transform: "translate(-50%, -50%)",
          filter: "blur(16px) md:blur(32px)",
        }}
      />

      <ChatInterface />
    </div>
  );
}