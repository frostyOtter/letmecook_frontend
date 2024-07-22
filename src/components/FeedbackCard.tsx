import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
// import React from "react";

import { HeartIcon } from "./icons";

export default function FeedbackCard() {
  const [liked, setLiked] = useState<boolean[]>([false, false, false]);
  const avatarList = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
  ];

  const userList = [
    {
      user_name: "Binhdtx",
      user_link: "@namba_wan",
      user_message: "Tuyệt vời nè",
      user_recipe: 0,
      user_like: 0,
    },
    {
      user_name: "Thaitq",
      user_link: "@jaja",
      user_message: "App xịn xò",
      user_recipe: 0,
      user_like: 0,
    },
    {
      user_name: "Longvpq",
      user_link: "@nay_troi_dep_qua",
      user_message: "trời đẹp ha",
      user_recipe: 0,
      user_like: 0,
    },
  ];

  const handleLike = (index: number) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {userList.map((user, index) => (
        <Card key={index} className="max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="md" src={avatarList[index]} />
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
              onPress={() => handleLike(index)}
            >
              <HeartIcon
                className={liked[index] ? "[&>path]:stroke-transparent" : ""}
                fill={liked[index] ? "currentColor" : "none"}
              />
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>{user.user_message}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{user.user_recipe}</p>
              <p className="text-default-400 text-small">Recipes</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{user.user_like}</p>
              <p className="text-default-400 text-small">Likes</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
