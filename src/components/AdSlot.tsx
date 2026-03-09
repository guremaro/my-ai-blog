import { adConfig } from "@/config/ads";

export function AdSlot({ position }: { position: keyof typeof adConfig }) {
  const adHtml = adConfig[position];

  if (typeof adHtml !== 'string' || !adHtml) return null;

  return (
    <div 
      className="my-10 overflow-hidden flex justify-center w-full min-h-[100px]"
      dangerouslySetInnerHTML={{ __html: adHtml }}
    />
  );
}
