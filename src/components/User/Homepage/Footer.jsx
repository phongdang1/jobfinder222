import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";

function Footer() {
  return (
    <>
      <div className="flex py-4 bg-secondary items-center justify-between px-24 border-t-2 ">
        {/* left */}
        <div className="flex gap-4">
          <div>Logo</div>
          <p>© 2024 JobFinder. All rights reserved.</p>
        </div>
        {/* right */}
        <div className="flex gap-2 items-center">
          <p>Find us on social media: </p>
          <ul className="flex gap-2">
            <a href="#">
              <LinkedIn />
            </a>
            <a href="#">
              <Facebook color="disabled" />
            </a>
            <a href="#">
              <Instagram />
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
