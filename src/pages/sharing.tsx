import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
// import { Link } from "@nextui-org/link";
// import { SearchIcon } from "@/components/icons";
import SharingCard from "@/components/SharingCard";
import DefaultLayout from "@/layouts/default";
import axios from "axios";

export default function SharePage() {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [trialTimeLeft, setTrialTimeLeft] = useState<number | null>(null);
    const backend_url = import.meta.env.VITE_BACKEND_URI;
    useEffect(() => {
        const fetchTrialTimeLeft = async () => {
            if (isAuthenticated && user?.email) {
                try {
                    const response = await axios.post(`${backend_url}/get_trial_time_left`, {
                        user_email: user?.email
                    });
                    setTrialTimeLeft(response.data);
                    console.log(`trial_time_left: ${response.data}`);
                } catch (error) {
                    console.error("Error fetching trial time left:", error);
                }
            }
        };

        fetchTrialTimeLeft();
    }, [isAuthenticated, user]);

    const updateTrialTimeLeft = async () => {
        if (user?.email) {
            try {
                await axios.post(`${backend_url}/update_trial_time_left`, {
                    user_email: user?.email
                });
                setTrialTimeLeft((prev) => (prev !== null ? prev - 1 : null));
                console.log('updated trial time');
            } catch (error) {
                console.error("Error updating trial time left:", error);
            }
        }
    };

    const handleSearchSubmit = async () => {
        if (trialTimeLeft === 0) {
            alert("Your trial time has ended");
            setSearchTerm("");
            return;
        }

        if (trialTimeLeft !== null) {
            if (trialTimeLeft === 10 || (trialTimeLeft > 0 && trialTimeLeft <= 5)) {
                if (trialTimeLeft <= 5) {
                    await updateTrialTimeLeft();
                }
                navigate("/search", { state: { searchQuery: searchTerm } });
            } else {
                navigate("/search", { state: { searchQuery: searchTerm } });
            }
        }
    };

    const sharingInput = (
      <form className="items-center flex flex-col gap-4 h-[300px]">
          <Input isRequired label="Title" placeholder="Enter recipe name" />
          <Input isRequired label="Ingredients" placeholder="Enter required ingredients" />
          <Input isRequired label="Time" placeholder="Enter cooking time" type="number" />
          <Input
            isRequired
            label="Cook"
            placeholder="Enter the tutorial"
          />
          <div className="flex gap-2 justify-end">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onPress={handleSearchSubmit}
            >
                Submit
            </Button>
          </div>
      </form>
    );

    return (
        <DefaultLayout>
            <div className="grid gap-10 sm:grid-cols-2">
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="inline-block max-w-lg text-center justify-center">
                        <span className="flex">
                        <h1 className="text-5xl font-bold text-violet-500">Sharing&nbsp;</h1>
                            <h1 className="text-5xl font-bold">is&nbsp;</h1>
                            <h1 className="text-5xl font-bold text-violet-500">Caring.</h1>
                        </span>
                        <br />
                        <h4 className="mt-4 text-2xl font-semibold">
                            Sharing recipes to the world.
                        </h4>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                            {sharingInput}
                        </div>
                    ) : (
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            onPress={async () => await loginWithRedirect()}
                        >
                            Login Now
                        </Button>
                    )}
                </section>
                <SharingCard col_num={[2, 3, 4, 5, 6]} row_num={3} input_number={2} />
            </div>
        </DefaultLayout>
    );
}