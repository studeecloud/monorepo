
export default function MessageForm(props) {
  const [message, setMessage] = useState();

  const placeholder = 'Talk to me...';
  const disableSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section>
      <form method="post" action="/messages" className='flex flex-col items-center' onSubmit={disableSubmit}>
        <textarea type='text' className='border-2 border-dark-gray p-2 rounded' name='text' placeholder={placeholder} style={{ width: 500, height: 75 }}></textarea>
        <input type='submit' value='Message' className='border-2 border-dark-gray p-2 rounded w-48 my-2.5' onClick={disableSubmit} />
      </form>
    </section>
  );
};