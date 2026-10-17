import CampusCard from "./CampusCard";
import HelpdeskCard from "./HelpdeskCard";

export default function SidePanels() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <CampusCard />
      <HelpdeskCard />
    </div>
  );
}