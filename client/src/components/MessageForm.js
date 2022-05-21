
export default function MessageForm(props) {

  const placeholder = 'Talk to me...';
  const disableSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className="my-2.5">
      <form method="post" action="/messages" className='newMessage__form' onSubmit={disableSubmit}>
        <textarea type='text' className='form__input' name='text' placeholder={placeholder} style={{ border: '2px solid coral', width: 500, height: 75 }}></textarea>
        <input type='submit' value='Message' className='form__input' onClick={disableSubmit} style={{ border: '1px solid coral' }} />
      </form>
    </section>
  );
};