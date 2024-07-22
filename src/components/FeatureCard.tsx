import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { imageLinks } from "./imageLinks";
export default function FeatureCard() {

    const getImageLink = (imageName: string) => {
        const image = imageLinks.find((img) => img.name === imageName);
        return image ? image.link : undefined;
    }
    const list = [
        {
        title: "Bánh Da Lợn",
        img: getImageLink("banh-da-lon.jpg"),
        calories: "Calories 5.50",
        },
        {
        title: "Bánh Pía",
        img: getImageLink("banh-pia.jpg"),
        calories: "Calories 3.00",
        },
        {
        title: "Bánh Tôm Hồ Tây",
        img: getImageLink("banh-tom-ho-tay.jpg"),
        calories: "Calories 10.00",
        },
        {
        title: "Bánh Tráng Nướng",
        img: getImageLink("banh-trang-nuong.jpg"),
        calories: "Calories 5.30",
        },
        {
        title: "Bún Ốc",
        img: getImageLink("bun-oc.jpg"),
        calories: "Calories 15.70",
        },
        {
        title: "Bún Riêu",
        img: getImageLink("bun-rieu.jpg"),
        calories: "Calories 8.00",
        },
        {
        title: "Cháo Lươn",
        img: getImageLink("chao-luon.jpg"),
        calories: "Calories 7.50",
        },
        {
        title: "Bánh Trôi Tàu",
        img: getImageLink("banh-troi-tau.jpg"),
        calories: "Calories 12.20",
        },
    ];

    return (
        <section>
            <div className="flex flex-col items-center font-bold">
                Eye-catching search result interface.
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">{item.calories}</p>
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>
    );
    }
