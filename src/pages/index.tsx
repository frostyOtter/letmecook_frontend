import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import DefaultLayout from "@/layouts/default";

import { SearchIcon } from "@/components/icons";
import FeatureCard from "@/components/FeatureCard";
import SharingCard from "@/components/SharingCard";

export default function IndexPage() {
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

    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            size="lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
     
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className="text-5xl font-bold text-orange-500 p-5">Simply</h1>
                    {/* <h1 className="text-5xl font-bold text-violet-500">   ANY&nbsp;</h1> */}
                    <h1 className="text-5xl font-bold">
                    input the ingredients
                    </h1>
                    <h4 className="mt-4 text-2xl font-semibold">
                    you currently have on hand.
                    </h4>
                </div>

                {isAuthenticated ? (
                    <div className="flex items-center w-1/2 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {searchInput}
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            onPress={handleSearchSubmit}
                        >
                            GO!
                        </Button>
                    </div>
                ) : (
                    <Button
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        onPress={async () => await loginWithRedirect()}
                    >
                        Login to unlock Search
                    </Button>
                )}
            </section>
            <div>
                <Image
                className="justify-center"
                alt="Image"
                src="https://i.ibb.co/XpP2QLy/image.png"
                />
            </div>
            <section className="p-5">
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" placement={"start"}>
                    <Tab key="Features" title="Features">
                        <FeatureCard/>
                    </Tab>
                    <Tab key="Sharing" title="Sharing">
                        <div className="flex flex-row">
                        <SharingCard col_num={[0, 1]} row_num={1} input_number={2} />
                        <h1 className="p-10">Sharing your favourite recipes to the worlds.</h1>
                        </div>
                    </Tab>
                    <Tab key="Snaps" title="Snaps">
                        <Card>
                            <CardBody>
                                <h1>Share your 'achievement'</h1>
                                <h2>Through Snaps, you can share your moment</h2>
                                <h2>Under working...</h2>
                            </CardBody>
                        </Card>  
                    </Tab>
                    </Tabs>
                </div>
            </section>
        </DefaultLayout>
    );
}
