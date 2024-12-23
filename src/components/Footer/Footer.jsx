import addressImage from "../../assets/img/Image-address.png";

const Footer = ({
  address = "Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul",
  email = "bilgi@tesodev.com",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.279562401988!2d28.888373176902796!3d41.01913931875468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb7abf29ba35%3A0xc98f44e9057adcde!2zVGVzb2RldiBZYXrEsWzEsW0!5e0!3m2!1str!2str!4v1697552507046!5m2!1str!2str",
}) => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-wrapper'>
          <div className='footer-adress'>
            <div className='footer-adress-wrapper'>
              <img src={addressImage} alt='address image' />
              <div className='adress'>
                <strong>İletişim</strong>
                <p className='adress-detail'>Adres: {address}</p>
                <a href={`mailto:${email}`}>
                  <strong>Email: {email}</strong>
                </a>
              </div>
            </div>
          </div>
          <div className='footer-map'>
            <iframe
              src={mapUrl}
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
