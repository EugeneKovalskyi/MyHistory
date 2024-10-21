export default function ErrorMessage({ message }) {
  return (
    <div className='inline w-max ml-4 text-lg'>
      ⚠ {message}
    </div>
  )
}