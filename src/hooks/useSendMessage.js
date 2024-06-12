import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useSendMessage = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (senderId, receiverId) => {
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    try {
      setIsSending(true);
      // Add message to Firestore
      await addDoc(collection(firestore, 'messages'), {
        senderId,
        receiverId,
        message: message.trim(),
        timestamp: serverTimestamp(),
      });
      // Clear message input after sending
      setMessage('');
      setError(null);
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  return { message, setMessage, isSending, error, sendMessage };
};

export default useSendMessage;
