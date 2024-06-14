import '../css/footer.css'

function Footer() {
 return (
  <div className="footerBox">
    <div className="footerTextBox">
     <ul className="footerListBox">
      <li>고객센터</li>
      <li>이용약관</li>
      <li>개인정보처리방침</li>
    </ul>
    </div>
   <div className="footerIconBox">
    <i className="fa-brands fa-youtube"></i>
    <i className="fa-brands fa-instagram"></i>
    <i className="fa-brands fa-twitter"></i>
    <i className="fa-brands fa-facebook"></i>
   </div>
   <div className="footerTextBox">
        <span>Copyright @ 주식회사 All right reserved.</span>
    </div>
   </div>
  )
}

export default Footer;