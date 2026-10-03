import { useState, useEffect } from "react";
import { getPortfolioData, PortfolioData } from "@/lib/portfolio-store";

export function usePortfolioData(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(getPortfolioData);

  useEffect(() => {
    // Sync on mount
    setData(getPortfolioData());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        setData(getPortfolioData());
      }
    };

    window.addEventListener("portfolio-data-changed", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio-data-changed", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return data;
}
