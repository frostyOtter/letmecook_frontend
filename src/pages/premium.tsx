import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
// import { Link } from "@nextui-org/link";
// import { AnchorIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import FeedbackCard from "@/components/FeedbackCard";

/**
 * Component for Premium Page
 */
export default function PremiumPage() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  // const [shortLink, setShortLink] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [showMomoImage, setShowMomoImage] = useState<boolean>(false);
  const backend_url = import.meta.env.VITE_BACKEND_URI;

  // Function to check premium status
  const checkPremiumStatus = async (email: string): Promise<void> => {
    try {
      const response = await axios.post<string>(
        `${backend_url}/get_user_premium_status`,
        { user_email: email },
        {
          headers: {
            'accept': 'application/json'
          }
        }
      );
      if (response.data === "True") {
        setIsPremium(true);
      } else if (response.data === "False") {
        setIsPremium(false);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  // Function to handle subscription
  const handleSubscribe = async (): Promise<void> => {
    if (!user?.email) {
      await loginWithRedirect();
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    setShowMomoImage(true);
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      checkPremiumStatus(user.email);
    }
  }, [isAuthenticated, user]);

  return (
    <DefaultLayout>
      <div className="flex flex-row items-center gap-8 py-8">
        <Card className="w-full md:w-1/4">
          <CardBody className="flex flex-row items-centers">
            <div>
              <Image
                src="https://i.ibb.co/SrVCGQ2/pexelsphoto3673762.jpg"
                alt="Sample Image"
                width={200}
                height={200}
                isZoomed
              />
              <h3 className="flex flex-col font-semibold text-foreground/90 p-5">Premium Features</h3>
              <h2>- Unlimited search</h2>
              <h2>- Share recipes</h2>
              <h2>- only 25.000vnd/ month</h2>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full ">
          <CardBody className="flex flex-col items-center">
            <Image
              src="https://iili.io/doz6OQt.jpg"
              alt="premium-main-banner"
              width={1200}
              height={600}
              isZoomed
            />
            {isPremium === false && !showMomoImage && (
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
                onPress={handleSubscribe}
              >
                Subscribe Now
              </Button>
            )}
            {isPremium === true && (
              <p className="mt-4">Your account is already premium.</p>
            )}
            {showMomoImage && (
              <div className="flex flex-col items-center gap-4 mt-4">
                <p>Chuyển tiền kèm nội dung theo cú pháp: {user?.email}</p>
                <Image
                  src="https://iili.io/doxMI6u.png"
                  alt="Momo Image"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </CardBody>
        </Card>
        <div className="w-full md:w-1/2">
          <FeedbackCard/>
        </div>
      </div>
      <div className="grid grid-cols-2 p-10">
        <span>
          <Image
            src="https://iili.io/doxbLzv.jpg"
            alt="Premium-why"
            width={500}
            height={500}
            isZoomed
          />
        </span>
        <span className="inline-block max-w-lg text-center justify-center">
          <h1 className="text-5xl font-bold text-orange-500">Why LetMeCook ?</h1>
          <h1 className="text-xl font-bold p-5 pt-10"> Find great dishes to cook every day.</h1>
          <h1 className="text-xl font-bold p-5"> All your own and saved recipes in one place.</h1>
          <h1 className="text-xl font-bold p-5"> Search by ingredients to try new recipes.</h1>
          <h1 className="text-xl font-bold p-5"> Share recipes with family, friends and followers.</h1>
        </span>
      </div>
      <div>
        <Image
          src="https://i.ibb.co/9qW7WR2/image-2.png"
          alt="Image"
          isZoomed
        />
      </div>
    </DefaultLayout>
  );
}


// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { Image } from "@nextui-org/image";
// import { Link } from "@nextui-org/link";
// import { AnchorIcon } from "@/components/icons";
// import DefaultLayout from "@/layouts/default";
// import FeedbackCard from "@/components/FeedbackCard";

// /**
//  * Component for Premium Page
//  */
// export default function PremiumPage() {
//   const { loginWithRedirect, isAuthenticated, user } = useAuth0();
//   const [shortLink, setShortLink] = useState<string | null>(null);
//   const [isPremium, setIsPremium] = useState<boolean | null>(null);
//   const backend_url = import.meta.env.VITE_BACKEND_URI;
//   // Function to check premium status
//   const checkPremiumStatus = async (email: string): Promise<void> => {
//     try {
//       const response = await axios.post<string>(
//         `${backend_url}/get_user_premium_status`,
//         { user_email: email },
//         {
//           headers: {
//             'accept': 'application/json'
//           }
//         }
//       );
//       if (response.data === "True") {
//         setIsPremium(true);
//       } else if (response.data === "False") {
//         setIsPremium(false);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error('Error checking premium status:', error);
//     }
//   };

//   // Function to handle subscription
//   const handleSubscribe = async (): Promise<void> => {
//     if (!user?.email) {
//       await loginWithRedirect();
//       return;
//     }

//     if (!isAuthenticated) {
//       return;
//     }

//     try {
//       const response = await axios.post<string>(
//         `${backend_url}/get_user_premium_status`,
//         { user_email: user.email },
//         {
//           headers: {
//             'accept': 'application/json'
//           }
//         }
//       );

//       if (response.data === "True") {
//         setIsPremium(true);
//       } else if (response.data === "False") {
//         // const paymentResponse = await axios.post<{ url: string }>(
//         //   // `${backend_url}/get_momo_payment`,
//         //   `${backend_url}/get_user_premium_status`,
//         //   { user_email: user.email },
//         //   {
//         //     headers: {
//         //       'accept': 'application/json'
//         //     }
//         //   }
//         // );
//         // // setShortLink(paymentResponse.data.url);
//         // setShortLink("<sample_short_link>");
//         <Image
//         src="https://i.ibb.co/6Y8pmY3/momo.png"
//         alt="Momo Image"
//         width={200}
//         height={200}
//         />
//       }
//     } catch (error) {
//       console.error('Error processing subscription:', error);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && user?.email) {
//       checkPremiumStatus(user.email);
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <DefaultLayout>
//       <div className="flex flex-row items-center gap-8 py-8">
//         <Card className="w-full md:w-1/4">
//           <CardBody className="flex flex-row items-centers">
//             <div>
//               <Image
//                 src="https://i.ibb.co/SrVCGQ2/pexelsphoto3673762.jpg"
//                 alt="Sample Image"
//                 width={200}
//                 height={200}
//                 isZoomed
//               />
//               <h3 className="flex flex-col font-semibold text-foreground/90 p-5">Premium Features</h3>
//               <h2>- Unlimited search</h2>
//               <h2>- Share recipes</h2>
//               <h2>- only 25.000vnd/ month</h2>
//             </div>
//           </CardBody>
//         </Card>
//         <Card className="w-full ">
//           <CardBody className="flex flex-col items-center">
//             <Image
//               src="https://i.ibb.co/DDCNfNY/448027261-122097007304360225-3650533236504856865-n.jpg"
//               alt="Sample Image 2"
//               width={1200}
//               height={600}
//               isZoomed
//             />
//             {isPremium === null && (
//               <Button
//                 radius="full"
//                 className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
//                 onPress={handleSubscribe}
//               >
//                 Subscribe Now
//               </Button>
//             )}
//             {isPremium !== null && (
//               <div className="flex flex-col items-center gap-4 mt-4">
//                 {isPremium ? (
//                   <p>Your account is already premium.</p>
//                 ) : (
//                   shortLink && (
//                     <div className="flex flex-wrap gap-4">
//                       <Link
//                         isExternal
//                         showAnchorIcon
//                         href={shortLink}
//                         anchorIcon={<AnchorIcon />}
//                       >
//                         Link to MoMo payment
//                       </Link>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </CardBody>
//         </Card>
//         <div className="w-full md:w-1/2">
//           <FeedbackCard/>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 p-10">
//         <span>
//           <Image
//                 src="https://i.ibb.co/2yXw527/premium-why.jpg"
//                 alt="Image"
//                 width={500}
//                 height={500}
//                 isZoomed
//           />
//         </span>
//         <span className="inline-block max-w-lg text-center justify-center">
          
//           <h1 className="text-5xl font-bold text-orange-500">Why LetMeCook ?</h1>
//           <h1 className="text-xl font-bold p-5 pt-10"> Find great dishes to cook every day.</h1>
//           <h1 className="text-xl font-bold p-5"> All your own and saved recipes in one place.</h1>
//           <h1 className="text-xl font-bold p-5"> Search by ingredients to try new recipes.</h1>
//           <h1 className="text-xl font-bold p-5"> Share recipes with family, friends and followers.</h1>
//         </span>
//       </div>
//       <div>
//         <Image
//                   src="https://i.ibb.co/9qW7WR2/image-2.png"
//                   alt="Image"
//                   // width={500}
//                   // height={500}
//                   isZoomed
//         />
//       </div>
//     </DefaultLayout>
//   );
// }