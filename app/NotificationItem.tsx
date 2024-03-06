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

  const dotClass = notification.read
    ? null
    : "after:h-[8px] after:w-[8px] after:rounded-full after:content-['']";

  return (
    <div
      className={cn("flex", props.className)}
      onClick={() => props.onClick?.(notification)}
    >
      <div className="shrink-0 rounded-full">
        <Image src={user.avatar} alt={user.name} width={45} height={45} />
      </div>

      <div className="flex grow flex-col items-start">
        <span className={cn(dotClass)}>
          <span className="font-bold">{user.name}</span>
          <span> {renderAction(notification.action)} </span>
          {notification.target &&
            notification.action !== Action.CommentOnPicture && (
              <span className="font-bold">{notification.target}</span>
            )}
        </span>
        <span>{formatRelativeTime(notification.date, now)}</span>
        {notification.action === Action.PrivateMessage && (
          <div>{notification.target}</div>
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
