import { motion } from "framer-motion";
import { MessageSquareShare } from "lucide-react";

interface FloatingWhatsappProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function FloatingWhatsapp({
  phoneNumber = "919567805222",
  defaultMessage = "Hi Tanush, I came across your LOG!Q portfolio and would like to connect!",
}: FloatingWhatsappProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Tanush"
      title="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-cinema transition hover:shadow-[0_0_25px_rgba(37,211,102,0.45)] group"
    >
      {/* Animated Ping Ring */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-[#25D366]" />
      </span>

      {/* WhatsApp SVG Icon */}
      <svg
        className="h-7 w-7 fill-current transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.244-.588-.492-.508-.678-.518-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.079 2.908 1.23 3.109.15.2 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351z" />
        <path d="M12 2a9.93 9.93 0 0 0-8.583 14.933L2 22l5.215-1.368A9.934 9.934 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.625 0-3.153-.437-4.48-1.202l-.322-.187-3.324.872.887-3.239-.205-.327A8.163 8.163 0 0 1 3.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z" />
      </svg>

      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute bottom-full mb-2.5 hidden -translate-x-1/2 left-1/2 whitespace-nowrap rounded-lg border border-border/80 bg-popover/95 px-2.5 py-1 text-[11px] font-medium text-popover-foreground shadow-lg backdrop-blur-md transition group-hover:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
