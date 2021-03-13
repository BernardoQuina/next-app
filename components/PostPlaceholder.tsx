interface PostPlaceholderProps {}

export const PostPlaceholder: React.FC<PostPlaceholderProps> = ({}) => {
  return (
    <>
      <div className='mb-4 h-6 w-3/4 rounded-lg text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
      <div className='mb-4 h-5 w-2/4 rounded-lg text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
      <div className='mb-2 h-4 w-full rounded-md text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
      <div className='h-4 w-2/3 rounded-md text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
    </>
  )
}
