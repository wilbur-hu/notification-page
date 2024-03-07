"use client";

import { Action, Notification } from "@/lib/model/notification";

import avatarMarkWebber from "@/public/images/avatar-mark-webber.webp";
import avatarAngelaGray from "@/public/images/avatar-angela-gray.webp";
import avatarJacobThompson from "@/public/images/avatar-jacob-thompson.webp";
import avatarRizkyHasanuddin from "@/public/images/avatar-rizky-hasanuddin.webp";
import avatarKimberlySmith from "@/public/images/avatar-kimberly-smith.webp";
import avatarNathanPeterson from "@/public/images/avatar-nathan-peterson.webp";
import avatarAnnaKim from "@/public/images/avatar-anna-kim.webp";

import imageChess from "@/public/images/image-chess.webp";
import React, { useState } from "react";
import NotificationItem from "@/app/NotificationItem";
import moment from "moment";

export type NotificationCardProps = {
  className?: string;
};

function countUnread(notifications: Notification[]) {
  return notifications.filter((n) => !n.read).length;
}
export default function NotificationCard(props: NotificationCardProps) {
  const now = new Date("2022-01-10T10:30:00Z");

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      date: new Date("2022-01-10T10:29:00Z"),
      action: Action.React,
      target: "My first tournament today!",
      read: false,
      user: {
        name: "Mark Webber",
        avatar: avatarMarkWebber.src,
      },
    },
    {
      id: "2",
      date: new Date("2022-01-10T10:25:00Z"),
      action: Action.Follow,
      target: null,
      read: false,
      user: {
        name: "Angela Gray",
        avatar: avatarAngelaGray.src,
      },
    },
    {
      id: "3",
      date: new Date("2022-01-09T10:30:00Z"),
      action: Action.JoinGroup,
      target: "Chess Club",
      read: false,
      user: {
        name: "Jacob Thompson",
        avatar: avatarJacobThompson.src,
      },
    },
    {
      id: "4",
      date: new Date("2022-01-05T10:30:00Z"),
      action: Action.PrivateMessage,
      target:
        "Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game.",
      read: true,
      user: {
        name: "Rizky Hasanuddin",
        avatar: avatarRizkyHasanuddin.src,
      },
    },
    {
      id: "5",
      date: new Date("2022-01-03T10:30:00Z"),
      action: Action.CommentOnPicture,
      target: imageChess.src,
      read: true,
      user: {
        name: "Kimberly Smith",
        avatar: avatarKimberlySmith.src,
      },
    },
    {
      id: "6",
      date: new Date("2021-12-28T10:30:00Z"),
      action: Action.React,
      target: "5 end-game strategies to increase your win rate",
      read: true,
      user: {
        name: "Nathan Peterson",
        avatar: avatarNathanPeterson.src,
      },
    },
    {
      id: "7",
      date: new Date("2021-12-25T10:30:00Z"),
      action: Action.LeftGroup,
      target: "Chess Club",
      read: true,
      user: {
        name: "Anna Kim",
        avatar: avatarAnnaKim.src,
      },
    },
  ]);

  function markAllAsRead() {
    setNotifications(
      notifications.map((n) => {
        return { ...n, read: true };
      }),
    );
  }

  function markAsRead(notification: Notification) {
    setNotifications(
      notifications.map((n) => {
        return n.id === notification.id ? { ...n, read: true } : n;
      }),
    );
  }

  moment.relativeTimeThreshold("d", 7);
  moment.relativeTimeThreshold("w", 4);
  console.log("locale is ", moment.locale());
  moment.locale("en");
  moment.updateLocale("en", {
    relativeTime: {
      m: "1m",
      mm: "%dm",
      d: "1 day",
      w: "1 week",
      M: "1 month",
    },
  });

  return (
    <div className="flex h-[839px] w-[730px] flex-col items-stretch rounded-[15px] bg-white px-[30px]">
      <h2 className="mt-[33px] flex items-center justify-start">
        <span className=" text-[24px] font-extrabold leading-[30px] text-very-dark-grey-blue">
          Notifications
        </span>
        <span className="ml-[11px] h-[25px] w-[32px] rounded-[6px] bg-blue text-center font-extrabold text-white">
          {countUnread(notifications)}
        </span>
        <button
          className="ml-auto text-dark-grey-blue hover:text-blue"
          onClick={() => markAllAsRead()}
        >
          Mark all as read
        </button>
      </h2>

      <ul className="mt-[25px]">
        {notifications.map((n, idx) => {
          return (
            <li key={n.id}>
              <NotificationItem
                className="mt-[8px]"
                notification={n}
                now={now}
                onClick={(n) => markAsRead(n)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
