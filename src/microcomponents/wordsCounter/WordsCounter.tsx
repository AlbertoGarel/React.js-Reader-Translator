interface WordsCounterProps {
  text: string | undefined;
  readOnly: boolean;
}

export default function WordsCounter({ text, readOnly }: WordsCounterProps) {
  if (readOnly) return null;
  return (
    <div>
      <span
        className={`${200 - (text ? text.length : 0) < 20 ? "alert" : null}`}
      >
        {text ? text.length : 0}
      </span>
      <span>/200</span>
    </div>
  );
}
