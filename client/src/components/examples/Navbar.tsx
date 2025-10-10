import Navbar from "../Navbar";

export default function NavbarExample() {
  return (
    <Navbar onBookConsultation={() => console.log("Book consultation clicked")} />
  );
}
