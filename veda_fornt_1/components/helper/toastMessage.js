import { toast } from 'react-toastify';

export const Toastify = ({ message }) => {
  toast.success(
    <div>
      <span style={{ fontWeight: 'bold', fontFamily: 'Calibri', fontSize: '17px', color: '#fff' }}>
        {message.firstLine}
      </span>
      <br />
      <span style={{ fontFamily: 'Calibri', fontSize: '17px', color: '#fff' }}>
        {message.secondLine}
      </span>
    </div>,
    {
      style: {
        background: '#6f42c1',
      },
    }
  );
};
 export const FIRST_MESSAGE = 'Thank you for reaching out to us!'
 export const SECOND_MESSAGE = "We'll get back to you soon."
