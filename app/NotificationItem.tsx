import { cn } from "@/lib/utils";
import { Action, Notification } from "@/lib/model/notification";
import Image from "next/image";
import moment from "moment";

export type NotificationItemProps = {
  className?: string;
  notification: Notification;
  onClick?: (notification: Notification) => void;
  now: Date;
};

function renderAction(action: Action) {
  switch (action) {
    case Action.React:
      return "reacted to your recent post";
    case Action.Follow:
      return "followed you";
    case Action.JoinGroup:
      return "has joined your group";
    case Action.PrivateMessage:
      return "sent you a private message";
    case Action.CommentOnPicture:
      return "commented on your picture";
    case Action.LeftGroup:
      return "left the group";
  }
}

function formatRelativeTime(date: Date, now: Date) {
  return moment(date).from(now);
}

export default function NotificationItem(props: NotificationItemProps) {
  const {
    now,
    notification,
    notification: { user },
  } = props;

  const dotClass = {
    "after:h-[8px] after:w-[8px] after:rounded-full after:content-[''] after:bg-red after:inline-block after:ml-[6px]":
      !notification.read,
  };

  const bgClass = {
    "bg-snow": !notification.read,
  };

  function shouldShowTarget(notification: Notification) {
    return (
      notification.target &&
      notification.action !== Action.CommentOnPicture &&
      notification.action !== Action.PrivateMessage
    );
  }

  return (
    <div
      className={cn(
        "flex rounded-[8px] px-[20px] pb-[17px] pt-[18px] text-dark-grey-blue",
        bgClass,
        props.className,
      )}
      onClick={() => props.onClick?.(notification)}
    >
      <div className="shrink-0 rounded-full">
        <Image src={user.avatar} alt={user.name} width={45} height={45} />
      </div>

      <div className="ml-[19px] flex grow flex-col items-start leading-[20px]">
        <span className={cn("flex items-center", dotClass)}>
          <span>
            <span className="font-bold text-very-dark-grey-blue">
              {user.name}{" "}
            </span>
            <span> {renderAction(notification.action)} </span>
            {shouldShowTarget(notification) && (
              <span className="font-bold  text-very-dark-grey-blue">
                {notification.target}
              </span>
            )}
          </span>
        </span>
        <span className="mt-[3px]">
          {formatRelativeTime(notification.date, now)}
        </span>
        {notification.action === Action.PrivateMessage && (
          <p className="mt-[13px] rounded-[5px] border border-solid px-[20px] pb-[20px] pt-[17px] hover:bg-light-grey-blue">
            {notification.target}
          </p>
        )}
      </div>
      {notification.action === Action.CommentOnPicture && (
        <div className="shrink-0 rounded-[7px]">
          <Image
            src={notification.target!}
            alt={"commented picture"}
            width={45}
            height={45}
          />
        </div>
      )}
    </div>
  );
}
