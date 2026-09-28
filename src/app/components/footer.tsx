import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <hr className="my-8 bg-[#722b41]/80" />

      <Image
        src="/logo.png"
        alt="SGCC Logo"
        width={150}
        height={150}
        className="flex items-center justify-center mx-auto mt-12"
      />
    </footer>
  );
}
