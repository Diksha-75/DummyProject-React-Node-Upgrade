
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "#eee",
        padding: "10px"
      }}
    >
      <Link to="/home">Home</Link> |

       <Link to="/countries">
        Countries
      </Link>{" "}
      |

      <Link to="/weather">
        Weather
      </Link>{" "}
      |

      <Link to="/profile">
        Profile
      </Link>
    </div>
  );
}

export default Navbar;