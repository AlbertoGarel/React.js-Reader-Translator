interface WordsCounterProps {
  text: string;
}

export default function WordsCounter({ text }: WordsCounterProps) {
  return (
    <div>
      <span className={`${200 - text.length < 20 ? "alert" : null}`}>
        {text.length}
      </span>
      <span>/200</span>
    </div>
  );
}
