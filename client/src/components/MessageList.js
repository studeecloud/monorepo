import Message from "./Message";

export default function MessageList(props) {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderMessages = (messages) => {
    for (let message of messages) {
      <Message
        user={message.user}
        body={message.body}
      />
    }
  }

  return (
    <Message />
  );
};