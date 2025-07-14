import Logo from "./Logo";

const Footer = () => {
  return (
    <div className=" bg-black text-white min-h-[20vh] px-4 md:px-8 flex items-center justify-between">
      <Logo />
      <div>All Rights Reserved</div>
    </div>
  );
};

export default Footer;
