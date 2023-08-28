import "./NotificationPill.scss";

interface NotificationPillProps {
  text: string | undefined;
}

export default function NotificationPill({ text }: NotificationPillProps) {
  return (
    <div id="pill">
      <p>{text}</p>
    </div>
  );
}
