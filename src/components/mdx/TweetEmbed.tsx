import { Tweet } from 'react-tweet'

export interface TweetEmbedProps {
  id: string
}

export function TweetEmbed({ id }: TweetEmbedProps) {
  return (
    <div className="my-4 [&_.react-tweet-theme]:!bg-[var(--color-background-muted)] [&_.react-tweet-theme]:!border-[var(--color-border)]">
      <Tweet id={id} />
    </div>
  )
}
