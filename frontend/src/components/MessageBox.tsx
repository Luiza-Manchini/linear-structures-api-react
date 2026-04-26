interface MessageBoxProps {
  title: string;
  text: string;
  variant: "success" | "error";
}

export default function MessageBox({ title, text, variant }: MessageBoxProps) {
  return (
    <div className={`message-box ${variant}`}>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}
