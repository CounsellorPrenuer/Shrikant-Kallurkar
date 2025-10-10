import PackagesSection from "../PackagesSection";

export default function PackagesSectionExample() {
  return (
    <PackagesSection
      onEngageClick={(packageName) => console.log("Engage clicked:", packageName)}
    />
  );
}
