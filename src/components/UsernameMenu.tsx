// import { CircleUserRound } from "lucide-react"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    // DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import { useAuth0 } from "@auth0/auth0-react"
// import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";

// import { readFileSync } from 'fs'

export default function UsernameMenu() {

    const {user, logout} = useAuth0();

    const handleLogout = (key: React.Key) => {
        if (key === 'log out') {
          logout();
        }
      };

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
          >
            {user?.email}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handleLogout}>
          <DropdownItem key="user profile">User Profile</DropdownItem>
          <DropdownItem key="log out" className="text-danger" color="danger" >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
// onAction
//   onClick= {() => logout()}