import Message from "./Message";

export default function MessageList(props) {

  return (
    <>
      {
        props.messages.map((message, i) => {
          return (
            <Message
              key={i}
              user='LISA'
              body={message.message}
            />
          )
        }
        )
      }
    </>
  )
}