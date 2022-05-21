import Message from "./Message";

export default function MessageList(props) {

  return (
    <>
      {
        props.messages.map(message => {
          return (
            <Message
              user='LISA'
              body={message.message_text}
            />
          )
        }
        )
      }
    </>
  )
}