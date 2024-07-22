import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { HeartIcon } from "./icons";
import { Image } from "@nextui-org/image";

interface SharingCardProps {
    col_num: number[];
    row_num: number;
    input_number: number;
}

export default function SharingCard({ col_num, row_num, input_number }: SharingCardProps) {
    const [liked, setLiked] = React.useState(false);

    const list_sharing_card = [
        {
            user_index: 0,
            user_name: 'Happy',
            user_link: '@Admin',
            user_avatar: 'https://nextui.org/avatars/avatar-1.png',
            user_message: 'Just shared `Bánh Khọt` recipe.',
            user_post_image: 'https://i.ibb.co/3FK9d4R/banh-khot.jpg',
            user_like: 9876,
            user_follows: 10,
        },
        {
            user_index: 1,
            user_name: 'Lucky',
            user_link: '@Admin_2',
            user_avatar: 'https://nextui.org/avatars/avatar-2.png',
            user_message: 'Just shared `Bánh Đậu Xanh` recipe.',
            user_post_image: 'https://i.ibb.co/8g322pN/banh-dau-xanh.jpg',
            user_like: 3,
            user_follows: 85.6,
        },
        {
            user_index: 2,
            user_name: 'Xuân Buỳnh',
            user_link: '@Binhdtx',
            user_avatar: 'https://nextui.org/avatars/avatar-5.png',
            user_message: 'Just shared `Bánh Đậu Xanh` recipe.',
            user_post_image: 'https://i.ibb.co/8g322pN/banh-dau-xanh.jpg',
            user_like: 3,
            user_follows: 85.6,
        },
        {
            user_index: 3,
            user_name: 'Friend with Bugs',
            user_link: '@WFBs',
            user_avatar: 'https://nextui.org/avatars/avatar-6.png',
            user_message: 'Just shared `Canh Khổ Qua` recipe.',
            user_post_image: 'https://i.ibb.co/Zx5rCPn/canh-kho-qua-nhoi-thit.png',
            user_like: 1.2,
            user_follows: 5.6,
        },
        {
            user_index: 4,
            user_name: 'Chị Long',
            user_link: '@nay_troi_dep_qua',
            user_avatar: 'https://nextui.org/avatars/avatar-7.png',
            user_message: 'Just shared `Gỏi Cuốn` recipe.',
            user_post_image: 'https://i.ibb.co/1MJwZXN/goi-cuon.jpg',
            user_like: 3.5,
            user_follows: 8.6,
        },
        {
            user_index: 5,
            user_name: 'H.Anh H.Anh',
            user_link: '@H_A_H_A',
            user_avatar: 'https://nextui.org/avatars/avatar-8.png',
            user_message: 'Just shared `Bánh Đậu Xanh` recipe.',
            user_post_image: 'https://i.ibb.co/WWTpGqt/cha-muc.jpg',
            user_like: 10,
            user_follows: 6,
        },
        {
            user_index: 6,
            user_name: 'Spring Thy',
            user_link: '@xX_THY_Xx',
            user_avatar: 'https://nextui.org/avatars/avatar-9.png',
            user_message: 'Just shared `Bánh Cớm` recipe.',
            user_post_image: 'https://i.ibb.co/qJsZ2Wf/banh-com.png',
            user_like: 69,
            user_follows: 6.9,
        },
        // ... other sample users
    ];

    const filtered_cards = list_sharing_card.filter(user => col_num.includes(user.user_index));

    const gridColsClass = `sm:grid-cols-${input_number}`;
    const gridRowsNumber = `grid-cols-${row_num}`;

    return (
        <div className={`grid gap-2 ${gridColsClass} ${gridRowsNumber}`}>
            {filtered_cards.map((user, index) => (
                <Card className="max-w-[340px]" key={index}>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar isBordered radius="full" size="md" src={user.user_avatar} />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{user.user_name}</h4>
                                <h5 className="text-small tracking-tight text-default-400">{user.user_link}</h5>
                            </div>
                        </div>
                        <Button
                            isIconOnly
                            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                            radius="full"
                            variant="light"
                            onPress={() => setLiked((v) => !v)}
                        >
                            <HeartIcon
                                className={liked ? "[&>path]:stroke-transparent" : ""}
                                fill={liked ? "currentColor" : "none"}
                            />
                        </Button>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                        <p>
                            {user.user_message}
                        </p>
                        <span className="p-2">
                            <Image
                                isZoomed
                                width={200}
                                height={200}
                                alt="image"
                                src={user.user_post_image}
                            />
                        </span>
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">{user.user_like}</p>
                            <p className=" text-default-400 text-small">Likes</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">{user.user_follows}K</p>
                            <p className="text-default-400 text-small">Followers</p>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}


//     // Calculate the number of columns for the grid based on col_num
//     const gridColsClass = `sm:grid-cols-${Math.min(col_num, list_sharing_card.length)}`;

//     return (
//         <div className={`grid gap-2 ${gridColsClass}`}>
//             {list_sharing_card.slice(0, col_num).map((user, index) => (
//                 <Card className="max-w-[340px]" key={index}>
//                     <CardHeader className="justify-between">
//                         <div className="flex gap-5">
//                             <Avatar isBordered radius="full" size="md" src={user.user_avatar} />
//                             <div className="flex flex-col gap-1 items-start justify-center">
//                                 <h4 className="text-small font-semibold leading-none text-default-600">{user.user_name}</h4>
//                                 <h5 className="text-small tracking-tight text-default-400">{user.user_link}</h5>
//                             </div>
//                         </div>
//                         <Button
//                             isIconOnly
//                             className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
//                             radius="full"
//                             variant="light"
//                             onPress={() => setLiked((v) => !v)}
//                         >
//                             <HeartIcon
//                                 className={liked ? "[&>path]:stroke-transparent" : ""}
//                                 fill={liked ? "currentColor" : "none"}
//                             />
//                         </Button>
//                     </CardHeader>
//                     <CardBody className="px-3 py-0 text-small text-default-400">
//                         <p>
//                             {user.user_message}
//                         </p>
//                         <span className="p-2">
//                             <Image
//                                 isZoomed
//                                 width={200}
//                                 height={200}
//                                 alt="image"
//                                 src={user.user_post_image}
//                             />
//                         </span>
//                     </CardBody>
//                     <CardFooter className="gap-3">
//                         <div className="flex gap-1">
//                             <p className="font-semibold text-default-400 text-small">{user.user_like}</p>
//                             <p className=" text-default-400 text-small">Likes</p>
//                         </div>
//                         <div className="flex gap-1">
//                             <p className="font-semibold text-default-400 text-small">{user.user_follows}K</p>
//                             <p className="text-default-400 text-small">Followers</p>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             ))}
//         </div>
//     );
// }
