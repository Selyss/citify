import { CitationForm } from "@/components/citation-form";
import { TabRadio } from "@/components/tab-radio";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <TabRadio />
        <CitationForm />
      </div>
    </div>
  );
}
