import './Contact.css';

const Contact = () => {
  
  return(
    <>
    <h2 >Contact Us</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3560.856597328437!2d92.59156397543605!3d26.812694376706958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ4JzQ1LjciTiA5MsKwMzUnMzguOSJF!5e0!3m2!1sen!2sin!4v1757945164633!5m2!1sen!2sin" 
    width="80%" height="288" 
    style={{ border:10 }}
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

  <div className='container'>
    <div className="contact-form">
      <form action = "https://formspree.io/f/xkgvazny" method="POST" className="contact-inputs">
        <input type="text" 
        placeholder="Username" 
        name="username" required 
        autoComplete="off" />

        <input
          type="email"
          name="Email"
          placeholder="Enter Your Email"
          autoComplete="off"
          required
          />

          <textarea name="message"
            cols="30"
            rows="10"
            placeholder="Enter Your Message" required>
            </textarea>

            <input type="submit" value="Send"/>
      </form>
    </div>

  </div>
    </>

  );
};

export default Contact;
